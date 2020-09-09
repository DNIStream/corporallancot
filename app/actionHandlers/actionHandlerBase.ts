'use strict';

const NotImplemented = require("@errors/notImplemented");

module.exports = class ActionHandlerBase {
  constructor(logger, name) {
    this.name = name;
    this.logger = logger;
    this.logPrefix = `[${this.constructor.name}] `;
    this.logger.log(`${this.logPrefix}Initialising '!${name}' action handler`);
  }

  async handle() {
    throw NotImplemented;
  }
};
