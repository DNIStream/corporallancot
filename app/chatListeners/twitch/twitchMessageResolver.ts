import { MessageResolverBase } from '../messageResolverBase.js';
import { Logger } from '../../services/logging/logger.js';
import { TwitchChatListenerConfig } from './twitchChatListenerConfig.js';
import { TwitchPrivateMessage } from 'twitch-chat-client/lib/StandardCommands/TwitchPrivateMessage';
import { IActionHandlerMessage } from '../../actionHandlers/actionHandlerMessage.js';

export class TwitchMessageResolver extends MessageResolverBase {
  private config: TwitchChatListenerConfig;

  constructor(logger: Logger, twitchChatListenerConfig: TwitchChatListenerConfig) {
    super(logger);
    this.config = twitchChatListenerConfig;
  }

  /**
   * Resolves a twitch message to an @class ActionHandlerMessage
   */
  public async resolve(twitchMessage: TwitchPrivateMessage): Promise<IActionHandlerMessage> {
    const message = super.resolveChatMessage(twitchMessage.message.value);

    // Append twitch specific message content
    message.server = "twitch";
    const ts = twitchMessage.tags.get('tmi-sent-ts') || 0;
    message.timestamp = new Date(+ts);
    message.userId = +(twitchMessage.tags.get('user-id') || 0);
    message.channelId = +(twitchMessage.tags.get('room-id') || 0);

    message.nick = twitchMessage.prefix === undefined ? "" : twitchMessage.prefix.nick;

    // Look up bot names in configuration
    message.isBot = this.config.botNicks.includes(message.nick);

    message.channelName = twitchMessage.target.value;

    return message;
  }
}
