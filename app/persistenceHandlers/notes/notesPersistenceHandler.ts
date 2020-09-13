import { LoggingBase } from '../../loggingBase.js';
import { Logger } from '../../services/logging/logger.js';
import { NotesRepository } from '../../services/db/repositories/notes/notesRepository.js';
import { RowDataPacket, FieldPacket } from 'mysql2/promise';

export class NotesPersistenceHandler extends LoggingBase {
  private repository: NotesRepository;

  constructor(logger: Logger, notesRepository: NotesRepository) {
    super(logger);

    this.repository = notesRepository;
    this.logger.log(`${this.logPrefix}Initialising`);
  }

  async insertNote(timestamp: Date, userID: number, channelID: number, nick: string, message: string, server: string): Promise<[RowDataPacket[], FieldPacket[]]> {
    this.logger.log(`${this.logPrefix}Inserting new note`);
    return await this.repository.insertNote(timestamp, userID, channelID, nick, message, server);
  }

  public async getRandomNote(): Promise<[RowDataPacket[], FieldPacket[]]> {
    this.logger.log(`${this.logPrefix}Retrieving random note`);
    return await this.repository.getRandomNote();
  }

  public async getRandomNoteByContent(message: string): Promise<[RowDataPacket[], FieldPacket[]]> {
    this.logger.log(`${this.logPrefix}Retrieving random note with search term '${message}'`);
    return await this.repository.getRandomNoteByContent(message);
  }
}
