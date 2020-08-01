'use strict';

require('module-alias/register');

// Executes container.js and sets up the IoC and all app dependencies and rules
const Container = require('@root/container');

// Resolve the bot dependency and call its init() method asynchronously to start the app
(async () => {
  try {
    await Container.cradle.bot.init();
  } catch (e) {
    Container.cradle.logger.log("Halt! A fatal error occurred:\n", e);
    process.exit();
  }
})();
