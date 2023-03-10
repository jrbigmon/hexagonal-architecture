import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Log } from '../entities/log.entity';
import { Inject, Logger } from '@nestjs/common';
import { LogGatewayInterface } from './logs-gateways-interface';

export class LogGatewayHttp implements LogGatewayInterface {
  constructor(
    @Inject(HttpService)
    private readonly httpService: HttpService,
  ) {}

  private logger = new Logger(LogGatewayHttp.name);

  async create(log: Log): Promise<Log> {
    const logFormated = new Log(
      log.device,
      log.os,
      log.client,
      log.params,
      log.method,
      log.message,
      log.router,
      log.ip,
    );

    try {
      const response = await lastValueFrom(
        this.httpService.post('logs', logFormated),
      );

      return response.data;
    } catch (error) {
      this.logger.error(error.message);
    }
  }
}
