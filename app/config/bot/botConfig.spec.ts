'use strict';

const BotConfig = require("./botConfig");
var theoretically = require("jasmine-theories");

describe("botConfig", function () {
  it("maps injected appConfig.bot.name property to .name", () => {
    // Arrange
    const appConfig = {
      bot: {
        name: "Jeff"
      }
    };

    // Act
    const actualResult = new BotConfig({ appConfig });

    // Assert
    expect(actualResult.name).toBe(appConfig.bot.name);
  });

  it("maps injected appConfig.bot.version property to .version", () => {
    // Arrange
    const appConfig = {
      bot: {
        version: "1.0.0"
      }
    };

    // Act
    const actualResult = new BotConfig({ appConfig });

    // Assert
    expect(actualResult.version).toBe(appConfig.bot.version);
  });

  it("maps injected appConfig.bot.description property to .description", () => {
    // Arrange
    const appConfig = {
      bot: {
        description: "Jeff is a..."
      }
    };

    // Act
    const actualResult = new BotConfig({ appConfig });

    // Assert
    expect(actualResult.description).toBe(appConfig.bot.description);
  });

  it("throws exception if config and environment are undefined", () => {
    // Act & Assert
    expect(() => {
      new BotConfig({});
    }).toThrowError("Either the 'bot' property should be set in the config file, or the bot should be executed via an npm script so it has access to npm environment settings.");
  });

  it("sets defaults if appConfig defined but has no properties", () => {
    // Arrange
    const environment = {};
    const appConfig = {};

    // Act
    const actualResult = new BotConfig({ appConfig, environment });

    // Assert
    expect(actualResult.name).toBe("Corporal Lancot");
    expect(actualResult.description).toBe("Halt!");
    expect(actualResult.version).toBe("1.0.0");
  });

  theoretically.it("uses npm_package_name if appConfig.bot.name is '%s'", [null, "", " ", undefined], (insertedValue) => {
    // Arrange
    const environment = {
      npm_package_name: "expected-name"
    };
    const appConfig = {
      bot: {
        name: insertedValue
      }
    };

    // Act
    const actualResult = new BotConfig({ appConfig, environment });

    // Assert
    expect(actualResult.name).toBe(environment.npm_package_name);
  });

  theoretically.it("uses npm_package_version if appConfig.bot.version is '%s'", [null, "", " ", undefined], (insertedValue) => {
    // Arrange
    const environment = {
      npm_package_version: "expected-version"
    };
    const appConfig = {
      bot: {
        version: insertedValue
      }
    };

    // Act
    const actualResult = new BotConfig({ appConfig, environment });

    // Assert
    expect(actualResult.version).toBe(environment.npm_package_version);
  });

  theoretically.it("uses npm_package_description if appConfig.bot.name is '%s'", [null, "", " ", undefined], (insertedValue) => {
    // Arrange
    const environment = {
      npm_package_description: "expected-desc"
    };
    const appConfig = {
      bot: {
        description: insertedValue
      }
    };

    // Act
    const actualResult = new BotConfig({ appConfig, environment });

    // Assert
    expect(actualResult.description).toBe(environment.npm_package_description);
  });

  theoretically.it("uses default name if appConfig.bot.name is '%s' and environment undefined", [null, "", " ", undefined], (insertedValue) => {
    // Arrange
    const environment = undefined;
    const appConfig = {
      bot: {
        name: insertedValue
      }
    };

    // Act
    const actualResult = new BotConfig({ appConfig, environment });

    // Assert
    expect(actualResult.name).toBe("Corporal Lancot");
  });

  theoretically.it("uses default version if appConfig.bot.version is '%s' and environment undefined", [null, "", " ", undefined], (insertedValue) => {
    // Arrange
    const environment = undefined;
    const appConfig = {
      bot: {
        version: insertedValue
      }
    };

    // Act
    const actualResult = new BotConfig({ appConfig, environment });

    // Assert
    expect(actualResult.version).toBe("1.0.0");
  });

  theoretically.it("uses default description if appConfig.bot.name is '%s' and environment undefined", [null, "", " ", undefined], (insertedValue) => {
    // Arrange
    const environment = undefined;
    const appConfig = {
      bot: {
        description: insertedValue
      }
    };

    // Act
    const actualResult = new BotConfig({ appConfig, environment });

    // Assert
    expect(actualResult.description).toBe("Halt!");
  });
});
