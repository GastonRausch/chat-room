import { Injectable } from '@nestjs/common';
import { JWTService } from 'src/application/interfaces/jwt-service.interface';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JWtService implements JWTService {
  private readonly secret = process.env.JWT_SECRET || 'defaultSecret';

  async generateToken(payload: Record<string, any>): Promise<string> {
    return jwt.sign(payload, this.secret, { expiresIn: '1h' });
  }

  verifyToken(token: string): Record<string, any> {
    try {
      jwt.verify(token, this.secret);
    } catch (error) {
      throw new Error('Invalid token');
    }

    return jwt.decode(token, { json: true });
  }
}
