// import { Logger } from '../logging/logger';
// import { Bot } from './bot';
// import { BotConfig } from '../../config/bot/botConfig';
// import { ChatListenerBase } from '../../chatListeners/chatListenerBase';

// describe("bot init()", function () {
//   let logger: jasmine.SpyObj<Logger>;
//   let botConfig: jasmine.SpyObj<BotConfig>;
//   let chatListeners: jasmine.SpyObj<ChatListenerBase[]>;

//   beforeEach(() => {
//     logger = jasmine.createSpyObj<Logger>(["log"]);
//     botConfig = jasmine.createSpyObj<BotConfig>(null, {
//       name: null,
//       description: null,
//       version: null
//     });
//     chatListeners = jasmine.createSpyObj<ChatListenerBase[]>(null, null);
//   });

//   it("calls init() for each chatListener", async () => {
//     // Arrange
//     const chatListener = jasmine.createSpyObj("chatListeners", ["init"]);
//     chatListeners = [chatListener, chatListener];
//     const bot = new Bot(logger, botConfig, chatListeners);

//     // Act
//     await bot.init();

//     // Assert
//     expect(chatListener.init).toHaveBeenCalledTimes(2);
//   });
// });

