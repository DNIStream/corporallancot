'use strict';

const MariaDbAdapter = require("@dbAdapters/mariaDb/mariaDbAdapter");
var theoretically = require("jasmine-theories");

describe("mariaDbAdapter", () => {
  let logger = {
    log: function () { }
  };
  let dbConfig = {
    connRetryCount: 0,
    connRetryDelay: 1
  };
  let expectedConnection = {
    config: {
      host: "localhost"
    }
  };
  let fakeConnection = async () => {
    return new Promise((resolve) => {
      resolve(expectedConnection);
    })
  }
  let mySql = {
    createConnection: fakeConnection
  };

  it("sets mySql to .mysql property", () => {
    // Arrange & Act
    const dbAdapter = new MariaDbAdapter({ mySql, dbConfig, logger });
    // Assert
    expect(dbAdapter.mysql).toBe(mySql);
  });

  it("resolves but does not call .createConnection if .connection is already set", async () => {
    // Arrange
    const dbAdapter = new MariaDbAdapter({ mySql, dbConfig, logger });
    dbAdapter.connection = {};
    spyOn(logger, "log");
    spyOn(mySql, "createConnection")
      .and.callFake(fakeConnection);

    // Act & Assert
    await expectAsync(dbAdapter.connect()).toBeResolved();
    expect(mySql.createConnection).toHaveBeenCalledTimes(0);
    expect(logger.log).toHaveBeenCalledTimes(1);
  });

  theoretically.it(".connect() calls mysql.createConnection if .connection is %s (is not a resolved Promise)", [null, undefined], async (insertedValue) => {
    // Arrange
    const dbAdapter = new MariaDbAdapter({ mySql, dbConfig, logger });
    dbAdapter.connection = insertedValue;
    spyOn(mySql, "createConnection")
      .and.callFake(fakeConnection);

    // Act & Assert
    await expectAsync(dbAdapter.connect()).toBeResolved();
    expect(mySql.createConnection).toHaveBeenCalled();
  });

  it("passes configuration values into mySql.createConnection", async () => {
    // Arrange
    dbConfig.server = "expected_server";
    dbConfig.username = "expected_username";
    dbConfig.password = "expected_password";
    dbConfig.database = "expected_database";
    const dbAdapter = new MariaDbAdapter({ mySql, dbConfig, logger });
    spyOn(mySql, "createConnection")
      .and.callFake(fakeConnection);

    // Act
    await dbAdapter.connect();

    // Assert
    expect(mySql.createConnection).toHaveBeenCalledWith(jasmine.objectContaining({
      host: dbConfig.server,
      user: dbConfig.username,
      password: dbConfig.password,
      database: dbConfig.database
    }));
  });

  it("bubbles error up stack if mySql.createConnection() throws", async () => {
    // Arrange
    const dbAdapter = new MariaDbAdapter({ mySql, dbConfig, logger });
    const expectedError = new Error("Custom DB Exception");
    spyOn(mySql, "createConnection")
      .and.throwError(expectedError);

    // Act & Assert
    await expectAsync(dbAdapter.connect()).toBeRejectedWith(expectedError);
  });

  theoretically.it("retries connection when ECONNREFUSED is raised by mySql.createConnection %s times, then resolves", [1, 2, 3, 5], async (iterations) => {
    // Arrange
    dbConfig.connRetryCount = iterations;

    const dbAdapter = new MariaDbAdapter({ mySql, dbConfig, logger });
    const expectedError = new Error("Expected DB Exception");
    expectedError.code = "ECONNREFUSED";
    let timesCalled = 0;
    spyOn(mySql, "createConnection")
      .and.callFake(async () => {
        timesCalled++;
        if (timesCalled <= iterations) {
          throw expectedError;
        } else {
          // Success on second call
          return Promise.resolve(expectedConnection);
        }
      });

    // Act & Assert
    await expectAsync(dbAdapter.connect()).toBeResolved();
    expect(mySql.createConnection).toHaveBeenCalledTimes(iterations + 1);
  });

  it("sets dbAdapter.connection to return value of mySql.createConnection when resolved", async () => {
    // Arrange
    const dbAdapter = new MariaDbAdapter({ mySql, dbConfig, logger });
    spyOn(mySql, "createConnection")
      .and.callFake(fakeConnection);

    // Act & Assert
    await expectAsync(dbAdapter.connect()).toBeResolved();
    expect(dbAdapter.connection).toBeDefined();
    expect(dbAdapter.connection).toBe(expectedConnection);
  });

  it("retries connection when ECONNREFUSED is raised by mySql.createConnection, until connRetryCount is reached", async () => {
    // Arrange
    dbConfig.connRetryCount = 1;
    const dbAdapter = new MariaDbAdapter({ mySql, dbConfig, logger });
    const expectedError = new Error("Expected DB Exception");
    expectedError.code = "ECONNREFUSED";
    spyOn(mySql, "createConnection")
      .and.throwError(expectedError);

    // Act & Assert
    await expectAsync(dbAdapter.connect()).toBeRejectedWith(expectedError);
    const expectedRetryCount = dbConfig.connRetryCount + 1;
    expect(mySql.createConnection).toHaveBeenCalledTimes(expectedRetryCount);
  });

  it("delays connection retries by connRetryDelay, when ECONNREFUSED is raised by mySql.createConnection", async () => {
    // Arrange
    dbConfig.connRetryCount = 2;
    dbConfig.connRetryDelay = 100;
    const dbAdapter = new MariaDbAdapter({ mySql, dbConfig, logger });
    const expectedError = new Error("Expected DB Exception");
    expectedError.code = "ECONNREFUSED";
    spyOn(mySql, "createConnection")
      .and.throwError(expectedError);

    // Act & Assert
    const startTime = new Date().getTime();
    await expectAsync(dbAdapter.connect()).toBeRejectedWith(expectedError);
    const timeElapsed = (new Date().getTime() - startTime);

    const expectedWaitTime = dbConfig.connRetryCount * dbConfig.connRetryDelay;
    expect(timeElapsed).toBeGreaterThanOrEqual(expectedWaitTime - ((expectedWaitTime / 100) * 5)); // 5% timing error
    expect(mySql.createConnection).toHaveBeenCalledTimes(dbConfig.connRetryCount + 1);
  });
});
