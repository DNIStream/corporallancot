import { LoggingBase } from '../../../loggingBase.js';
import { Logger } from '../../logging/logger.js';
import { NotImplemented } from '../../../errors/notImplemented.js';

// "Abstract" base class for persistence repositories
export class RepositoryBase extends LoggingBase {
  constructor(logger: Logger) {
    super(logger);

    this.logger.log(`${this.logPrefix}Initialising repository`);

    // init() is called exactly once each time the repository is instantiated.
    // Repositories should therefore be injected as singletons to avoid multiple
    // connection and creation attempts.
    (async () => {
      try {
        await this.init();
      } catch (e) {
        this.logger.log(`${this.logPrefix}A fatal error occurred when initialising the repository:\n`, e);
        process.exit();
      }
    })();
  }

  // Persistence initialisation is performed by each repository
  // as each ActionPersistenceHandler may be used by zero or more actions,
  // which can be shared by 1 or more ActionHandlers.
  //
  // Each repository is responsible for making sure that it is connected to
  // its appropriate persistence store. This means that init() should be
  // called in each repository method that requires a connection to the
  // persistence store.
  //
  // e.g. The calls in the overridden NotesRepository.init() to
  // dbAdapter.connect() and this.setupTable() MUST be optimised and made
  // thread safe, as they are called numerous times when the repository is
  // first instantiated, then also for each custom implemented method
  // (insertNote(), getRandomNote(), getRandomNoteByContent() etc). This
  // makes sure that the database connection is ready for the command that
  // is being executed.
  protected async init(): Promise<void> {
    throw new NotImplemented();
  }
}
