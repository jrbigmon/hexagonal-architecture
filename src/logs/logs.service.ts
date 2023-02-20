import { Log } from './entities/log.entity';
import { LogGatewayHttp } from './gateways/logs-gateways-http';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class LogsService {
  constructor(
    @Inject('logGatewayHttp')
    private readonly logGatewayHttp: LogGatewayHttp,
  ) {}

  async create(createLogDto: Log) {
    return await this.logGatewayHttp.create(createLogDto);
  }
}
