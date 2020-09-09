'use strict';

const NotImplemented = require("@errors/notImplemented");

// "Abstract" base class for database injection
module.exports = class DbAdapterBase {
  constructor(dbConfig, logger) {
    this.logger = logger;
    this.dbConfig = dbConfig;
    this.connection = null;
    this.logPrefix = `[${this.constructor.name}] `;
  }

  async connect() {
    // When implemented, set this.connection
    throw NotImplemented;
  }
}
