import { IActionHandlerMessage } from '../actionHandlers/actionHandlerMessage.js';
import { LoggingBase } from '../loggingBase.js';
import { Logger } from '../services/logging/logger.js';

export abstract class MessageResolverBase extends LoggingBase {
  constructor(logger: Logger) {
    super(logger);
  }

  public abstract async resolve(chatListenerMessage: unknown): Promise<IActionHandlerMessage>;

  public resolveChatMessage(chatMessage: string): IActionHandlerMessage {
    if (!chatMessage || chatMessage.replace(/\s/g, '').length <= 0) {
      throw new Error("'message' is required");
    }

    // Set defaults
    const action: IActionHandlerMessage = {
      command: "",
      data: "",
      isBangCommand: false,
      // TODO: Check these properties - were not included in original JS
      channelId: 0,
      channelName: "",
      isBot: false,
      nick: "",
      userId: 0,
      server: "",
      timestamp: new Date()
    }

    // Slice up message string to make parameters
    const matches = /^!([a-z]+)(?:\s+(.*))?$/gi.exec(chatMessage);
    if (!matches || matches.length <= 0) {
      action.data = chatMessage;
    } else {
      action.isBangCommand = true;
      action.command = matches[1].toLowerCase();
      if (matches[2]) {
        action.data = matches[2];
      }
    }

    return action;
  }
}
