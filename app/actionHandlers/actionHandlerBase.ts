import { NotImplemented } from '../errors/notImplemented.js';
import { LoggingBase } from '../loggingBase.js';
import { Logger } from '../services/logging/logger.js';
import { IActionHandlerMessage } from './actionHandlerMessage.js';

export class ActionHandlerBase extends LoggingBase {

  public readonly name: string;

  private _help: string = "";

  public get help() : string {
    return this._help;
  }
  public set help(v : string) {
    this._help = v;
  }

  constructor(logger: Logger, name: string) {
    super(logger);
    this.name = name;
    this.logger.log(`${this.logPrefix}Initialising '!${name}' action handler`);
  }

  public async handle(actionHandlerMessage: IActionHandlerMessage): Promise<string | null> {
    throw NotImplemented;
  }
}
