import { readFileSync } from 'fs';

export class AppConfig {
  private _config : string;
  public get config() : string {
    return this._config;
  }

  constructor(configFilePath: string, environment: NodeJS.ProcessEnv) {
    if (!environment) {
      throw new Error("environment not found, unable to continue");
    }

    const json = JSON.parse(readFileSync(configFilePath, { encoding: 'utf8', flag: 'r' }));

    this._config = json;
    // // TODO: Move this logic into BotConfig, DbConfig & chat listener configs
    // // Override secrets with specific env settings
    // const discord = this.config.bot.chatListeners.find((x: { name: string; }) => x.name == "discord");
    // // TODO: Implement UI to auth with Discord
    // discord.settings.key = environment.BOT_DISCORD_KEY;

    // const twitch = this.config.bot.chatListeners.find((x: { name: string; }) => x.name == "twitch");
    // twitch.settings.clientId = environment.BOT_TWITCH_CLIENTID;
    // twitch.settings.clientSecret = environment.BOT_TWITCH_CLIENTSECRET;
    // twitch.settings.channel = environment.BOT_TWITCH_CHANNEL;
    // // TODO: Implement UI to auth with Twitch
    // twitch.settings.accessToken = environment.BOT_TWITCH_ACCESSTOKEN;
    // twitch.settings.refreshToken = environment.BOT_TWITCH_REFRESHTOKEN;

    // this.config.database.name = environment.MYSQL_DATABASE;
    // this.config.database.server = environment.BOT_DB_SERVER;
    // this.config.database.user = environment.MYSQL_USER;
    // this.config.database.password = environment.MYSQL_PASSWORD;
  }
}
