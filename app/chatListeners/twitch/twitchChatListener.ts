import { RefreshableAuthProvider, RefreshConfig, StaticAuthProvider } from 'twitch-auth';
import { ChatClient, PrivateMessage } from 'twitch-chat-client';

import { ChatListenerBase } from '../chatListenerBase.js';
import { Logger } from '../../services/logging/logger.js';
import { ActionHandlerResolver } from '../../actionHandlers/actionHandlerResolver.js';
import { TwitchChatListenerConfig } from './twitchChatListenerConfig.js';
import { TwitchMessageResolver } from './twitchMessageResolver.js';
import { TokensPersistenceHandler } from '../../persistenceHandlers/tokens/tokensPersistenceHandler.js';

export class TwitchChatListener extends ChatListenerBase {
  protected config: TwitchChatListenerConfig;
  private persistenceHandler: TokensPersistenceHandler;
  private chatClient: ChatClient;

  constructor(logger: Logger, actionHandlerResolver: ActionHandlerResolver, twitchChatListenerConfig: TwitchChatListenerConfig, twitchMessageResolver: TwitchMessageResolver, tokensPersistenceHandler: TokensPersistenceHandler) {
    super(logger, actionHandlerResolver, twitchMessageResolver);

    this.config = twitchChatListenerConfig;
    this.persistenceHandler = tokensPersistenceHandler;
  }

  public async init(): Promise<void> {
    this.logger.log(`${this.logPrefix}Initialising - authenticating`);

    const clientId = this.config.clientId;
    const clientSecret = this.config.clientSecret;

    this.logger.log(`${this.logPrefix}Retrieving tokens from database`);
    const [tokenDataRows] = await this.persistenceHandler.getByServer(this.config.name);
    const tokenData = tokenDataRows[0];

    let accessToken: string;
    let refreshToken: string;
    let expiryTimestamp: Date | null = null;

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
      await this.persistenceHandler.insert(this.config.name, accessToken, refreshToken, new Date(), null);
    }

    this.logger.log(`${this.logPrefix}Creating auth provider`);

    const staticAuthProvider = new StaticAuthProvider(clientId, accessToken);
    const refreshConfig = <RefreshConfig>{
      clientSecret,
      refreshToken: refreshToken,
      expiry: expiryTimestamp === null ? null : new Date(expiryTimestamp),
      onRefresh: async ({ accessToken, refreshToken, expiryDate }) => {
        this.logger.log(`${this.logPrefix}Token refreshed, saving`);

        await this.persistenceHandler.update(this.config.name, accessToken, refreshToken, expiryDate);

        this.logger.log(`${this.logPrefix}Token saved successfully`);
      }
    };
    const authProvider = new RefreshableAuthProvider(staticAuthProvider, refreshConfig);

    this.chatClient = new ChatClient(authProvider, { channels: [this.config.channel] });

    this.logger.log(`${this.logPrefix}Connecting to '${this.config.channel}' chat`);
    await this.chatClient.connect();
    this.logger.log(`${this.logPrefix}Connected to chat`);

    this.chatClient.onMessage(async (channel: string, user: string, message: string, msg: PrivateMessage) => {
      try {
        await this.handleMessage(msg);
      } catch (e) {
        this.logger.log(`${this.logPrefix}Twitch message handling error:\n`, e);
      }
    });

    this.logger.log(`${this.logPrefix}Initialised successfully`);
  }

  protected async handleMessage(twitchMessage: PrivateMessage): Promise<void> {
    await super.handleMessage(twitchMessage);
  }

  protected async replyAction(twitchMessage: PrivateMessage, replyText: string): Promise<void> {
    this.chatClient.say(twitchMessage.target.value, `@${twitchMessage.prefix?.nick} ${replyText}`)
  }
}
