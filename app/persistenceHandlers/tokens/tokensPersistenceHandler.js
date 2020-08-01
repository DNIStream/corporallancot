'use strict';

module.exports = class TokensPersistenceHandler {
  constructor({ logger, tokensRepository }) {
    this.logger = logger;
    this.repository = tokensRepository;

    this.logPrefix = `[${this.constructor.name}] `;
    this.logger.log(`${this.logPrefix}Initialising`);
  }

  async insert(server, accessToken, refreshToken, dateCreated, expiryDate) {
    this.logger.log(`${this.logPrefix}Inserting new tokens for server '${server}'`);
    return await this.repository.insert(server, accessToken, refreshToken, dateCreated, expiryDate);
  }

  async update(server, accessToken, refreshToken, expiryDate) {
    this.logger.log(`${this.logPrefix}Updating token for server '${server}'`);
    return await this.repository.update(server, accessToken, refreshToken, expiryDate);
  }

  async getByServer(server) {
    this.logger.log(`${this.logPrefix}Retrieving tokens for server '${server}'`);
    return await this.repository.getByServer(server);
  }
};
