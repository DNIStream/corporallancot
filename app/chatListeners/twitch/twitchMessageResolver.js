'use strict';

const MessageResolverBase = require("@chatListeners/messageResolverBase");

module.exports = class TwitchMessageResolver extends MessageResolverBase {
  constructor({ logger, twitchChatListenerConfig }) {
    super();
    this.logger = logger;
    this.config = twitchChatListenerConfig;
    this.logPrefix = `[${this.constructor.name}] `;
  }

  /**
   * Resolves a twitch message to an @class ActionHandlerMessage
   */
  async resolve(twitchMessage) {
    const message = super.resolveChatMessage(twitchMessage.message.value);

    // Append twitch specific message content
    message.server = "twitch";

    message.timestamp = new Date(+twitchMessage._tags.get('tmi-sent-ts'));
    message.userId = twitchMessage._tags.get('user-id');
    message.channelId = twitchMessage._tags.get('room-id');

    message.nick = twitchMessage._prefix.nick;

    // Look up bot names in configuration
    message.isBot = this.config.botNicks.includes(message.nick);

    message.channelName = twitchMessage.target.value;

    return message;
  }
}
