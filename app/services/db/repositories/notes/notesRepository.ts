'use strict';

const DbRepositoryBase = require("@dbRepositories/dbRepositoryBase");

module.exports = class NotesRepository extends DbRepositoryBase {
  constructor({ dbAdapter, logger }) {
    super(dbAdapter, logger, "NotesRepository");

    this.tableName = "notes";
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
  id          INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  timestamp   DATETIME,
  user_id     BIGINT(8),
  channel_id  BIGINT(8),
  nick        VARCHAR(255) NOT NULL,
  server      VARCHAR(255) NOT NULL,
  message     LONGTEXT NOT NULL
);`);
    if (resultHeader.warningStatus === 0) {
      this.logger.log(`${this.logPrefix}'${this.tableName}' table created`);
    } else {
      this.logger.log(`${this.logPrefix}'${this.tableName}' table already exists`);
    }
    this.tableCreated = true;
  }

  async insertNote(timestamp, userID, channelID, nick, message, server) {
    await this.init();
    return await this.dbAdapter.connection.query(`INSERT INTO ${this.tableName} (timestamp, user_id, channel_id, nick, message, server) VALUES (?, ?, ?, ?, ?, ?);`,
      [timestamp, userID, channelID, nick, message, server]
    );
  }

  async getRandomNote() {
    await this.init();
    return await this.dbAdapter.connection.query(
      `SELECT nick, message FROM ${this.tableName} ORDER BY RAND() LIMIT 1;`
    );
  }

  async getRandomNoteByContent(message) {
    await this.init();
    return await this.dbAdapter.connection.query(
      `SELECT nick, message FROM ${this.tableName} WHERE message LIKE ? ORDER BY RAND() LIMIT 1;`,
      [`%${message}%`]
    );
  }
}
