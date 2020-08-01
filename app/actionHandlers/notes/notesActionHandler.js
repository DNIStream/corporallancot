'use strict';

const ActionHandlerBase = require("@actionHandlers/actionHandlerBase");

module.exports = class NotesActionHandler extends ActionHandlerBase {
  constructor({ logger, notesPersistenceHandler }) {
    super(logger, "notes");
    this.persistenceHandler = notesPersistenceHandler;
    this.help = "`!notes [message]` records a note.";
  }

  async handle(actionHandlerMessage) {
    if (!actionHandlerMessage) {
      return;
    }
    const userID = actionHandlerMessage.userId;
    const channelID = actionHandlerMessage.channelId;
    const nick = actionHandlerMessage.nick;
    const timestamp = actionHandlerMessage.timestamp;
    const data = actionHandlerMessage.data;
    const server = actionHandlerMessage.server;

    if (!data) {
      return "I can't record an empty note! " + this.help;
    }

    try {
      await this.persistenceHandler.insertNote(timestamp, userID, channelID, nick, data, server);
      return "thanks, I've recorded that for you.";
    } catch (e) {
      console.error(e);
      return "sorry, there's been an error!";
    }
  }
};
