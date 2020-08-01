'use strict';

const TwitchChatListenerConfig = require("./twitchChatListenerConfig");
var theoretically = require("jasmine-theories");
const faker = require('faker');

describe("twitchChatListenerConfig", function () {
  it("maps injected appConfig.bot.chatListeners[twitch].clientId property to .clientId", () => {
    // Arrange
    const expectedValue = faker.lorem.word();
    const appConfig = {
      bot: {
        chatListeners: [
          {
            name: "twitch",
            settings: {
              clientId: expectedValue
            }
          }
        ]
      }
    };

    // Act
    const actualResult = new TwitchChatListenerConfig({ appConfig });

    // Assert
    expect(actualResult.clientId).toBe(expectedValue);
  });

  it("maps injected appConfig.bot.chatListeners[twitch].clientSecret property to .clientSecret", () => {
    // Arrange
    const expectedValue = faker.lorem.word();
    const appConfig = {
      bot: {
        chatListeners: [
          {
            name: "twitch",
            settings: {
              clientSecret: expectedValue
            }
          }
        ]
      }
    };

    // Act
    const actualResult = new TwitchChatListenerConfig({ appConfig });

    // Assert
    expect(actualResult.clientSecret).toBe(expectedValue);
  });

  it("maps injected appConfig.bot.chatListeners[twitch].accessToken property to .accessToken", () => {
    // Arrange
    const expectedValue = faker.lorem.word();
    const appConfig = {
      bot: {
        chatListeners: [
          {
            name: "twitch",
            settings: {
              accessToken: expectedValue
            }
          }
        ]
      }
    };

    // Act
    const actualResult = new TwitchChatListenerConfig({ appConfig });

    // Assert
    expect(actualResult.accessToken).toBe(expectedValue);
  });

  it("maps injected appConfig.bot.chatListeners[twitch].refreshToken property to .refreshToken", () => {
    // Arrange
    const expectedValue = faker.lorem.word();
    const appConfig = {
      bot: {
        chatListeners: [
          {
            name: "twitch",
            settings: {
              refreshToken: expectedValue
            }
          }
        ]
      }
    };

    // Act
    const actualResult = new TwitchChatListenerConfig({ appConfig });

    // Assert
    expect(actualResult.refreshToken).toBe(expectedValue);
  });

  it("maps injected appConfig.bot.chatListeners[twitch].channel property to .channel", () => {
    // Arrange
    const expectedValue = faker.lorem.word();
    const appConfig = {
      bot: {
        chatListeners: [
          {
            name: "twitch",
            settings: {
              channel: expectedValue
            }
          }
        ]
      }
    };

    // Act
    const actualResult = new TwitchChatListenerConfig({ appConfig });

    // Assert
    expect(actualResult.channel).toBe(expectedValue);
  });

  it("maps injected appConfig.bot.chatListeners[twitch].enabled property to .enabled", () => {
    // Arrange
    const expectedValue = faker.random.boolean();
    const appConfig = {
      bot: {
        chatListeners: [
          {
            name: "twitch",
            enabled: expectedValue,
            settings: {}
          }
        ]
      }
    };

    // Act
    const actualResult = new TwitchChatListenerConfig({ appConfig });

    // Assert
    expect(actualResult.enabled).toBe(expectedValue);
  });

  it("sets .name property to twitch", () => {
    // Arrange
    const appConfig = jasmine.createSpy("appConfig");
    const expectedValue = "twitch";

    // Act
    const actualResult = new TwitchChatListenerConfig({appConfig});

    // Assert
    expect(actualResult.name).toBe(expectedValue);
  });

  // Config theory helper objects
  const confEmptyBot = {
    bot: {}
  };
  const confNullChatListeners = {
    bot: {
      chatListeners: null
    }
  };
  const confEmptyChatListeners = {
    bot: {
      chatListeners: []
    }
  };
  const confNoTwitchChatListener = {
    bot: {
      chatListeners: [
        {
          name: "nottwitch"
        }
      ]
    }
  };
  const confNoSettings = {
    bot: {
      chatListeners: [
        {
          name: "twitch"
        }
      ]
    }
  };

  theoretically.it("sets enabled to false when appConfig is '%s'", [null, "", " ", undefined, {}, confEmptyBot, confNullChatListeners, confEmptyChatListeners, confNoTwitchChatListener, confNoSettings], (insertedValue) => {
    // Act
    const actualValue = new TwitchChatListenerConfig({ appConfig: insertedValue });

    // Assert
    expect(actualValue.enabled).toBe(false);
  });
});
