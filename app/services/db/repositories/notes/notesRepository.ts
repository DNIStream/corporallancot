import { Logger } from '../../../logging/logger.js';
import { RepositoryBase } from '../repositoryBase.js';
import { MariaDbAdapter } from '../../adapters/mariaDb/mariaDbAdapter.js';
import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2/promise';

export class NotesRepository extends RepositoryBase {
  private readonly _dbAdapter: MariaDbAdapter;
  private readonly _tableName: string;
  private _tableCreated: boolean;

  constructor(dbAdapter: MariaDbAdapter, logger: Logger) {
    super(logger);

    this._dbAdapter = dbAdapter;
    this._tableName = "notes";
    this._tableCreated = false;
  }

  // All calls in this method must be thread safe as described in the DbRepositoryBase
  // super class. this.init() is designed to be called by every method that may need a DB
  // connection, with the exception of any setup methods called by itself (such as
  // setupTable()), which would create an infinite loop.
  protected async init(): Promise<void> {
    await this._dbAdapter.connect();
    await this.setupTable();
  }

  private async setupTable(): Promise<void> {
    if (this._tableCreated) {
      return;
    }

    this.logger.log(`${this.logPrefix}Checking '${this._tableName}' table`);

    const [resultHeader] = await this._dbAdapter.connection.query<ResultSetHeader>(`
CREATE TABLE IF NOT EXISTS ${this._tableName} (
  id          INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  timestamp   DATETIME,
  user_id     BIGINT(8),
  channel_id  BIGINT(8),
  nick        VARCHAR(255) NOT NULL,
  server      VARCHAR(255) NOT NULL,
  message     LONGTEXT NOT NULL
);`);
    if (resultHeader.warningStatus === 0) {
      this.logger.log(`${this.logPrefix}'${this._tableName}' table created`);
    } else {
      this.logger.log(`${this.logPrefix}'${this._tableName}' table already exists`);
    }
    this._tableCreated = true;
  }

  public async insertNote(timestamp: Date, userID: number, channelID: number, nick: string, message: string, server: string): Promise<[RowDataPacket[], FieldPacket[]]> {
    await this.init();
    return await this._dbAdapter.connection.query<RowDataPacket[]>(`INSERT INTO ${this._tableName} (timestamp, user_id, channel_id, nick, message, server) VALUES (?, ?, ?, ?, ?, ?);`,
      [timestamp, userID, channelID, nick, message, server]
    );
  }

  public async getRandomNote(): Promise<[RowDataPacket[], FieldPacket[]]> {
    await this.init();
    return await this._dbAdapter.connection.execute(
      `SELECT nick, message FROM ${this._tableName} ORDER BY RAND() LIMIT 1;`
    );
  }

  public async getRandomNoteByContent(message: string): Promise<[RowDataPacket[], FieldPacket[]]> {
    await this.init();
    return await this._dbAdapter.connection.execute(
      `SELECT nick, message FROM ${this._tableName} WHERE message LIKE ? ORDER BY RAND() LIMIT 1;`,
      [`%${message}%`]
    );
  }
}
