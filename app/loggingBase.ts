import { Logger } from "./services/logging/logger";

/*
 * A base class for types that need logging support
 */
export class LoggingBase {
  protected readonly logger: Logger;
  protected readonly logPrefix: string;

  constructor(logger: Logger) {
    this.logger = logger;
    this.logPrefix = `[${this.constructor.name}] `;
  }
}
