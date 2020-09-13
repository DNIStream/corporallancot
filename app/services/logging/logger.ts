export class Logger {
  public log(message: string, ...optionalParams: unknown[]): void {
    // TODO: Message prefix handling (class name?)
    // TODO: Use moment or similar to format the date
    // TODO: Replace console.log() with a logging tool
    message = `${new Date().toLocaleString("en-GB")}: ${message}`
    if (optionalParams && optionalParams.length > 0) {
      console.log(message, optionalParams);
    } else {
      console.log(message);
    }
  }
}
