import { BotConfig } from 'config/bot/botConfig.js';
import { ChatListenerConfigBase } from '../chatListenerConfigBase.js';

export class TwitchChatListenerConfig extends ChatListenerConfigBase {
  public clientId: string = "";
  public clientSecret: string = "";
  public accessToken: string = "";
  public refreshToken: string = "";
  public botNicks!: string[];
  public channel: string = "";

  constructor(botConfig: BotConfig) {
    super(botConfig);

    // Defaults
    this.enabled = false;
    this.name = "twitch";

    if (!botConfig || !botConfig.chatListeners || botConfig.chatListeners.length <= 0) {
      return;
    }
    const config = Object.assign(this, botConfig.chatListeners.find(x => x.name == this.name));
    if (!config) {
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
