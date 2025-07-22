import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { IncomingMessage } from 'http';
import { Observable } from 'rxjs';

import { JWTService } from '../../application/interfaces/jwt-service.interface';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject('JWTService')
    private jwtService: JWTService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest() as IncomingMessage;

    const token = request.headers.authorization.split('Bearer ')[1];
    if (!token) {
      return false;
    }

    try {
      const valid = this.jwtService.verifyToken(token);

      if (valid) {
        const user = this.jwtService.getUserIdFromToken(token);
        if (user) {
          request['user'] = user;
        } else {
          console.error('[JwtAuthGuard][canActivate] User not found in token');
          return false;
        }
        return true;
      }

      return false;
    } catch (error) {
      console.error('[JwtAuthGuard][canActivate]', {
        error_msg: error.message,
        error_stack: error,
      });
      return false;
    }
  }
}
