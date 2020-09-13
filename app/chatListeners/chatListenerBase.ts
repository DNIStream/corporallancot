import { Logger } from '../services/logging/logger.js';
import { ActionHandlerResolver } from '../actionHandlers/actionHandlerResolver.js';
import { MessageResolverBase } from './messageResolverBase.js';
import { LoggingBase } from '../loggingBase.js';
import { NotImplemented } from '../errors/notImplemented.js';
import { ChatListenerConfigBase } from './chatListenerConfigBase.js';

export class ChatListenerBase extends LoggingBase {
  private readonly _actionHandlerResolver: ActionHandlerResolver;
  private readonly _messageResolver: MessageResolverBase;

  protected config: ChatListenerConfigBase;

  constructor(logger: Logger, actionHandlerResolver: ActionHandlerResolver, messageResolver: MessageResolverBase) {
    super(logger);

    this._actionHandlerResolver = actionHandlerResolver;
    this._messageResolver = messageResolver;
  }

  public async init(): Promise<void> {
    // TODO: Check if this chat listener is enabled
    throw NotImplemented;
  }

  protected async handleMessage(chatListenerMessage: unknown): Promise<void> {
    if (!chatListenerMessage || !(typeof chatListenerMessage === "object")) {
      return;
    }

    const actionHandlerMessage = await this._messageResolver.resolve(chatListenerMessage);

    // Do not attempt to process or log any bot messages for any chat listeners
    if (actionHandlerMessage.isBot === true) {
      return;
    }

    const actionHandler = await this._actionHandlerResolver.resolve(actionHandlerMessage);

    // TODO: Check if this actionHandler is enabled for the resolved actionHandlerMessage.server

    // TODO: Throttle input

    const reply = await actionHandler.handle(actionHandlerMessage);
    if (reply && reply.trimEnd().length > 0) {
      await this.replyAction(chatListenerMessage, reply);
    }
  }

  // Child classes must implement:
  // async replyAction(chatListenerMessage, replyText)
  protected async replyAction(chatListenerMessage: unknown, replyText: string): Promise<void> {
    throw NotImplemented;
  }
}
