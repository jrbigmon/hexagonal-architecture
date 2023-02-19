import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger();

  use(req: Request, res: Response, next: () => void) {
    const { method, originalUrl, body, ip } = req;

    const bodyIsEmpty = Object.keys(body).length === 0;

    res.on('finish', () => {
      const { statusCode, statusMessage } = res;

      if (body && body?.hasOwnProperty('password')) delete body['password'];

      const content = `${method} ${originalUrl} ${statusCode} ${statusMessage} - ${ip} ${
        !bodyIsEmpty ? JSON.stringify(body) : ''
      }`;

      if (statusCode >= 100 && statusCode <= 399) this.logger.log(content);
      if (statusCode >= 400 && statusCode <= 499) this.logger.warn(content);
      if (statusCode >= 500 && statusCode <= 599) this.logger.error(content);
    });

    next();
  }
}
