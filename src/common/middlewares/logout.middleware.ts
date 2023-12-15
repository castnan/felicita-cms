import {
  Injectable,
  Logger,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LogoutMiddleware implements NestMiddleware {

  async use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers as { authorization: string };
    const [, token] = authorization.split(' ');
    if ( true ){
      Logger.log('Token already logged out', 'LogoutMiddleware');
      throw new UnauthorizedException();
    }
    next();
  }
}
