import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { Log } from 'src/logs/entities/log.entity';
import { LogsService } from 'src/logs/logs.service';
import { getBrowser } from 'src/utils/browser-detect';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logsService: LogsService) {}

  private readonly logger = new Logger('Users');

  async use(req: Request, res: Response, next: () => void) {
    const { method, originalUrl, body, ip, headers } = req;

    const deviceString = headers['user-agent'];

    const deviceObject = getBrowser(deviceString);

    const bodyIsEmpty = Object.keys(body).length === 0;

    res.on('finish', async () => {
      const { statusCode, statusMessage } = res;

      if (body && body?.hasOwnProperty('password')) delete body['password'];

      const content = `${method} ${originalUrl} ${statusCode} ${statusMessage} - ${ip} ${
        !bodyIsEmpty ? JSON.stringify(body) : ''
      } ${deviceString}`;

      if (statusCode >= 100 && statusCode <= 399) this.logger.log(content);
      if (statusCode >= 400 && statusCode <= 499) this.logger.warn(content);
      if (statusCode >= 500 && statusCode <= 599) this.logger.error(content);

      try {
        await this.logsService.create({
          ...deviceObject,
          params: JSON.stringify(body),
          method: method,
          message: statusMessage,
          router: originalUrl,
          ip: ip,
        } as Log);
      } catch (error) {
        throw new Error(error.message);
      }
    });

    next();
  }
}
