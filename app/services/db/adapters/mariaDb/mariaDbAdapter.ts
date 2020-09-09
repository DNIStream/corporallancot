'use strict';

const DbAdapterBase = require("@dbAdapters/dbAdapterBase");

module.exports = class MariaDbAdapter extends DbAdapterBase {
  constructor({ mySql, dbConfig, logger }) {
    super(dbConfig, logger);
    this.mysql = mySql;
  }

  async connect() {
    if (this.connection) {
      // TODO: Need to check that the connection is still active in case of a disconnect...
      this.logger.log(`${this.logPrefix}Connection to '${this.dbConfig.server}/${this.dbConfig.database}' already established.`);
      return;
    }

    let retry = 0;
    const retryCount = this.dbConfig.connRetryCount;
    const retryDelay = this.dbConfig.connRetryDelay;

    this.logger.log(`${this.logPrefix}Connecting to '${this.dbConfig.server}/${this.dbConfig.database}'`);

    while (!this.connection) {
      try {
        this.connection = await this.tryConnection();
        this.logger.log(`${this.logPrefix}Connected to database '${this.connection.config.host}'`);
        break;
      } catch (e) {
        // TODO: Potentially need to test for the following error codes
        // ENOTFOUND
        // ECONNABORTED
        // ECONNREFUSED
        // ECONNRESET
        // ETIMEDOUT

        if (e.code === 'ECONNREFUSED') {
          if (retry >= retryCount) {
            this.logger.log(`${this.logPrefix}Database connection timeout. Retries exceeded (${retryCount})`);
            throw e;
          }
          retry++;
          this.logger.log(`${this.logPrefix}Connection failed. Retry ${retry} in ${retryDelay}ms`);
          await this.sleep(retryDelay);
          continue;
        }
        throw e;
      }
    }
  }

  async tryConnection() {
    return await this.mysql.createConnection({
      host: this.dbConfig.server,
      user: this.dbConfig.username,
      password: this.dbConfig.password,
      database: this.dbConfig.database
    });
  }

  async sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
}
