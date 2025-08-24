import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';

import { JWTService } from 'src/application/interfaces/jwt-service.interface';

@Injectable()
export class JWtService implements JWTService {
  private readonly secret = process.env.JWT_SECRET || 'defaultSecret';

  async generateToken(payload: Record<string, any>): Promise<string> {
    return jwt.sign(payload, this.secret, { expiresIn: '1h' });
  }

  verifyToken(token: string): boolean {
    try {
      jwt.verify(token, this.secret);
    } catch (error) {
      throw new Error('Invalid token');
    }

    return true;
  }

  getPermissions(token: string): string[] {
    const jwtDecoded = jwt.decode(token, { json: true });
    return jwtDecoded.permissions;
  }

  getUserIdFromToken(token: string): string | null {
    const jwtDecoded = jwt.decode(token, { json: true });
    return jwtDecoded.sub;
  }

  decodeToken(token: string): Record<string, any> | null {
    try {
      return jwt.decode(token, { json: true });
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
}
