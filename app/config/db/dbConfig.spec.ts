'use strict';

const DbConfig = require("./dbConfig");

describe("dbConfig", function () {
  it("maps injected appConfig.database.name property to .database", function () {
    const appConfig = {
      database: {
        name: "test_database"
      }
    };
    const dbConfig = new DbConfig({ appConfig: appConfig });
    expect(dbConfig.database).toBe(appConfig.database.name);
  });

  it("maps injected appConfig.database.server property to .server", function () {
    const appConfig = {
      database: {
        server: "test_server"
      }
    };
    const dbConfig = new DbConfig({ appConfig: appConfig });
    expect(dbConfig.server).toBe(appConfig.database.server);
  });

  it("maps injected appConfig.database.user property to .username", function () {
    const appConfig = {
      database: {
        user: "test_user"
      }
    };
    const dbConfig = new DbConfig({ appConfig: appConfig });
    expect(dbConfig.username).toBe(appConfig.database.user);
  });

  it("maps injected appConfig.database.password property to .password", function () {
    const appConfig = {
      database: {
        password: "test_password"
      }
    };
    const dbConfig = new DbConfig({ appConfig: appConfig });
    expect(dbConfig.password).toBe(appConfig.database.password);
  });

  it("maps injected appConfig.database.connectionRetryCount property to .connRetryCount", function () {
    const appConfig = {
      database: {
        connectionRetryCount: 3
      }
    };
    const dbConfig = new DbConfig({ appConfig: appConfig });
    expect(dbConfig.connRetryCount).toBe(appConfig.database.connectionRetryCount);
  });

  it("maps injected appConfig.database.connectionRetryDelay property to .connRetryDelay", function () {
    const appConfig = {
      database: {
        connectionRetryDelay: 3000
      }
    };
    const dbConfig = new DbConfig({ appConfig: appConfig });
    expect(dbConfig.connRetryDelay).toBe(appConfig.database.connectionRetryDelay);
  });

  it("uses default value of 'localhost' for .server if appConfig property is empty", function () {
    const appConfig = {};
    const dbConfig = new DbConfig({ appConfig: appConfig });
    expect(dbConfig.server).toBe("localhost");
  });

  it("uses default value of '10' for .connRetryCount if appConfig property is empty", function () {
    const appConfig = {};
    const dbConfig = new DbConfig({ appConfig: appConfig });
    expect(dbConfig.connRetryCount).toBe(10);
  });

  it("uses default value of '5000' for .connRetryDelay if appConfig property is empty", function () {
    const appConfig = {};
    const dbConfig = new DbConfig({ appConfig: appConfig });
    expect(dbConfig.connRetryDelay).toBe(5000);
  });

  it("uses default value of 'notes' for .database if appConfig property is empty", function () {
    const appConfig = {};
    const dbConfig = new DbConfig({ appConfig: appConfig });
    expect(dbConfig.database).toBe("notes");
  });
});
