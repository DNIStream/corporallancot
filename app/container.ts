// Example TS code:
// https://github.com/jeffijoe/awilix/blob/master/examples/typescript/src/index.ts

// Container
import { createContainer, Lifetime, InjectionMode, asClass, asFunction, asValue, listModules } from 'awilix';

// App
import { Bot } from './services/bot/bot';

// Config
import { AppConfig } from './config/app/appConfig';
import { BotConfig } from './config/bot/botConfig';
import { DbConfig } from './config/db/dbConfig';

// Services
// TODO: Check if this injection works as intended?
import { MariaDbAdapter } from './services/db/adapters/mariaDb/mariaDbAdapter';
import { Logger } from './services/logging/logger';

// Resolvers
import { ActionHandlerResolver } from './actionHandlers/actionHandlerResolver';

// 3rd party
// import { createConnection } from 'mysql2/promise.js';

// import { Client } from 'discord.js';
// import { ChatClient } from 'twitch-chat-client';
// import { TwitchAuth } from 'twitch-auth';
import { ChatListenerBase } from './chatListeners/chatListenerBase';
import { ActionHandlerBase } from './actionHandlers/actionHandlerBase';
import { DiscordChatListener } from './chatListeners/discord/discordChatListener';
import { GenericActionHandler } from './actionHandlers/generic/genericActionHandler';
import { HelpActionHandler } from './actionHandlers/help/helpActionHandler';
import { NotesActionHandler } from './actionHandlers/notes/notesActionHandler';
import { QuoteActionHandler } from './actionHandlers/quote/quoteActionHandler';
import { NotesPersistenceHandler } from './persistenceHandlers/notes/notesPersistenceHandler';
import { TokensPersistenceHandler } from './persistenceHandlers/tokens/tokensPersistenceHandler';
import { TwitchChatListener } from './chatListeners/twitch/twitchChatListener';
import { DiscordChatListenerConfig } from './chatListeners/discord/discordChatListenerConfig';
import { TwitchChatListenerConfig } from './chatListeners/twitch/twitchChatListenerConfig';
import { DiscordMessageResolver } from './chatListeners/discord/discordMessageResolver';
import { TwitchMessageResolver } from './chatListeners/twitch/twitchMessageResolver';
import { NotesRepository } from './services/db/repositories/notes/notesRepository';
import { TokensRepository } from './services/db/repositories/tokens/tokensRepository';
import { Client } from 'discord.js';

// IoC container - these are the only references to console.log() that should exist in the application
console.log("[Root] Creating IoC container");

interface ICradle {
  bot: Bot;

  // Config
  configFilePath: string;
  environment: NodeJS.ProcessEnv;
  appConfig: AppConfig;
  dbConfig: DbConfig;
  botConfig: BotConfig;

  // Action Handlers
  genericActionHandler: GenericActionHandler,
  helpActionHandler: HelpActionHandler,
  notesActionHandler: NotesActionHandler,
  quoteActionHandler: QuoteActionHandler,

  // Persistence Handlers
  notesPersistenceHandler: NotesPersistenceHandler,
  tokensPersistenceHandler: TokensPersistenceHandler,

  // Chat Listeners
  discordChatListener: DiscordChatListener,
  twitchChatListener: TwitchChatListener,

  // Chat Listener Configs
  discordChatListenerConfig: DiscordChatListenerConfig,
  twitchChatListenerConfig: TwitchChatListenerConfig,

  // Message resolvers
  discordMessageResolver: DiscordMessageResolver,
  twitchMessageResolver: TwitchMessageResolver,

  // Repositories
  notesRepository: NotesRepository,
  tokensRepository: TokensRepository,

  // Shared dependencies
  logger: Logger;
  dbAdapter: MariaDbAdapter;
  actionHandlerResolver: ActionHandlerResolver;

  // Custom array dependencies
  chatListeners: ChatListenerBase[];
  helpActions: ActionHandlerBase[];
  actions: ActionHandlerBase[];

  // 3rd party dependencies
  discordClient: Client;
}

// TODO: Possibly create an interface to pass as a generic?
export const Container = createContainer<ICradle>({
  injectionMode: InjectionMode.CLASSIC
});

