'use strict';

const fs = require("fs");

module.exports = ({ configFilePath, environment }) => {
  const config = JSON.parse(fs.readFileSync(configFilePath));
  if (!environment) {
    throw new Error("environment not found");
  }
  // Override secrets with specific env settings
  const discord = config.bot.chatListeners.find(x => x.name == "discord");
  discord.settings.key = environment.BOT_DISCORD_KEY;

  const twitch = config.bot.chatListeners.find(x => x.name == "twitch");
  twitch.settings.clientId = environment.BOT_TWITCH_CLIENTID;
  twitch.settings.clientSecret = environment.BOT_TWITCH_CLIENTSECRET;
  twitch.settings.channel = environment.BOT_TWITCH_CHANNEL;
  twitch.settings.accessToken = environment.BOT_TWITCH_ACCESSTOKEN;
  twitch.settings.refreshToken = environment.BOT_TWITCH_REFRESHTOKEN;

  config.database.name = environment.MYSQL_DATABASE;
  config.database.server = environment.BOT_DB_SERVER;
  config.database.user = environment.MYSQL_USER;
  config.database.password = environment.MYSQL_PASSWORD;
  return config;
}
