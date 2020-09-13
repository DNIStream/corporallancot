import { ActionHandlerBase } from '../actionHandlerBase.js';
import { NotesPersistenceHandler } from '../../persistenceHandlers/notes/notesPersistenceHandler.js';
import { Logger } from '../../services/logging/logger.js';
import { IActionHandlerMessage } from '../actionHandlerMessage.js';

export class QuoteActionHandler extends ActionHandlerBase {
  public readonly persistenceHandler: NotesPersistenceHandler;

  constructor(logger: Logger, notesPersistenceHandler: NotesPersistenceHandler) {
    super(logger, "quote");

    this.persistenceHandler = notesPersistenceHandler;

    this.help = "`!quote <search>` finds a note (if `search` is omitted, I'll just find a random note).";
  }

  public async handle(actionHandlerMessage: IActionHandlerMessage): Promise<string | null> {
    if (!actionHandlerMessage) {
      return null;
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
}
