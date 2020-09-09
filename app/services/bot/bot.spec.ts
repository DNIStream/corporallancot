'use strict';

const Bot = require("./bot");

describe("bot init()", function () {
  let logger;
  let botConfig;
  let chatListeners;

  beforeEach(() => {
    logger = jasmine.createSpyObj("logger", ["log"]);
    botConfig = jasmine.createSpyObj("botConfig", null, {
      name: null,
      description: null,
      version: null
    });
    chatListeners = jasmine.createSpy("chatListeners");
  });

  it("calls init() for each chatListener", async () => {
    // Arrange
    const chatListener = jasmine.createSpyObj("chatListeners", ["init"]);
    chatListeners = [chatListener, chatListener];
    const bot = new Bot({ logger, botConfig, chatListeners});

    // Act
    await bot.init();

    // Assert
    expect(chatListener.init).toHaveBeenCalledTimes(2);
  });
});

