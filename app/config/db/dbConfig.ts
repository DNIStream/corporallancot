'use strict';

module.exports = class DbConfig {
  constructor({ appConfig }) {
    const databaseNameDefault = "notes";
    const serverNameDefault = "localhost";
    const connectionRetryCountDefault = 10;
    const connectionRetryDelayDefault = 5000;

    if (!appConfig.database) {
      this.database = databaseNameDefault;
      this.server = serverNameDefault;
      this.connRetryCount = connectionRetryCountDefault;
      this.connRetryDelay = connectionRetryDelayDefault;
      return;
    }

    this.database = appConfig.database.name || databaseNameDefault;
    this.server = appConfig.database.server || serverNameDefault;
    this.username = appConfig.database.user;
    this.password = appConfig.database.password;
    this.connRetryCount = appConfig.database.connectionRetryCount || connectionRetryCountDefault;
    this.connRetryDelay = appConfig.database.connectionRetryDelay || connectionRetryDelayDefault;
  }
}
