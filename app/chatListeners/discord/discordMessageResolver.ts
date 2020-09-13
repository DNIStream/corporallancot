import { MessageResolverBase } from '../messageResolverBase.js';
import { Logger } from '../../services/logging/logger.js';
import { IActionHandlerMessage } from '../../actionHandlers/actionHandlerMessage.js';
import { Message } from 'discord.js';

export class DiscordMessageResolver extends MessageResolverBase {
  constructor(logger: Logger) {
    super(logger);
  }

  /**
   * Resolves a discord message to an @class ActionHandlerMessage
   */
  async resolve(discordMessage: Message): Promise<IActionHandlerMessage> {
    const message = super.resolveChatMessage(discordMessage.content);

    // Append discord specific message content
    message.server = "discord";

    // TODO: Ugh, null coalesce plsthxadmin!
    if (discordMessage) {
      message.timestamp = discordMessage.createdAt;
      if (discordMessage.author) {
        message.userId = +discordMessage.author.id;
        message.nick = discordMessage.author.username;
        message.isBot = discordMessage.author.bot;
      }
      if (discordMessage.channel) {
        message.channelId = +discordMessage.channel.id;
      }
    }
    return message;
  }
}
