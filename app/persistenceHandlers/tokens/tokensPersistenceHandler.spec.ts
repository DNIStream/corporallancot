// import { TokensPersistenceHandler } from './tokensPersistenceHandler';
// import { lorem, random, date } from 'faker';
// import { Logger } from '../../services/logging/logger';
// import { TokensRepository } from '../../services/db/repositories/tokens/tokensRepository';
// import { RowDataPacket } from 'mysql2';
// import { FieldPacket } from 'mysql2/promise';

// describe("tokensPersistenceHandler", () => {
//   let logger: jasmine.SpyObj<Logger>;
//   let tokensRepository: jasmine.SpyObj<TokensRepository>;

//   beforeEach(() => {
//     logger = jasmine.createSpyObj<Logger>(['log']);
//     tokensRepository = jasmine.createSpyObj<TokensRepository>(["insert", "update", "getByServer"]);
//   });

//   //////////////////
//   // insert
//   //////////////////
//   it("insert calls repository.insert with passed parameters", async () => {
//     // Arrange
//     const server = lorem.word();
//     const accessToken = random.uuid();
//     const refreshToken = random.uuid();
//     const dateCreated = date.recent();
//     const expiryDate = date.future();

//     const handler = new TokensPersistenceHandler(logger, tokensRepository);

//     // Act
//     await handler.insert(server, accessToken, refreshToken, dateCreated, expiryDate);

//     // Assert
//     expect(tokensRepository.insert)
//       .toHaveBeenCalledWith(server, accessToken, refreshToken, dateCreated, expiryDate);
//   });

//   it("insert returns repository.insert as result", async () => {
//     // Arrange
//     const expectedResult = jasmine.createSpyObj<[RowDataPacket[], FieldPacket[]]>(null, null);
//     tokensRepository.insert.and.returnValue(Promise.resolve(expectedResult))
//     // tokensRepository = jasmine.createSpyObj<TokensRepository>({
//     //   insert: expectedResult
//     // });

//     const handler = new TokensPersistenceHandler(logger, tokensRepository);

//     // Act
//     const result = await handler.insert(null, null, null, null, null);

//     // Assert
//     expect(result).toBe(expectedResult);
//   });

//   //////////////////
//   // update
//   //////////////////
//   it("update calls repository.update with passed parameters", async () => {
//     // Arrange
//     const server = lorem.word();
//     const accessToken = random.uuid();
//     const refreshToken = random.uuid();
//     const expiryDate = date.future();

//     const handler = new TokensPersistenceHandler(logger, tokensRepository);

//     // Act
//     await handler.update(server, accessToken, refreshToken, expiryDate);

//     // Assert
//     expect(tokensRepository.update)
//       .toHaveBeenCalledWith(server, accessToken, refreshToken, expiryDate);
//   });

//   it("update returns repository.update as result", async () => {
//     // Arrange
//     const expectedResult = jasmine.createSpy("repoResult");
//     tokensRepository = jasmine.createSpyObj("tokensRepository", {
//       update: expectedResult
//     });

//     const handler = new TokensPersistenceHandler(logger, tokensRepository);

//     // Act
//     const result = await handler.update(null, null, null, null);

//     // Assert
//     expect(result).toBe(expectedResult);
//   });

//   //////////////////
//   // getByServer
//   //////////////////
//   it("getByServer calls repository.getByServer with passed parameters", async () => {
//     // Arrange
//     const server = lorem.word();
//     const handler = new TokensPersistenceHandler(logger, tokensRepository);

//     // Act
//     await handler.getByServer(server);

//     // Assert
//     expect(tokensRepository.getByServer).toHaveBeenCalledWith(server);
//   });

//   it("getByServer returns repository.getByServer as result", async () => {
//     // Arrange
//     const expectedResult = jasmine.createSpy("repoResult");
//     tokensRepository = jasmine.createSpyObj("tokensRepository", {
//       getByServer: expectedResult
//     });

//     const handler = new TokensPersistenceHandler(logger, tokensRepository);

//     // Act
//     const result = await handler.getByServer(null);

//     // Assert
//     expect(result).toBe(expectedResult);
//   });
// });
