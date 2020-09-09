'use strict';

const ChatListenerBase = require("./chatListenerBase");
const NotImplemented = require("@errors/notImplemented");
const faker = require('faker');
var theoretically = require("jasmine-theories");

describe("chatListenerBase init()", () => {
  let logger;
  let actionHandlerResolver;
  let messageResolver;

  beforeEach(() => {
    logger = jasmine.createSpyObj("logger", ["log"]);
    actionHandlerResolver = jasmine.createSpyObj("actionHandlerResolver", ["resolve"]);
    messageResolver = jasmine.createSpyObj("messageResolver", ["resolve"]);
  });

  it("sets logger property from logger injection", () => {
    // Act
    const listener = new ChatListenerBase(logger);

    // Assert
    expect(listener.logger).toBe(logger);
  });

  it("sets actionHandlerResolver property from actionHandlerResolver injection", () => {
    // Act
    const listener = new ChatListenerBase(logger, actionHandlerResolver);

    // Assert
    expect(listener.actionHandlerResolver).toBe(actionHandlerResolver);
  });

  it("sets messageResolver property from messageResolver injection", () => {
    // Act
    const listener = new ChatListenerBase(logger, actionHandlerResolver, messageResolver);

    // Assert
    expect(listener.messageResolver).toBe(messageResolver);
  });

  it("init() throws NotImplemented error when not overridden", async () => {
    // Arrange
    const listener = new ChatListenerBase(logger, actionHandlerResolver, messageResolver);

    // Act & Assert
    await expectAsync(listener.init()).toBeRejectedWith(NotImplemented);
  });
});

describe("chatListenerBase handleMessage()", () => {
  let logger;
  let actionHandlerResolver;
  let messageResolver;
  let chatListenerMessage;
  let actionHandlerMessage;

  beforeEach(() => {
    logger = jasmine.createSpyObj("logger", ["log"]);
    actionHandlerResolver = jasmine.createSpyObj("actionHandlerResolver", {
      resolve: jasmine.createSpyObj("actionHandler", ["handle"])
    });
    actionHandlerMessage = jasmine.createSpyObj("actionHandlerMessage", null, {
      isBot: false
    });
    messageResolver = jasmine.createSpyObj("messageResolver", {
      resolve: actionHandlerMessage
    });
    chatListenerMessage = jasmine.createSpyObj("chatListenerMessage", ["reply"]);
  });

  theoretically.it("returns without error when discordMessage is '%s'", [null, "", " ", undefined], async (insertedValue) => {
    // Arrange
    const listener = new ChatListenerBase(logger);

    // Act
    const actualResult = await listener.handleMessage(insertedValue);

    // Assert
    expect(actualResult).toBe(undefined);
  });

  it("resolves chat listener message to ActionHandlerMessage", async () => {
    // Arrange
    const listener = new ChatListenerBase(logger, actionHandlerResolver, messageResolver);

    // Act
    await listener.handleMessage(chatListenerMessage);

    // Assert
    expect(messageResolver.resolve).toHaveBeenCalledWith(chatListenerMessage);
  });

  it("does not attempt to resolve ActionHandler if ActionHandlerMessage.isBot = true", async () => {
    // Arrange
    actionHandlerMessage = jasmine.createSpyObj("actionHandlerMessage", null, {
      isBot: true
    });
    messageResolver = jasmine.createSpyObj("messageResolver", {
      resolve: actionHandlerMessage
    });

    const listener = new ChatListenerBase(logger, actionHandlerResolver, messageResolver);

    // Act
    await listener.handleMessage(chatListenerMessage);

    // Assert
    expect(actionHandlerResolver.resolve).toHaveBeenCalledTimes(0);
  });

  it("resolves ActionHandler with ActionHandlerMessage", async () => {
    // Arrange
    const listener = new ChatListenerBase(logger, actionHandlerResolver, messageResolver);

    // Act
    await listener.handleMessage(chatListenerMessage);

    // Assert
    expect(actionHandlerResolver.resolve).toHaveBeenCalledWith(actionHandlerMessage);
  });

  it("asynchronously handles message with resolved ActionHandler's handle() method", async () => {
    // Arrange
    const actionHandler = jasmine.createSpyObj("actionHandler", ["handle"]);
    actionHandlerResolver = jasmine.createSpyObj("actionHandlerResolver", {
      resolve: actionHandler
    });

    const listener = new ChatListenerBase(logger, actionHandlerResolver, messageResolver);

    // Act
    await listener.handleMessage(chatListenerMessage);

    // Assert
    expect(actionHandler.handle).toHaveBeenCalledWith(actionHandlerMessage);
  });

  it("calls the replyAction() method with the ActionHandler's response", async () => {
    // Arrange
    const expectedReply = faker.lorem.sentences();
    actionHandlerResolver = jasmine.createSpyObj("actionHandlerResolver", {
      resolve: jasmine.createSpyObj("actionHandler", {
        handle: expectedReply
      })
    });

    const listener = new ChatListenerBase(logger, actionHandlerResolver, messageResolver);
    spyOn(listener, "replyAction");

    // Act
    await listener.handleMessage(chatListenerMessage);

    // Assert
    expect(listener.replyAction).toHaveBeenCalledWith(chatListenerMessage, expectedReply);
  });

  theoretically.it("does not reply when action handler returns '%s'", [null, "", " ", undefined], async (insertedValue) => {
    // Arrange
    actionHandlerResolver = jasmine.createSpyObj("actionHandlerResolver", {
      resolve: jasmine.createSpyObj("actionHandler", {
        handle: insertedValue
      })
    });

    const listener = new ChatListenerBase(logger, actionHandlerResolver, messageResolver);

    // Act
    await listener.handleMessage(chatListenerMessage);

    // Assert
    expect(chatListenerMessage.reply).toHaveBeenCalledTimes(0);
  });
});
