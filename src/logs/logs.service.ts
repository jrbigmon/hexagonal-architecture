import { LogGatewayHttp } from './gateways/logs-gateways-http';
import { Inject, Injectable } from '@nestjs/common';
import { DeviceDetectorResult } from 'device-detector-js';

@Injectable()
export class LogsService {
  constructor(
    @Inject('logGatewayHttp')
    private readonly logGatewayHttp: LogGatewayHttp,
  ) {}

  async create(createLogDto: DeviceDetectorResult) {
    return await this.logGatewayHttp.create(createLogDto);
  }
}
