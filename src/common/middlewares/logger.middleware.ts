import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, baseUrl } = req;

    res.on('close', () => {
      const { statusCode, statusMessage } = res;
      const message = `${statusCode} ${statusMessage} ${method} ${baseUrl}`;
      Logger.log(message, 'LoggerMiddleware');
    });

    next();
  }
}
