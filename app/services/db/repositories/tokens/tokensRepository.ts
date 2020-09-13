import { RepositoryBase } from '../repositoryBase.js';
import { Logger } from '../../../logging/logger.js';
import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { MariaDbAdapter } from '../../adapters/mariaDb/mariaDbAdapter.js';

export class TokensRepository extends RepositoryBase {
  private readonly _dbAdapter: MariaDbAdapter;
  private readonly _tableName: string;
  private _tableCreated: boolean;

  constructor(dbAdapter: MariaDbAdapter, logger: Logger) {
    super(logger);

    this._dbAdapter = dbAdapter;
    this._tableName = "tokens";
    this.logger.log(`${this.logPrefix}Initialising repository`);
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
  Id            SMALLINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  Server        VARCHAR(30) NOT NULL,
  AccessToken   VARCHAR(200) NOT NULL,
  RefreshToken  VARCHAR(200),
  DateCreated   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(2),
  ExpiryDate    DATETIME,
  CONSTRAINT UQ_Server UNIQUE (Server)
);`);
    if (resultHeader.warningStatus === 0) {
      this.logger.log(`${this.logPrefix}'${this._tableName}' table created`);
    } else {
      this.logger.log(`${this.logPrefix}'${this._tableName}' table already exists`);
    }
    this._tableCreated = true;
  }

  public async getByServer(server: string): Promise<[RowDataPacket[], FieldPacket[]]> {
    await this.init();
    return await this._dbAdapter.connection.execute(
      `SELECT * FROM ${this._tableName} WHERE Server = ?;`, [server]);
  }

  public async insert(server: string, accessToken: string, refreshToken: string, dateCreated: Date, expiryDate: Date | null): Promise<[RowDataPacket[], FieldPacket[]]> {
    await this.init();
    return await this._dbAdapter.connection.query(`INSERT INTO \`${this._tableName}\` (Server, AccessToken, RefreshToken, DateCreated, ExpiryDate) VALUES (?, ?, ?, ?, ?) RETURNING *;`,
      [server, accessToken, refreshToken, dateCreated, expiryDate, server]
    );
  }

  public async update(server: string, accessToken: string, refreshToken: string, expiryDate: Date | null): Promise<[RowDataPacket[], FieldPacket[]]> {
    await this.init();
    return await this._dbAdapter.connection.query(`UPDATE ${this._tableName}
    SET
      AccessToken = ?,
      RefreshToken = ?,
      ExpiryDate = ?
    WHERE Id = ?;`, [accessToken, refreshToken, expiryDate, server]);
  }
}
