'use strict';

module.exports = class Bot {
  constructor({ logger, botConfig, chatListeners }) {
    this.logPrefix = `[${this.constructor.name}] `;
    this.logger = logger;
    this.logger.log(`${this.logPrefix}*** Welcome to ${botConfig.name} v${botConfig.version}! ***`);
    this.logger.log(`${this.logPrefix}*** ${botConfig.description} ***`);

    this.chatListeners = chatListeners;
  }

  async init() {
    this.logger.log(`${this.logPrefix}Initialising bot`);

    for (const listener of this.chatListeners) {
      await listener.init();
    }
  }
};
