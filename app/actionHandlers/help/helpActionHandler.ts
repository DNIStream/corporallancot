import { Logger } from '../../services/logging/logger.js';
import { ActionHandlerBase } from '../actionHandlerBase.js';
import { IActionHandlerMessage } from '../actionHandlerMessage.js';

export class HelpActionHandler extends ActionHandlerBase {
  private readonly actions: ActionHandlerBase[];

  constructor(logger: Logger, helpActions: ActionHandlerBase[]) {
    super(logger, "help");

    this.actions = helpActions;
    this.help = "`!help` to show this message.";
  }

  public async handle(actionHandlerMessage: IActionHandlerMessage): Promise<string | null> {
    if (!actionHandlerMessage) {
      return null;
    }
    const helpText = this.actions.map(a => a.help).join("\r\n");
    return helpText;
  }
}
