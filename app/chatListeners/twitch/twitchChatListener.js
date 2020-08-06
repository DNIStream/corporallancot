'use strict';

const ChatListenerBase = require("@chatListeners/chatListenerBase");

module.exports = class TwitchChatListener extends ChatListenerBase {
  constructor({ logger, actionHandlerResolver, twitchChatListenerConfig, twitchMessageResolver, tokensPersistenceHandler, twitchAuth, twitchChatClient }) {
    super(logger, actionHandlerResolver, twitchMessageResolver);

    this.config = twitchChatListenerConfig;
    this.twitchChatClient = twitchChatClient;
    this.twitchAuth = twitchAuth;
    this.persistenceHandler = tokensPersistenceHandler;
  }

  async init() {
    this.logger.log(`${this.logPrefix}Initialising - authenticating`);

    const clientId = this.config.clientId;
    const clientSecret = this.config.clientSecret;

    this.logger.log(`${this.logPrefix}Retrieving tokens from database`);
    const [tokenDataRows] = await this.persistenceHandler.getByServer(this.config.name);
    const tokenData = tokenDataRows[0];

    let accessToken = "";
    let refreshToken = "";
    let expiryTimestamp = null;

    if (tokenData) {
      this.logger.log(`${this.logPrefix}Tokens found in database`);
      accessToken = tokenData.AccessToken;
      refreshToken = tokenData.RefreshToken;
      expiryTimestamp = tokenData.ExpiryDate;
    }
    else {
      this.logger.log(`${this.logPrefix}Tokens not found in database, using initial config tokens`);
      accessToken = this.config.accessToken;
      refreshToken = this.config.refreshToken;
      // Insert initial record
      await this.persistenceHandler.insert(this.config.name, accessToken, refreshToken, new Date(), expiryTimestamp);
    }

    this.logger.log(`${this.logPrefix}Creating auth provider`);

    const staticAuthProvider = new this.twitchAuth.StaticAuthProvider(clientId, accessToken);
    const refreshConfig = {
      clientSecret,
      refreshToken: refreshToken,
      expiry: expiryTimestamp === null ? null : new Date(expiryTimestamp),
      onRefresh: async ({ accessToken, refreshToken, expiryDate }) => {
        this.logger.log(`${this.logPrefix}Token refreshed, saving`);

        expiryDate = expiryDate === null ? null : expiryDate.getTime();
        await this.persistenceHandler.update(this.config.name, accessToken, refreshToken, expiryDate);

        this.logger.log(`${this.logPrefix}Token saved successfully`);
      }
    };
    const authProvider = new this.twitchAuth.RefreshableAuthProvider(staticAuthProvider, refreshConfig);

    this.chatClient = new this.twitchChatClient.ChatClient(authProvider, { channels: [this.config.channel] });

    this.logger.log(`${this.logPrefix}Connecting to '${this.config.channel}' chat`);
    await this.chatClient.connect();
    this.logger.log(`${this.logPrefix}Connected to chat`);

    this.chatClient.onPrivmsg(async (channel, user, message, msg) => {
      try {
        await this.handleMessage(msg);
      } catch (e) {
        this.logger.log(`${this.logPrefix}Twitch message handling error:\n`, e);
      }
    });

    this.logger.log(`${this.logPrefix}Initialised successfully`);
  }

  async handleMessage(twitchMessage) {
    await super.handleMessage(twitchMessage);
  }

  async replyAction(twitchMessage, replyText) {
    this.chatClient.say(twitchMessage.target.value, `@${twitchMessage._prefix.nick} ${replyText}`)
  }
}
