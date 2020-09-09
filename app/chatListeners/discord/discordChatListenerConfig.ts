'use strict';

module.exports = class DiscordChatListenerConfig {
  constructor({ appConfig }) {
    // Defaults
    this.token = null;
    this.enabled = false;

    if (!appConfig || !appConfig.bot || !appConfig.bot.chatListeners || appConfig.bot.chatListeners.length <= 0) {
      return;
    }
    const config = appConfig.bot.chatListeners.find(x => x.name == "discord");
    if (!config || !config.settings) {
      return;
    }

    // Inject found config settings
    this.token = config.settings.key;
    this.enabled = config.enabled;
  }
}
