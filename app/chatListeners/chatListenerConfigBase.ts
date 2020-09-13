import { AppConfig } from '../config/app/appConfig';

export class ChatListenerConfigBase {

  protected name: string = "";
  protected enabled: boolean = false;
  protected enabledActions: string[] = [];
  protected settings: any = {};

  constructor(appConfig: AppConfig) {
    if (!appConfig || !appConfig.bot || !appConfig.bot.chatListeners || appConfig.bot.chatListeners.length <= 0) {
      return;
    }
    const config = appConfig.bot.chatListeners.find(x => x.name == this.name);
    if (!config || !config.settings) {
      return;
    }
  }
}
