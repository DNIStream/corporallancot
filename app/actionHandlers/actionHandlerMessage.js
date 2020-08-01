'use strict';

module.exports = class ActionHandlerMessage {
  /**
  * This class acts as an interface between the chatListeners and the actionHandlers.
  * @constructor
  */
  constructor() {
    this.command = "";
    this.data = "";
    this.isBangCommand = false;

    // Remaining properties are overridden by each *MessageResolver
    this.server = null;
    this.isBot = false;

    this.userId = 0;
    this.channelId = 0
    this.channelName = "";
    this.nick = "";
    this.timestamp = null;
  }
}
