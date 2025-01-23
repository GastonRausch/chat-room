import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common'
import { IncomingMessage } from 'http';
import { Observable } from 'rxjs';
import { JWTService } from '../interfaces/jwt-service.interface';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        @Inject('JWTService')
        private jwtService: JWTService
    ){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest() as IncomingMessage;

        const token = request.headers.authorization.split('Bearer ')[1]
        if(!token){
            return false
        }

        if(this.jwtService.verifyToken(token)){
            return true
        }

        return false
    }
}
