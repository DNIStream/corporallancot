'use strict';

const NotImplemented = require("@errors/notImplemented");
const ActionHandlerMessage = require("@actionHandlers/actionHandlerMessage");

module.exports = class MessageResolverBase {
  async resolve() {
    // Must be overridden and must call resolveChatMessage(inputMessage.<chatMessageProp>)
    throw NotImplemented;
  }

  resolveChatMessage(chatMessage) {
    if (!chatMessage || chatMessage.replace(/\s/g, '').length <= 0) {
      throw new Error("'message' is required");
    }

    // Set defaults
    const action = new ActionHandlerMessage();
    action.command = "";
    action.data = "";
    action.isBangCommand = false;

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
