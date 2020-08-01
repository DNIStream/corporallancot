'use strict';

const ChatListenerBase = require("@chatListeners/chatListenerBase");

module.exports = class DiscordChatListener extends ChatListenerBase {
  constructor({ logger, actionHandlerResolver, discordChatListenerConfig, discordMessageResolver, discordClient }) {
    super(logger, actionHandlerResolver, discordMessageResolver);

    this.config = discordChatListenerConfig;
    this.client = discordClient;
  }

  async init() {
    this.logger.log(`${this.logPrefix}Initialising - logging in`);

    await this.client
      .login(this.config.token)
      .then(() => {
        this.logger.log(`${this.logPrefix}Logged in`);
        this.logger.log(`${this.logPrefix}Registering message listener`);

        this.client.on("message", async (msg) => {
          await this.handleMessage(msg)
            .catch((e) => {
              this.logger.log(`${this.logPrefix}Discord message handling error:\n`, e);
            });
        });

        this.logger.log(`${this.logPrefix}Message listener registered`);
      });

    this.logger.log(`${this.logPrefix}Initialised successfully`);
  }

  async handleMessage(discordMessage) {
    await super.handleMessage(discordMessage);
  }

  async replyAction(discordMessage, replyText) {
    discordMessage.reply(replyText);
  }
}
