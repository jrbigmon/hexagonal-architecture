import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Log } from '../entities/log.entity';
import { Inject } from '@nestjs/common';
import { DeviceDetectorResult } from 'device-detector-js';
import { LogGatewayInterface } from './logs-gateways-interface';

export class LogGatewayHttp implements LogGatewayInterface {
  constructor(
    @Inject(HttpService)
    private readonly httpService: HttpService,
  ) {}

  async create(log: DeviceDetectorResult): Promise<Log> {
    const device = JSON.stringify(log.device);
    const os = JSON.stringify(log.os);
    const client = JSON.stringify(log.client);

    const logFormated = new Log(
      device.toString(),
      os.toString(),
      client.toString(),
    );

    const response = await lastValueFrom(
      this.httpService.post('logs', logFormated),
    );

    return response.data;
  }
}
