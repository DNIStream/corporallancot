'use strict';

const DiscordChatListener = require("./discordChatListener");
const ChatListenerBase = require("@chatListeners/chatListenerBase");
const faker = require('faker');

describe("discordChatListener init()", () => {
  let discordClient;
  let logger;
  let discordChatListenerConfig;

  beforeEach(() => {
    discordClient = jasmine.createSpyObj("discordClient", {
      login: Promise.resolve(),
      on: null
    });
    logger = jasmine.createSpyObj("logger", ["log"]);
    discordChatListenerConfig = jasmine.createSpyObj("discordChatListenerConfig", {
      token: faker.lorem.word()
    });
  });

  it("sets config property from discordChatListenerConfig injection", () => {
    // Act
    const listener = new DiscordChatListener({ discordChatListenerConfig });

    // Assert
    expect(listener.config).toBe(discordChatListenerConfig);
  });

  it("sets client property from discordClient injection", () => {
    // Act
    const listener = new DiscordChatListener({ discordClient, discordChatListenerConfig });

    // Assert
    expect(listener.client).toBe(discordClient);
  });

  // init()
  it("passes token to discordClient.login", async () => {
    // Arrange
    const listener = new DiscordChatListener({ logger, discordClient, discordChatListenerConfig });

    // Act
    await listener.init();

    // Assert
    expect(discordClient.login).toHaveBeenCalledWith(discordChatListenerConfig.token);
  });

  it("resolves when client.login() resolves", async () => {
    // Arrange
    const listener = new DiscordChatListener({ logger, discordClient, discordChatListenerConfig });

    // Act & Assert
    await expectAsync(listener.init()).toBeResolved();
  });

  it("registers message handler callback when client.login() resolves", async () => {
    // Arrange
    const listener = new DiscordChatListener({ logger, discordClient, discordChatListenerConfig });

    // Act
    await listener.init();

    // Assert
    expect(discordClient.on).toHaveBeenCalledTimes(1);
    expect(discordClient.on)
      .toHaveBeenCalledWith("message", jasmine.anything());
  });

  it("init() bubbles reject and does not register message handler callback when client.login() rejected", async () => {
    // Arrange
    discordClient = jasmine.createSpyObj("discordClient", {
      login: Promise.reject("login error"),
      on: null
    });
    const listener = new DiscordChatListener({ logger, discordClient, discordChatListenerConfig });

    // Act & Assert
    await expectAsync(listener.init()).toBeRejected();
    expect(discordClient.on).toHaveBeenCalledTimes(0);
  });
});

describe("discordChatListener handleMessage()", () => {
  it("calls super class handleMessage asynchronously", async () => {
    // Arrange
    const logger = jasmine.createSpyObj("logger", ["log"]);
    const discordMessage = jasmine.createSpyObj("discordMessage", ["reply"]);
    const listener = new DiscordChatListener({ logger });
    spyOn(ChatListenerBase.prototype, "handleMessage");

    // Act
    await listener.handleMessage(discordMessage);

    // Assert
    expect(ChatListenerBase.prototype.handleMessage).toHaveBeenCalledWith(discordMessage);
  });
});


describe("discordChatListener replyAction()", () => {
  it("replies to the discordMessage with the specified replyText", async () => {
    // Arrange
    const logger = jasmine.createSpyObj("logger", ["log"]);
    const discordMessage = jasmine.createSpyObj("discordMessage", ["reply"]);
    const listener = new DiscordChatListener({ logger });
    const replyText = faker.lorem.sentences();

    // Act
    await listener.replyAction(discordMessage, replyText);

    // Assert
    expect(discordMessage.reply).toHaveBeenCalledWith(replyText);
  });
});
