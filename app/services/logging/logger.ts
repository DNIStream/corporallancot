'use strict';

module.exports = class Logger {
  constructor() {
  }

  log(message, ...optionalParams) {
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
