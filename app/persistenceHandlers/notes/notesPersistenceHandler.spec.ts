// import { NotesPersistenceHandler } from './notesPersistenceHandler';
// import { lorem, random, date, internet } from 'faker';
// import { Logger } from '../../services/logging/logger';
// import { NotesRepository } from '../../services/db/repositories/notes/notesRepository';
// import { FieldPacket, RowDataPacket } from 'mysql2/promise';

// describe("notesPersistenceHandler", () => {
//   let logger: jasmine.SpyObj<Logger>;
//   let notesRepository: jasmine.SpyObj<NotesRepository>;

//   beforeEach(() => {
//     logger = jasmine.createSpyObj<Logger>(['log']);
//     notesRepository = jasmine.createSpyObj<NotesRepository>(["insertNote"])
//   });

//   //////////////////
//   // insertNote
//   //////////////////
//   it("insertNote calls repository.insertNote with passed parameters", async () => {
//     // Arrange
//     const timestamp = date.recent();
//     const userID = random.number();
//     const channelID = random.number();
//     const nick = internet.userName();
//     const message = lorem.sentence();
//     const server = lorem.word();

//     const handler = new NotesPersistenceHandler(logger, notesRepository);

//     // Act
//     await handler.insertNote(timestamp, userID, channelID, nick, message, server);

//     // Assert
//     expect(notesRepository.insertNote)
//       .toHaveBeenCalledWith(timestamp, userID, channelID, nick, message, server);
//   });

//   it("insertNote returns repository.insertNote as result", async () => {
//     // Arrange
//     const expectedResult = jasmine.createSpyObj<[RowDataPacket[], FieldPacket[]]>(null, null);
//     notesRepository.insertNote.and.returnValue(Promise.resolve(expectedResult))

//     const handler = new NotesPersistenceHandler(logger, notesRepository);

//     // Act & Assert
//     await expectAsync(handler.insertNote(null, null, null, null, null, null))
//       .toBeResolvedTo(expectedResult);
//   });

//   //////////////////
//   // getRandomNote
//   //////////////////
//   it("getRandomNote returns repository.getRandomNote as result", async () => {
//     // Arrange
//     const expectedResult = jasmine.createSpyObj<[RowDataPacket[], FieldPacket[]]>(null, null);
//     notesRepository.getRandomNote.and.returnValue(Promise.resolve(expectedResult))

//     const handler = new NotesPersistenceHandler(logger, notesRepository);

//     // Act & Assert
//     await expectAsync(handler.getRandomNote())
//       .toBeResolvedTo(expectedResult);
//   });

//   //////////////////
//   // getRandomNoteByContent
//   //////////////////
//   it("getRandomNoteByContent calls repository.getRandomNoteByContent with passed parameters", async () => {
//     // Arrange
//     const searchPhrase = lorem.sentence();
//     const handler = new NotesPersistenceHandler(logger, notesRepository);

//     // Act
//     await handler.getRandomNoteByContent(searchPhrase);

//     // Assert
//     expect(notesRepository.getRandomNoteByContent)
//       .toHaveBeenCalledWith(searchPhrase);
//   });

//   it("getRandomNoteByContent returns repository.getRandomNoteByContent as result", async () => {
//     // Arrange
//     const expectedResult = jasmine.createSpyObj<[RowDataPacket[], FieldPacket[]]>(null, null);
//     notesRepository.getRandomNoteByContent.and.returnValue(Promise.resolve(expectedResult))

//     const handler = new NotesPersistenceHandler(logger, notesRepository);

//     // Act & Assert
//     await expectAsync(handler.getRandomNoteByContent(null))
//       .toBeResolvedTo(expectedResult);
//   });
// });
