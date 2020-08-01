'use strict';

const DbRepositoryBase = require("@dbRepositories/dbRepositoryBase");

module.exports = class TokensRepository extends DbRepositoryBase {
  constructor({ dbAdapter, logger }) {
    super(dbAdapter, logger, "TokensRepository");

    this.tableName = "tokens";
    this.logger.log(`${this.logPrefix}Initialising repository`);
    this.tableCreated = false;
  }

  // All calls in this method must be thread safe as described in the DbRepositoryBase
  // super class. this.init() is designed to be called by every method that may need a DB
  // connection, with the exception of any setup methods called by itself (such as
  // setupTable()), which would create an infinite loop.
  async init() {
    await this.dbAdapter.connect();
    await this.setupTable();
  }

  async setupTable() {
    if (this.tableCreated) {
      return;
    }

    this.logger.log(`${this.logPrefix}Checking '${this.tableName}' table`);

    const [resultHeader] = await this.dbAdapter.connection.query(`
CREATE TABLE IF NOT EXISTS ${this.tableName} (
  Id            SMALLINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  Server        VARCHAR(30) NOT NULL,
  AccessToken   VARCHAR(200) NOT NULL,
  RefreshToken  VARCHAR(200),
  DateCreated   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(2),
  ExpiryDate    DATETIME,
  CONSTRAINT UQ_Server UNIQUE (Server)
);`);
    if (resultHeader.warningStatus === 0) {
      this.logger.log(`${this.logPrefix}'${this.tableName}' table created`);
    } else {
      this.logger.log(`${this.logPrefix}'${this.tableName}' table already exists`);
    }
    this.tableCreated = true;
  }

  async getByServer(server) {
    await this.init();
    return await this.dbAdapter.connection.query(
      `SELECT * FROM ${this.tableName} WHERE Server = ?;`, [server]);
  }

  async insert(server, accessToken, refreshToken, dateCreated, expiryDate) {
    await this.init();
    return await this.dbAdapter.connection.query(`INSERT INTO \`${this.tableName}\` (Server, AccessToken, RefreshToken, DateCreated, ExpiryDate) VALUES (?, ?, ?, ?, ?) RETURNING *;`,
      [server, accessToken, refreshToken, dateCreated, expiryDate, server]
    );
  }

  async update(server, accessToken, refreshToken, expiryDate) {
    await this.init();
    return await this.dbAdapter.connection.query(`UPDATE ${this.tableName}
    SET
      AccessToken = ?,
      RefreshToken = ?,
      ExpiryDate = ?
    WHERE Id = ?;`,
      [accessToken, refreshToken, expiryDate, server]
    );
  }
}