console.log("[Root] Registering services");

// Auto load actions & persistence handlers
// TODO: Change to TS references?
// const actionHandlersGlob = 'app/actionHandlers/*/*ActionHandler.js';
// const actionPersistenceHandlersGlob = 'app/persistenceHandlers/*/*PersistenceHandler.js';
// const chatListenersGlobSuffix = 'app/chatListeners/*/';
// const chatListenersGlob = `${chatListenersGlobSuffix}*ChatListener.ts`;
// const repositoriesGlob = 'app/services/db/repositories/*/*Repository';

// Container.loadModules([actionHandlersGlob, actionPersistenceHandlersGlob], {
//   resolverOptions: {
//     register: asClass,
//     lifetime: Lifetime.SINGLETON
//   }
// });

// console.log("before");
// // Auto load chat listener files
// Container.loadModules([
//   chatListenersGlob,
//   `${chatListenersGlobSuffix}*ChatListenerConfig.ts`,
//   `${chatListenersGlobSuffix}*MessageResolver.ts`
// ], {
//   resolverOptions: {
//     register: asClass
//   }
// });
// console.log("after");
// Auto load repositories (singletons)
// Container.loadModules([repositoriesGlob], {
//   resolverOptions: {
//     register: asClass,
//     lifetime: Lifetime.SINGLETON
//   }
// });

Container.register({
  // Bootstrap
  bot: asClass(Bot).singleton(),

  // Config
  configFilePath: asValue("config.json"),
  environment: asValue(process.env),
  appConfig: asClass(AppConfig).singleton(),
  dbConfig: asClass(DbConfig),
  botConfig: asClass(BotConfig),

  // Logging
  logger: asClass(Logger),

  // 3rd Party dependencies
  // mySql: asFunction(createConnection),
  discordClient: asClass(Client),
  // twitchChatClient: asClass(ChatClient),
  // twitchAuth: asValue(TwitchAuth),

  // Action Handlers
  genericActionHandler: asClass(GenericActionHandler).singleton(),
  helpActionHandler: asClass(HelpActionHandler).singleton(),
  notesActionHandler: asClass(NotesActionHandler).singleton(),
  quoteActionHandler: asClass(QuoteActionHandler).singleton(),

  // Persistence Handlers
  notesPersistenceHandler: asClass(NotesPersistenceHandler).singleton(),
  tokensPersistenceHandler: asClass(TokensPersistenceHandler).singleton(),

  // Chat listeners
  discordChatListener: asClass(DiscordChatListener),
  twitchChatListener: asClass(TwitchChatListener),

  // Chat Listener Configs
  discordChatListenerConfig: asClass(DiscordChatListenerConfig),
  twitchChatListenerConfig: asClass(TwitchChatListenerConfig),

  // Message resolvers
  discordMessageResolver: asClass(DiscordMessageResolver),
  twitchMessageResolver: asClass(TwitchMessageResolver),

  // Repositories
  notesRepository: asClass(NotesRepository).singleton(),
  tokensRepository: asClass(TokensRepository).singleton(),

  // Database adapter. Swap out if you want to implement
  // another database provider.
  dbAdapter: asClass(MariaDbAdapter).singleton(),

  // Resolvers
  actionHandlerResolver: asClass(ActionHandlerResolver),

  // Chat Listeners
  chatListeners: asFunction(() => {
    return [
      Container.resolve<DiscordChatListener>('discordChatListener'),
      Container.resolve<TwitchChatListener>('twitchChatListener')
    ];
    // return listModules("**/*ChatListener")
    //   .map(a => Container.resolve(a.name));
  }),

  // Add all of the above actions into the below returned array
  helpActions: asFunction(() => {
    return listModules("**/**ActionHandler")
      .filter(a => a.name !== 'helpActionHandler')
      .map(a => Container.resolve(a.name));
  }),

  // Register all actions as an array.
  // N.B. Do not inject this registration into any actions as you will create a cyclic dependency
  actions: asFunction(() => {
    return listModules("**/**ActionHandler")
      .map(a => Container.resolve<ActionHandlerBase>(a.name));
  })
});

Container.cradle.logger.log("[Root] All services registered");
