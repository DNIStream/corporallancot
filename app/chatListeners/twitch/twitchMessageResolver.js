'use strict';

const MessageResolverBase = require("@chatListeners/messageResolverBase");

module.exports = class TwitchMessageResolver extends MessageResolverBase {
  constructor({ logger }) {
    super();
    this.logger = logger;
    this.logPrefix = `[${this.constructor.name}] `;
  }

  /**
   * Resolves a twitch message to an @class ActionHandlerMessage
   */
  async resolve(twitchMessage) {
    const message = super.resolveChatMessage(twitchMessage.message);

    // Append twitch specific message content
    message.server = "twitch";

    // Ugh, null coalesce plsthxadmin!
    if (twitchMessage) {
      message.timestamp = new Date();
      if (twitchMessage.user) {
        message.userId = 0;
        message.nick = twitchMessage.user;
        message.isBot = false;
      }
      if (twitchMessage.channel) {
        message.channelName = twitchMessage.channel;
      }
    }
    return message;
  }
}
