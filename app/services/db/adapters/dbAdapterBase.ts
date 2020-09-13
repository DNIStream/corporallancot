import { DbConfig } from '../../../config/db/dbConfig.js';
import { Logger } from '../../logging/logger.js';
import { LoggingBase } from '../../../loggingBase.js';

// "Abstract" base class for database injection
export abstract class DbAdapterBase extends LoggingBase {
  protected readonly dbConfig: DbConfig;

  constructor(dbConfig: DbConfig, logger: Logger) {
    super(logger);
    this.dbConfig = dbConfig;
  }

  public abstract async connect(): Promise<void>;
}
