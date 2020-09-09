'use strict';

const DbAdapterBase = require("./dbAdapterBase");
const NotImplemented = require("@errors/notImplemented");

describe("dbAdapterBase", () => {
  const logger = {
    log: function () { }
  };
  const dbConfig = { };

  it("sets logger to .logger property", () => {
    const dbAdapter = new DbAdapterBase(dbConfig, logger);
    expect(dbAdapter.logger).toBe(logger);
  });

  it("sets dbConfig to .dbConfig property", () => {
    const dbAdapter = new DbAdapterBase(dbConfig, logger);
    expect(dbAdapter.dbConfig).toBe(dbConfig);
  });

  it("sets .connection property to null (must be set by child class)", () => {
    const dbAdapter = new DbAdapterBase(dbConfig, logger);
    expect(dbAdapter.connection).toBeNull();
  });

  it("sets logPrefix to square-bracketed constructor name with space suffix", () => {
    const dbAdapter = new DbAdapterBase(dbConfig, logger);
    expect(dbAdapter.logPrefix).toBe("[DbAdapterBase] ");
  });

  it("connect() throws NotImplemented (should be implemented in child class)", async () => {
    // Arrange
    const dbAdapter = new DbAdapterBase(dbConfig, logger);
    // Act & Assert
    await expectAsync(dbAdapter.connect()).toBeRejectedWith(NotImplemented);
  });
});

