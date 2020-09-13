// const faker = require('faker');
// const MessageResolverBase = require("@chatListeners/messageResolverBase");
// const TwitchMessageResolver = require("@chatListeners/twitch/twitchMessageResolver");

// describe("twitchMessageResolver", function () {
//   let logger;
//   let twitchChatListenerConfig;

//   const twitchMsgFixture = (message, roomId, timeStamp, userId, nick, channel) => {
//     roomId = roomId || faker.random.number();
//     timeStamp = timeStamp || faker.date.recent();
//     userId = userId || faker.random.number();
//     nick = nick || faker.lorem.word();
//     channel = channel || faker.lorem.word();
//     message = message || faker.random.words();

//     const tags = new Map();
//     tags.set('room-id', roomId);
//     tags.set('tmi-sent-ts', timeStamp);
//     tags.set('user-id', userId);

//     return jasmine.createSpyObj("twitchMessage", null, {
//       _tags: tags,
//       _prefix: {
//         nick: nick
//       },
//       target: {
//         value: channel
//       },
//       message: {
//         value: message
//       }
//     });
//   };

//   const configFixture = (botNicks) => {
//     return jasmine.createSpyObj("twitchChatListenerConfig", null, {
//       "botNicks": botNicks
//     });
//   };

//   beforeEach(() => {
//     logger = jasmine.createSpyObj("logger", ["log"]);
//     twitchChatListenerConfig = configFixture([]);
//   });

//   it("resolves generic properties with super.resolveChatMessage()", async () => {
//     // Arrange
//     const expectedContent = faker.lorem.sentences();
//     const twitchMessage = twitchMsgFixture(expectedContent);
//     spyOn(MessageResolverBase.prototype, "resolveChatMessage")
//       .and.returnValue({});

//     const twitchMessageResolver = new TwitchMessageResolver({ logger, twitchChatListenerConfig });

//     // Act
//     await twitchMessageResolver.resolve(twitchMessage);

//     // Assert
//     expect(twitchMessageResolver.resolveChatMessage).toHaveBeenCalledWith(expectedContent);
//   });

//   it("returns super.resolveChatMessage() as result", async () => {
//     // Arrange
//     const twitchMessage = twitchMsgFixture();
//     const expectedResult = jasmine.createSpy("actionHandlerMessage");
//     spyOn(MessageResolverBase.prototype, "resolveChatMessage")
//       .and.returnValue(expectedResult);

//     const twitchMessageResolver = new TwitchMessageResolver({ logger, twitchChatListenerConfig });

//     // Act
//     const result = await twitchMessageResolver.resolve(twitchMessage);

//     // Assert
//     expect(result).toBe(expectedResult)
//   });

//   it("appends all expected twitch message properties to return object", async () => {
//     // Arrange
//     const expectedUserId = faker.random.number();
//     const expectedRoomId = faker.random.number();
//     const expectedRoomName = faker.lorem.word();
//     const expectedUsername = faker.internet.userName();
//     const expectedTimestamp = faker.date.recent();
//     const expectedServer = "twitch";

//     const twitchMessage = twitchMsgFixture(null, expectedRoomId, expectedTimestamp, expectedUserId, expectedUsername, expectedRoomName);

//     const twitchMessageResolver = new TwitchMessageResolver({ logger, twitchChatListenerConfig });

//     // Act
//     const result = await twitchMessageResolver.resolve(twitchMessage);

//     // Assert
//     expect(result.userId).toBe(expectedUserId);
//     expect(result.channelId).toBe(expectedRoomId);
//     expect(result.nick).toBe(expectedUsername);
//     expect(result.timestamp).toEqual(expectedTimestamp);
//     expect(result.server).toBe(expectedServer);
//     expect(result.channelName).toBe(expectedRoomName);

//   });

//   it("sets isBot to true if twitchMessage nick is in bot list", async () => {
//     // Arrange
//     const expectedUsername = faker.internet.userName();

//     twitchChatListenerConfig = configFixture([expectedUsername]);
//     const twitchMessage = twitchMsgFixture(null, null, null, null, expectedUsername);

//     const twitchMessageResolver = new TwitchMessageResolver({ logger, twitchChatListenerConfig });

//     // Act
//     const result = await twitchMessageResolver.resolve(twitchMessage);

//     // Assert
//     expect(result.isBot).toBeTrue();
//   });
// });
