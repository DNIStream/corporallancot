'use strict';

const ActionHandlerBase = require("@actionHandlers/actionHandlerBase");

module.exports = class QuoteActionHandler extends ActionHandlerBase {
  constructor({ logger, notesPersistenceHandler }) {
    super(logger, "quote");
    this.persistenceHandler = notesPersistenceHandler;
    this.help = "`!quote <search>` finds a note (if `search` is omitted, I'll just find a random note).";
  }

  async handle(actionHandlerMessage) {
    if (!actionHandlerMessage) {
      return;
    }

    if (!actionHandlerMessage.data) {
      try {
        const [rows] = await this.persistenceHandler.getRandomNote();
        if (rows.length) {
          return `\`${rows[0]["nick"]}\`: \`\`\`${rows[0].message}\`\`\``;
        } else {
          return "I couldn't find any notes!";
        }
      } catch (e) {
        console.error(e);
        return "sorry, there's been an error!";
      }
    } else {
      try {
        const [rows] = await this.persistenceHandler.getRandomNoteByContent(actionHandlerMessage.data);
        if (rows.length) {
          return `\`${rows[0]["nick"]}\`: \`\`\`${rows[0].message}\`\`\``;
        } else {
          return "I couldn't find any notes matching your search!";
        }
      } catch (e) {
        console.error(e);
        return "sorry, there's been an error!";
      }
    }
  }
};
