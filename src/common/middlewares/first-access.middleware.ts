import {
  Injectable,
  Logger,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class FirstAccessMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      const payload = this.jwtService.decode(token) as {
        user_id: number;
        user_first_access: boolean;
      };
      if (payload.user_first_access) {
        res.on('close', () => {
          Logger.log(
            `First access from user id: ${payload.user_id}`,
            'FirstAccessMiddleware',
          );
        });
        throw new UnauthorizedException('Altere sua senha antes de continuar.');
      }
    }
    next();
  }
}
