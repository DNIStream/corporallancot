'use strict';

const faker = require('faker');
const MessageResolverBase = require("@chatListeners/messageResolverBase");
const DiscordMessageResolver = require("@chatListeners/discord/discordMessageResolver");

describe("discordMessageResolver", function () {
  let logger;

  beforeEach(() => {
    logger = jasmine.createSpyObj("logger", ["log"]);
  });

  it("resolves generic properties with super.resolveChatMessage()", async () => {
    // Arrange
    const expectedContent = faker.lorem.sentences();
    const discordMessage = jasmine.createSpyObj("discordMessage", null, {
      content: expectedContent
    });
    spyOn(MessageResolverBase.prototype, "resolveChatMessage")
      .and.returnValue({});

    const discordMessageResolver = new DiscordMessageResolver({ logger });

    // Act
    await discordMessageResolver.resolve(discordMessage);

    // Assert
    expect(discordMessageResolver.resolveChatMessage).toHaveBeenCalledWith(expectedContent);
  });

  it("returns super.resolveChatMessage() as result", async () => {
    // Arrange
    const discordMessage = jasmine.createSpy("discordMessage");
    const expectedResult = jasmine.createSpy("actionHandlerMessage");
    spyOn(MessageResolverBase.prototype, "resolveChatMessage")
      .and.returnValue(expectedResult);

    const discordMessageResolver = new DiscordMessageResolver({ logger });

    // Act
    const result = await discordMessageResolver.resolve(discordMessage);

    // Assert
    expect(result).toBe(expectedResult)
  });

  it("appends all expected discord message properties return object", async () => {
    // Arrange
    const expectedUserId = faker.random.number();
    const expectedChannelId = faker.random.number();
    const expectedUsername = faker.internet.userName();
    const expectedTimestamp = faker.date.recent();
    const expectedServer = "discord";
    const expectedIsBot = faker.random.boolean();

    const discordMessage = jasmine.createSpyObj("discordMessage", null, {
      content: faker.lorem.sentences(),
      author: {
        id: expectedUserId,
        username: expectedUsername,
        bot: expectedIsBot
      },
      channel: {
        id: expectedChannelId
      },
      createdAt: expectedTimestamp
    });

    const discordMessageResolver = new DiscordMessageResolver({ logger });

    // Act
    const result = await discordMessageResolver.resolve(discordMessage);

    // Assert
    expect(result.userId).toBe(expectedUserId);
    expect(result.channelId).toBe(expectedChannelId);
    expect(result.nick).toBe(expectedUsername);
    expect(result.timestamp).toBe(expectedTimestamp);
    expect(result.server).toBe(expectedServer);
    expect(result.isBot).toBe(expectedIsBot);
  });
});
