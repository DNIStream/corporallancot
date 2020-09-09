'use strict';

module.exports = class BotConfig {
  constructor({ appConfig, environment }) {
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
      this.name = this.coalesce(environment.npm_package_name, this.name);
      this.description = this.coalesce(environment.npm_package_description, this.description);
      this.version = this.coalesce(environment.npm_package_version, this.version);
    }

    // Config settings take precedence over package.json and defaults
    if (appConfig.bot) {
      this.name = this.coalesce(appConfig.bot.name, this.name);
      this.description = this.coalesce(appConfig.bot.description, this.description);
      this.version = this.coalesce(appConfig.bot.version, this.version);
    }
  }

  coalesce(input, defaultValue) {
    if (input === null || input === undefined || input.match(/^\s*$/g)) {
      return defaultValue;
    }
    return input;
  }
}
