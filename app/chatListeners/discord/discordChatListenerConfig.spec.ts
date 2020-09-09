'use strict';

const DiscordChatListenerConfig = require("./discordChatListenerConfig");
var theoretically = require("jasmine-theories");
const faker = require('faker');

describe("discordChatListenerConfig", function () {
  it("maps injected appConfig.bot.chatListeners[discord].key property to .token", () => {
    // Arrange
    const expectedKey = faker.lorem.word();
    const appConfig = {
      bot: {
        chatListeners: [
          {
            name: "discord",
            settings: {
              key: expectedKey
            }
          }
        ]
      }
    };

    // Act
    const actualResult = new DiscordChatListenerConfig({ appConfig });

    // Assert
    expect(actualResult.token).toBe(expectedKey);
  });

  it("maps injected appConfig.bot.chatListeners[discord].enabled property to .enabled", () => {
    // Arrange
    const expectedEnabled = faker.random.boolean();
    const appConfig = {
      bot: {
        chatListeners: [
          {
            name: "discord",
            enabled: expectedEnabled,
            settings: {
              key: "not_tested"
            }
          }
        ]
      }
    };

    // Act
    const actualResult = new DiscordChatListenerConfig({ appConfig });

    // Assert
    expect(actualResult.enabled).toBe(expectedEnabled);
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
  const confNoDiscordChatListener = {
    bot: {
      chatListeners: [
        {
          name: "notdiscord"
        }
      ]
    }
  };
  const confNoSettings = {
    bot: {
      chatListeners: [
        {
          name: "discord"
        }
      ]
    }
  };

  theoretically.it("sets enabled to false when appConfig is '%s'", [null, "", " ", undefined, {}, confEmptyBot, confNullChatListeners, confEmptyChatListeners, confNoDiscordChatListener, confNoSettings], (insertedValue) => {
    // Act
    const actualValue = new DiscordChatListenerConfig({ appConfig: insertedValue });

    // Assert
    expect(actualValue.enabled).toBe(false);
  });
});
