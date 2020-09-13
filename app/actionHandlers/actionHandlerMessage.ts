export interface IActionHandlerMessage {
  command: string;
  data: string;
  isBangCommand: boolean;

  // Remaining properties are overridden by each *MessageResolver
  server: string;
  isBot: boolean;

  userId: number;
  channelId: number;
  channelName: string;
  nick: string;
  timestamp: Date;
}
