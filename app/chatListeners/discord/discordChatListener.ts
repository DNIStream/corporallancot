import { Client, Message } from 'discord.js';

import { Logger } from '../../services/logging/logger.js';
import { ChatListenerBase } from '../chatListenerBase.js';
import { ActionHandlerResolver } from '../../actionHandlers/actionHandlerResolver.js';
import { DiscordChatListenerConfig } from './discordChatListenerConfig.js';
import { DiscordMessageResolver } from './discordMessageResolver.js';

export class DiscordChatListener extends ChatListenerBase {
  protected config: DiscordChatListenerConfig;
  private client: Client;

  constructor(logger: Logger, actionHandlerResolver: ActionHandlerResolver, discordChatListenerConfig: DiscordChatListenerConfig, discordMessageResolver: DiscordMessageResolver, discordClient: Client) {
    super(logger, actionHandlerResolver, discordMessageResolver);

    this.config = discordChatListenerConfig;
    this.client = discordClient;
  }

  public async init(): Promise<void> {
    this.logger.log(`${this.logPrefix}Initialising - logging in`);

    await this.client
      .login(this.config.token)
      .then(() => {
        this.logger.log(`${this.logPrefix}Logged in`);
        this.logger.log(`${this.logPrefix}Registering message listener`);

        this.client.on("message", async (msg) => {
          await this.handleMessage(msg)
            .catch((e) => {
              this.logger.log(`${this.logPrefix}Discord message handling error:\n`, e);
            });
        });

        this.logger.log(`${this.logPrefix}Message listener registered`);
      });

    this.logger.log(`${this.logPrefix}Initialised successfully`);
  }

  protected async handleMessage(discordMessage: Message): Promise<void> {
    await super.handleMessage(discordMessage);
  }

  protected async replyAction(discordMessage: Message, replyText: string): Promise<void> {
    discordMessage.reply(replyText);
  }
}
