'use strict';

module.exports = class NotesPersistenceHandler {
  constructor({ logger, notesRepository }) {
    this.logger = logger;
    this.repository = notesRepository;

    this.logPrefix = `[${this.constructor.name}] `;
    this.logger.log(`${this.logPrefix}Initialising`);
  }

  async insertNote(timestamp, userID, channelID, nick, message, server) {
    this.logger.log(`${this.logPrefix}Inserting new note`);
    return await this.repository.insertNote(timestamp, userID, channelID, nick, message, server);
  }

  async getRandomNote() {
    this.logger.log(`${this.logPrefix}Retrieving random note`);
    return await this.repository.getRandomNote();
  }

  async getRandomNoteByContent(message) {
    this.logger.log(`${this.logPrefix}Retrieving random note with search term '${message}'`);
    return await this.repository.getRandomNoteByContent(message);
  }
};
