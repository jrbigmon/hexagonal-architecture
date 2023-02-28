import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { Log } from 'src/logs/entities/log.entity';
import { LogsService } from 'src/logs/logs.service';
import { getBrowser } from 'src/utils/browser-detect';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logsService: LogsService) {}

  private readonly logger = new Logger('HTTP');

  async use(req: Request, res: Response, next: () => void) {
    const { method, originalUrl, body, ip, headers } = req;

    const deviceObject = getBrowser(headers['user-agent']);

    res.on('finish', async () => {
      const { statusCode, statusMessage } = res;

      if (body && body?.hasOwnProperty('password')) delete body['password'];

      const content = {
        method,
        originalUrl,
        statusCode,
        statusMessage,
        ip,
        body,
        device: deviceObject,
      };

      if (statusCode >= 100 && statusCode <= 399)
        this.logger.log(JSON.stringify(content));

      if (statusCode >= 400 && statusCode <= 499)
        this.logger.warn(JSON.stringify(content));

      if (statusCode >= 500 && statusCode <= 599)
        this.logger.error(JSON.stringify(content));

      await this.logsService.create({
        ...deviceObject,
        params: JSON.stringify(body),
        method: method,
        message: statusMessage,
        router: originalUrl,
        ip: ip,
      } as Log);
    });

    next();
  }
}
