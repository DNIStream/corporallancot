import { ActionHandlerBase } from '../actionHandlerBase.js';
import { Logger } from '../../services/logging/logger.js';
import { NotesPersistenceHandler } from '../../persistenceHandlers/notes/notesPersistenceHandler.js';
import { IActionHandlerMessage } from '../actionHandlerMessage.js';

export class NotesActionHandler extends ActionHandlerBase {
  private persistenceHandler: NotesPersistenceHandler;

  constructor(logger: Logger, notesPersistenceHandler: NotesPersistenceHandler) {
    super(logger, "notes");

    this.persistenceHandler = notesPersistenceHandler;
    this.help = "`!notes [message]` records a note.";
  }

  public async handle(actionHandlerMessage: IActionHandlerMessage): Promise<string | null> {
    if (!actionHandlerMessage) {
      return null;
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
}
