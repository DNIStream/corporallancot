import { ChatListenerConfigBase } from '../chatListenerConfigBase.js';
import { BotConfig } from '../../config/bot/botConfig';

export class DiscordChatListenerConfig extends ChatListenerConfigBase {

  public token: string = "";

  constructor(botConfig: BotConfig) {
    super(botConfig);

    // Defaults
    this.enabled = false;

    if (!botConfig || !botConfig.chatListeners || botConfig.chatListeners.length <= 0) {
      return;
    }
    const config = botConfig.chatListeners.find(x => x.name == "discord");
    if (!config || !config.settings) {
      return;
    }

    // Inject found config settings
    this.token = <string>(config.settings.key);
    this.enabled = config.enabled;
  }
}
