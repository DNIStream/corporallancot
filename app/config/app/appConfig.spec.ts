// const AppConfig = require("./appConfig");
// const faker = require('faker');

// describe("appConfig", function () {
//   it("throws error if configFilePath is not found", function () {
//     const configFilePath = "not_a_real_file";
//     expect(function () {
//       AppConfig({ configFilePath });
//     }).toThrowError(`ENOENT: no such file or directory, open '${configFilePath}'`);
//   });

//   it("throws error if environment is not found", function () {
//     const configFilePath = "config.json";
//     expect(() => {
//       AppConfig({ configFilePath: configFilePath });
//     }).toThrowError("environment not found");
//   });

//   it("parses config.json file contents as object", function () {
//     const configFilePath = "config.json";
//     const environment = faker.fake;
//     const appConfig = AppConfig({ configFilePath, environment });
//     expect(appConfig).toBeDefined();
//   });

//   // Sensitive info mapping
//   it("sets environment BOT_DISCORD_KEY to discord.key", function () {
//     // Arrange
//     const expectedValue = faker.lorem.word();
//     const configFilePath = "config.json";
//     const environment = {
//       BOT_DISCORD_KEY: expectedValue
//     };

//     // Act
//     const appConfig = AppConfig({ configFilePath, environment });

//     // Assert
//     const discordEntry = appConfig.bot.chatListeners.find(x => x.name === "discord");
//     expect(discordEntry.settings.key).toBe(expectedValue);
//   });

//   it("sets environment BOT_TWITCH_CLIENTID to twitch.clientId", function () {
//     // Arrange
//     const expectedValue = faker.lorem.word();
//     const configFilePath = "config.json";
//     const environment = {
//       BOT_TWITCH_CLIENTID: expectedValue
//     };

//     // Act
//     const appConfig = AppConfig({ configFilePath, environment });

//     // Assert
//     const twitchEntry = appConfig.bot.chatListeners.find(x => x.name === "twitch");
//     expect(twitchEntry.settings.clientId).toBe(expectedValue);
//   });

//   it("sets environment BOT_TWITCH_CLIENTSECRET to twitch.clientSecret", function () {
//     // Arrange
//     const expectedValue = faker.lorem.word();
//     const configFilePath = "config.json";
//     const environment = {
//       BOT_TWITCH_CLIENTSECRET: expectedValue
//     };

//     // Act
//     const appConfig = AppConfig({ configFilePath, environment });

//     // Assert
//     const twitchEntry = appConfig.bot.chatListeners.find(x => x.name === "twitch");
//     expect(twitchEntry.settings.clientSecret).toBe(expectedValue);
//   });

//   it("sets environment BOT_TWITCH_ACCESSTOKEN to twitch.accessToken", function () {
//     // Arrange
//     const expectedValue = faker.lorem.word();
//     const configFilePath = "config.json";
//     const environment = {
//       BOT_TWITCH_ACCESSTOKEN: expectedValue
//     };

//     // Act
//     const appConfig = AppConfig({ configFilePath, environment });

//     // Assert
//     const twitchEntry = appConfig.bot.chatListeners.find(x => x.name === "twitch");
//     expect(twitchEntry.settings.accessToken).toBe(expectedValue);
//   });

//   it("sets environment BOT_TWITCH_REFRESHTOKEN to twitch.refreshToken", function () {
//     // Arrange
//     const expectedValue = faker.lorem.word();
//     const configFilePath = "config.json";
//     const environment = {
//       BOT_TWITCH_REFRESHTOKEN: expectedValue
//     };

//     // Act
//     const appConfig = AppConfig({ configFilePath, environment });

//     // Assert
//     const twitchEntry = appConfig.bot.chatListeners.find(x => x.name === "twitch");
//     expect(twitchEntry.settings.refreshToken).toBe(expectedValue);
//   });

//   it("sets environment BOT_TWITCH_CHANNEL to twitch.channel", function () {
//     // Arrange
//     const expectedValue = faker.lorem.word();
//     const configFilePath = "config.json";
//     const environment = {
//       BOT_TWITCH_CHANNEL: expectedValue
//     };

//     // Act
//     const appConfig = AppConfig({ configFilePath, environment });

//     // Assert
//     const twitchEntry = appConfig.bot.chatListeners.find(x => x.name === "twitch");
//     expect(twitchEntry.settings.channel).toBe(expectedValue);
//   });

//   it("sets environment MYSQL_DATABASE to database.name", function () {
//     const expectedValue = faker.lorem.word();
//     const configFilePath = "config.json";
//     const environment = {
//       MYSQL_DATABASE: expectedValue
//     };
//     const appConfig = AppConfig({ configFilePath, environment });
//     expect(appConfig.database.name).toBe(expectedValue);
//   });

//   it("sets environment BOT_DB_SERVER to database.server", function () {
//     const expectedValue = faker.lorem.word();
//     const configFilePath = "config.json";
//     const environment = {
//       BOT_DB_SERVER: expectedValue
//     };
//     const appConfig = AppConfig({ configFilePath, environment });
//     expect(appConfig.database.server).toBe(expectedValue);
//   });

//   it("sets environment MYSQL_USER to database.user", function () {
//     const expectedValue = faker.lorem.word();
//     const configFilePath = "config.json";
//     const environment = {
//       MYSQL_USER: expectedValue
//     };
//     const appConfig = AppConfig({ configFilePath, environment });
//     expect(appConfig.database.user).toBe(expectedValue);
//   });

//   it("sets environment MYSQL_PASSWORD to database.password", function () {
//     const expectedValue = faker.lorem.word();
//     const configFilePath = "config.json";
//     const environment = {
//       MYSQL_PASSWORD: expectedValue
//     };
//     const appConfig = AppConfig({ configFilePath, environment });
//     expect(appConfig.database.password).toBe(expectedValue);
//   });
// });
