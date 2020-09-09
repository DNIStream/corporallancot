'use strict';

module.exports = class TwitchChatListenerConfig {
  constructor({ appConfig }) {
    // TODO: Implement base class with shared properties
    // Defaults
    this.token = null;
    this.enabled = false;
    this.name = "twitch";

    if (!appConfig || !appConfig.bot || !appConfig.bot.chatListeners || appConfig.bot.chatListeners.length <= 0) {
      return;
    }
    const config = appConfig.bot.chatListeners.find(x => x.name == this.name);
    if (!config || !config.settings) {
      return;
    }

    // Inject found config settings
    this.clientId = config.settings.clientId;
    this.clientSecret = config.settings.clientSecret;
    this.accessToken = config.settings.accessToken;
    this.refreshToken = config.settings.refreshToken;
    this.botNicks = config.settings.botNicks;
    this.channel = config.settings.channel;

    this.enabled = config.enabled;
  }
}
