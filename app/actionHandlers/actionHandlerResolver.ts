import { LoggingBase } from '../loggingBase.js';
import { Logger } from '../services/logging/logger.js';
import { ActionHandlerBase } from './actionHandlerBase.js';
import { IActionHandlerMessage } from './actionHandlerMessage.js';

export class ActionHandlerResolver extends LoggingBase {
  protected actions: ActionHandlerBase[];

  constructor(logger: Logger, actions: ActionHandlerBase[]) {
    super(logger);
    this.actions = actions;
  }

  public async resolve(actionHandlerMessage: IActionHandlerMessage): Promise<ActionHandlerBase> {

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
