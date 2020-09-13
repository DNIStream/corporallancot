import { AppConfig } from '../app/appConfig';
export class DbConfig {
  // TODO: Fix this up!
  public readonly database: string = "";
  public readonly server: string = "";
  public readonly username: string = "";
  public readonly password: string = "";
  public readonly connRetryCount: number = 0;
  public readonly connRetryDelay: number = 0;

  constructor(appConfig: AppConfig) {
    // const databaseNameDefault = "notes";
    // const serverNameDefault = "localhost";
    // const connectionRetryCountDefault = 10;
    // const connectionRetryDelayDefault = 5000;

    // if (!appConfig.database) {
    //   this.database = databaseNameDefault;
    //   this.server = serverNameDefault;
    //   this.connRetryCount = connectionRetryCountDefault;
    //   this.connRetryDelay = connectionRetryDelayDefault;
    //   return;
    // }

    // this.database = appConfig.database.name || databaseNameDefault;
    // this.server = appConfig.database.server || serverNameDefault;
    // this.username = appConfig.database.user;
    // this.password = appConfig.database.password;
    // this.connRetryCount = appConfig.database.connectionRetryCount || connectionRetryCountDefault;
    // this.connRetryDelay = appConfig.database.connectionRetryDelay || connectionRetryDelayDefault;
  }
}
