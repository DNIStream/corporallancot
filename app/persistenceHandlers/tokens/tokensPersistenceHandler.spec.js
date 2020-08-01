'use strict';

const TokensPersistenceHandler = require("@persistenceHandlers/tokens/tokensPersistenceHandler");
const faker = require('faker');

describe("tokensPersistenceHandler", () => {
  let logger;
  let tokensRepository;

  beforeEach(() => {
    logger = jasmine.createSpyObj("logger", ["log"]);
    tokensRepository = jasmine.createSpyObj("tokensRepository", ["insert", "update", "getByServer"]);
  });

  it("sets logger to .logger property", () => {
    const handler = new TokensPersistenceHandler({ logger });
    expect(handler.logger).toBe(logger);
  });

  it("sets tokensRepository to .repository property", () => {
    const handler = new TokensPersistenceHandler({ logger, tokensRepository });
    expect(handler.repository).toBe(tokensRepository);
  });

  it("sets logPrefix to [constructor.name] with space suffix", () => {
    const handler = new TokensPersistenceHandler({ logger });
    expect(handler.logPrefix).toBe("[TokensPersistenceHandler] ");
  });

  //////////////////
  // insert
  //////////////////
  it("insert calls repository.insert with passed parameters", async () => {
    // Arrange
    const accessToken = faker.random.uuid();
    const refreshToken = faker.random.uuid();
    const dateCreated = faker.date.recent();
    const expiryDate = faker.date.future();

    const handler = new TokensPersistenceHandler({ logger, tokensRepository });

    // Act
    await handler.insert(accessToken, refreshToken, dateCreated, expiryDate);

    // Assert
    expect(tokensRepository.insert)
      .toHaveBeenCalledWith(accessToken, refreshToken, dateCreated, expiryDate);
  });

  it("insert returns repository.insert as result", async () => {
    // Arrange
    const expectedResult = jasmine.createSpy("repoResult");
    tokensRepository = jasmine.createSpyObj("tokensRepository", {
      insert: expectedResult
    });

    const handler = new TokensPersistenceHandler({ logger, tokensRepository });

    // Act
    const result = await handler.insert();

    // Assert
    expect(result).toBe(expectedResult);
  });

  //////////////////
  // update
  //////////////////
  it("update calls repository.update with passed parameters", async () => {
    // Arrange
    const server = faker.lorem.word();
    const accessToken = faker.random.uuid();
    const refreshToken = faker.random.uuid();
    const expiryDate = faker.date.future();

    const handler = new TokensPersistenceHandler({ logger, tokensRepository });

    // Act
    await handler.update(server, accessToken, refreshToken, expiryDate);

    // Assert
    expect(tokensRepository.update)
      .toHaveBeenCalledWith(server, accessToken, refreshToken, expiryDate);
  });

  it("update returns repository.update as result", async () => {
    // Arrange
    const expectedResult = jasmine.createSpy("repoResult");
    tokensRepository = jasmine.createSpyObj("tokensRepository", {
      update: expectedResult
    });

    const handler = new TokensPersistenceHandler({ logger, tokensRepository });

    // Act
    const result = await handler.update();

    // Assert
    expect(result).toBe(expectedResult);
  });

  //////////////////
  // getByServer
  //////////////////
  it("getByServer calls repository.getByServer with passed parameters", async () => {
    // Arrange
    const server = faker.lorem.word();
    const handler = new TokensPersistenceHandler({ logger, tokensRepository });

    // Act
    await handler.getByServer(server);

    // Assert
    expect(tokensRepository.getByServer).toHaveBeenCalledWith(server);
  });

  it("getByServer returns repository.getByServer as result", async () => {
    // Arrange
    const expectedResult = jasmine.createSpy("repoResult");
    tokensRepository = jasmine.createSpyObj("tokensRepository", {
      getByServer: expectedResult
    });

    const handler = new TokensPersistenceHandler({ logger, tokensRepository });

    // Act
    const result = await handler.getByServer();

    // Assert
    expect(result).toBe(expectedResult);
  });
});
