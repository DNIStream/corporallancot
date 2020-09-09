'use strict';

const ActionHandlerBase = require("@actionHandlers/actionHandlerBase");

module.exports = class GenericActionHandler extends ActionHandlerBase {
  constructor({ logger }) {
    super(logger, "generic");
  }

  async handle(actionHandlerMessage) {
    if (!actionHandlerMessage) {
      return;
    }

    // This action handler is called whenever a bang command is not found for a message received by any server.

    // This is intended be used to log all chat messages from all
    // listeners.
    // This feature should be enabled or disabled via config.

    // Do not uncomment the below line unless you want every single chat message from every server to be logged.

    // This could potentially be used to redirect chat from all
    // servers to a central monitoring destination i.e. if
    // a streamer pushes their stream to mixer, twitch and
    // YouTube, but monitor chat in one place.

    // this.logger.log(`${this.logPrefix}Generic action handler received message: '${actionHandlerMessage.data}'`);

    // DO NOT RETURN ANYTHING FROM THIS HANDLER!
    // If you do, the bot will go into recursive meltdown
  }
};
