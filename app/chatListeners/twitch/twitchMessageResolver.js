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
    const message = super.resolveChatMessage(twitchMessage.message.value);

    // Append twitch specific message content
    message.server = "twitch";

    if (twitchMessage) {
      message.timestamp = new Date(+twitchMessage._tags.get('tmi-sent-ts'));
      message.userId = twitchMessage._tags.get('user-id');
      message.nick = twitchMessage._prefix.nick;
      message.isBot = false; // TODO: Populate based on nick (from settings.botNicks in config)
      message.channelId = twitchMessage._tags.get('room-id');
      message.channelName = twitchMessage.target.value;
    }
    return message;
  }
}
