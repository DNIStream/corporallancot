'use strict';

module.exports = class ActionHandlerResolver {
  constructor({ logger, actions }) {
    this.actions = actions;
    this.logger = logger;
    this.logPrefix = `[${this.constructor.name}] `;
  }

  async resolve(actionHandlerMessage) {
    const m = actionHandlerMessage;
    this.logger.log(`${this.logPrefix}Received: ${JSON.stringify(m)}`);
    if (m.isBangCommand === true && m.command === "generic") {
      throw new Error("The generic action handler cannot be resolved with a bang command");
    }

    let resolvedAction = this.actions.find(a => a.name === (m.command));

    if (resolvedAction) {
      return resolvedAction;
    }

    resolvedAction = this.actions.find(a => a.name === "generic");

    if (!resolvedAction) {
      throw new Error("The generic action handler was not found");
    }

    return resolvedAction;
  }
}
