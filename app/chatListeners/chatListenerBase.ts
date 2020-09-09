'use strict';

const NotImplemented = require("@errors/notImplemented");

module.exports = class ChatListenerBase {
  constructor(logger, actionHandlerResolver, messageResolver) {
    this.logger = logger;
    this.actionHandlerResolver = actionHandlerResolver;
    this.messageResolver = messageResolver;
    this.logPrefix = `[${this.constructor.name}] `;
  }

  async init() {
    // TODO: Check if this chat listener is enabled
    throw NotImplemented;
  }

  async handleMessage(chatListenerMessage) {
    if (!chatListenerMessage || !(typeof chatListenerMessage === "object")) {
      return;
    }

    const actionHandlerMessage = await this.messageResolver.resolve(chatListenerMessage);

    // Do not attempt to process or log any bot messages for any chat listeners
    if (actionHandlerMessage.isBot === true) {
      return;
    }

    const actionHandler = await this.actionHandlerResolver.resolve(actionHandlerMessage);

    // TODO: Check if this actionHandler is enabled for the resolved actionHandlerMessage.server

    // TODO: Throttle input

    const reply = await actionHandler.handle(actionHandlerMessage);
    if (reply && reply.trimEnd().length > 0) {
      await this.replyAction(chatListenerMessage, reply);
    }
  }

  // Child classes must implement:
  // async replyAction(chatListenerMessage, replyText)
  async replyAction() {
    throw NotImplemented;
  }
}
