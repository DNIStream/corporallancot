'use strict';

const NotesPersistenceHandler = require("@persistenceHandlers/notes/notesPersistenceHandler");
const faker = require('faker');

describe("notesPersistenceHandler", () => {
  const logger = {
    log: function () { }
  };

  it("sets logger to .logger property", () => {
    const handler = new NotesPersistenceHandler({ logger });
    expect(handler.logger).toBe(logger);
  });

  it("sets notesRepository to .repository property", () => {
    const notesRepository = jasmine.createSpy("notesRepository");
    const handler = new NotesPersistenceHandler({ logger, notesRepository });
    expect(handler.repository).toBe(notesRepository);
  });

  it("sets logPrefix to [constructor.name] with space suffix", () => {
    const handler = new NotesPersistenceHandler({ logger});
    expect(handler.logPrefix).toBe("[NotesPersistenceHandler] ");
  });

  //////////////////
  // insertNote
  //////////////////
  it("insertNote calls repository.insertNote with passed parameters", async () => {
    // Arrange
    var notesRepository = jasmine.createSpyObj("notesRepository", ["insertNote"])
    notesRepository.insertNote.and.returnValue(Promise.resolve());

    const timestamp = faker.date.recent();
    const userID = faker.random.number();
    const channelID = faker.random.number();
    const nick = faker.userName;
    const message = faker.lorem.sentence();
    const server = faker.lorem.word();

    const handler = new NotesPersistenceHandler({ logger, notesRepository });

    // Act
    await handler.insertNote(timestamp, userID, channelID, nick, message, server);

    // Assert
    expect(notesRepository.insertNote)
      .toHaveBeenCalledWith(timestamp, userID, channelID, nick, message, server);
  });

  it("insertNote returns repository.insertNote as result", async () => {
    // Arrange
    const expectedResult = {};
    var notesRepository = jasmine.createSpyObj("notesRepository", ["insertNote"])
    notesRepository.insertNote.and.returnValue(expectedResult);

    const handler = new NotesPersistenceHandler({ logger, notesRepository });

    // Act & Assert
    await expectAsync(handler.insertNote()).toBeResolvedTo(expectedResult);
  });

  //////////////////
  // getRandomNote
  //////////////////
  it("getRandomNote returns repository.getRandomNote as result", async () => {
    // Arrange
    const expectedResult = {};
    var notesRepository = jasmine.createSpyObj("notesRepository", ["getRandomNote"])
    notesRepository.getRandomNote.and.returnValue(expectedResult);

    const handler = new NotesPersistenceHandler({ logger, notesRepository });

    // Act & Assert
    await expectAsync(handler.getRandomNote()).toBeResolvedTo(expectedResult);
  });

  //////////////////
  // getRandomNoteByContent
  //////////////////
  it("getRandomNoteByContent calls repository.getRandomNoteByContent with passed parameters", async () => {
    // Arrange
    var notesRepository = jasmine.createSpyObj("notesRepository", ["getRandomNoteByContent"])
    notesRepository.getRandomNoteByContent.and.returnValue(Promise.resolve());
    const searchPhrase = faker.lorem.sentence();

    const handler = new NotesPersistenceHandler({ logger, notesRepository });

    // Act
    await handler.getRandomNoteByContent(searchPhrase);

    // Assert
    expect(notesRepository.getRandomNoteByContent)
      .toHaveBeenCalledWith(searchPhrase);
  });

  it("getRandomNoteByContent returns repository.getRandomNoteByContent as result", async () => {
    // Arrange
    const expectedResult = {};
    var notesRepository = jasmine.createSpyObj("notesRepository", ["getRandomNoteByContent"])
    notesRepository.getRandomNoteByContent.and.returnValue(expectedResult);

    const handler = new NotesPersistenceHandler({ logger, notesRepository });

    // Act & Assert
    await expectAsync(handler.getRandomNoteByContent()).toBeResolvedTo(expectedResult);
  });
});
