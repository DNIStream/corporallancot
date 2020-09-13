import { AppConfig } from '../app/appConfig.js';
import { ChatListenerConfigBase } from '../../chatListeners/chatListenerConfigBase.js';

export class BotConfig {

  public readonly name: string;
  public readonly description: string;
  public readonly version: string;
  public readonly chatListeners: ChatListenerConfigBase[] | null;

  constructor(appConfig: AppConfig, environment: NodeJS.ProcessEnv) {
    const defaultName = "Corporal Lancot";
    const defaultDescription = "Halt!";
    const defaultVersion = "1.0.0";

    if (!appConfig && !environment) {
      throw new Error("Either the 'bot' property should be set in the config file, or the bot should be executed via an npm script so it has access to npm environment settings.");
    }

    // Defaults
    this.name = defaultName;
    this.description = defaultDescription;
    this.version = defaultVersion;

    // package.json settings take precedence over defaults
    if (environment) {

      this.name = this.coalesce(environment['npm_package_name'], this.name);
      this.description = this.coalesce(environment['npm_package_description'], this.description);
      this.version = this.coalesce(environment['npm_package_version'], this.version);
    }

    // Config settings take precedence over package.json and defaults
    // if (appConfig.config.bot) {
    //   this.name = this.coalesce(appConfig.config.bot.name, this.name);
    //   this.description = this.coalesce(appConfig.config.bot.description, this.description);
    //   this.version = this.coalesce(appConfig.config.bot.version, this.version);
    // }

    this.chatListeners = null;
  }

  private coalesce(input: string | undefined, defaultValue: string): string {
    if (input === undefined || input.match(/^\s*$/g)) {
      return defaultValue;
    }
    return input;
  }
}
