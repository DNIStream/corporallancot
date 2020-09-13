import { Logger } from '../../services/logging/logger.js';
import { TokensRepository } from '../../services/db/repositories/tokens/tokensRepository.js';
import { LoggingBase } from '../../loggingBase.js';
import { FieldPacket, RowDataPacket } from 'mysql2/promise';

export class TokensPersistenceHandler extends LoggingBase {
  private repository: TokensRepository;

  constructor(logger: Logger, tokensRepository: TokensRepository) {
    super(logger);
    this.repository = tokensRepository;

    this.logger.log(`${this.logPrefix}Initialising`);
  }

  public async insert(server: string, accessToken: string, refreshToken: string, dateCreated: Date, expiryDate: Date | null): Promise<[RowDataPacket[], FieldPacket[]]> {
    this.logger.log(`${this.logPrefix}Inserting new tokens for server '${server}'`);
    return await this.repository.insert(server, accessToken, refreshToken, dateCreated, expiryDate);
  }

  public async update(server: string, accessToken: string, refreshToken: string, expiryDate: Date | null): Promise<[RowDataPacket[], FieldPacket[]]> {
    this.logger.log(`${this.logPrefix}Updating token for server '${server}'`);
    return await this.repository.update(server, accessToken, refreshToken, expiryDate);
  }

  public async getByServer(server: string): Promise<[RowDataPacket[], FieldPacket[]]> {
    this.logger.log(`${this.logPrefix}Retrieving tokens for server '${server}'`);
    return await this.repository.getByServer(server);
  }
}
