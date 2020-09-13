import { BotConfig } from 'config/bot/botConfig.js';

export class ChatListenerConfigBase {
  public name: string = "";
  public enabled: boolean = false;
  public enabledActions: string[] = [];
  public settings: any = {};

  constructor(botConfig: BotConfig) {
    // TODO: Load settings dynamically based on botConfig input
    if (!botConfig || !botConfig.chatListeners || botConfig.chatListeners.length <= 0) {
      return;
    }
    const config = botConfig.chatListeners.find(x => x.name == this.name);
    if (!config || !config.settings) {
      return;
    }
  }
}
