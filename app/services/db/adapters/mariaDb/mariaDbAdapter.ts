import { DbConfig } from '../../../../config/db/dbConfig.js';
import { Logger } from '../../../logging/logger.js';
import { DbAdapterBase } from '../dbAdapterBase.js';

import { Connection, createConnection } from 'mysql2/promise';

export class MariaDbAdapter extends DbAdapterBase {
  private _connection: Connection;
  public get connection(): Connection {
    return this._connection;
  }

  constructor(dbConfig: DbConfig, logger: Logger) {
    super(dbConfig, logger);
  }

  public async connect(): Promise<void> {
    if (this._connection) {
      // TODO: Need to check that the connection is still active in case of a disconnect...
      this.logger.log(`${this.logPrefix}Connection to '${this.dbConfig.server}/${this.dbConfig.database}' already established.`);
      return;
    }

    let retry = 0;
    const retryCount = this.dbConfig.connRetryCount;
    const retryDelay = this.dbConfig.connRetryDelay;

    this.logger.log(`${this.logPrefix}Connecting to '${this.dbConfig.server}/${this.dbConfig.database}'`);

    while (!this._connection) {
      try {
        this._connection = await this.tryConnection();
        this.logger.log(`${this.logPrefix}Connected to database '${this._connection.config.host}'`);
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

  private async tryConnection(): Promise<Connection> {
    return await createConnection({
      host: this.dbConfig.server,
      user: this.dbConfig.username,
      password: this.dbConfig.password,
      database: this.dbConfig.database
    });
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
}
