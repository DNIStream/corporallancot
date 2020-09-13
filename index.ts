// Executes container.js and sets up the IoC and all app dependencies and rules
import { Container } from './app/container.js';

// Resolve the bot dependency and call its init() method asynchronously to start the app
(async () => {
  try {
    await Container.cradle.bot.init();
  } catch (e) {
    Container.cradle.logger.log("A fatal error occurred:\n", e);
    process.exit();
  }
})();
