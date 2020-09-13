import { Logger } from '../logging/logger';
import { BotConfig } from '../../config/bot/botConfig';
import { ChatListenerBase } from '../../chatListeners/chatListenerBase';
import { LoggingBase } from '../../loggingBase';

export class Bot extends LoggingBase {
  private readonly chatListeners: ChatListenerBase[];

  constructor(logger: Logger, botConfig: BotConfig, chatListeners: ChatListenerBase[]) {
    super(logger);

    this.logger.log(`${this.logPrefix}*** Welcome to ${botConfig.name} v${botConfig.version}! ***`);
    this.logger.log(`${this.logPrefix}*** ${botConfig.description} ***`);

    this.chatListeners = chatListeners;
  }

  public async init(): Promise<void> {
    this.logger.log(`${this.logPrefix}Initialising bot - ${this.chatListeners.length} chat listeners configured`);

    for (const listener of this.chatListeners) {
      await listener.init();
    }
  }
}
