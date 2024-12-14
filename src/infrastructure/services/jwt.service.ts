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

    return true
  }

  getPermissions(token: string): string[] {
    const jwtDecoded = jwt.decode(token, { json:true} )
    return jwtDecoded.permissions
  }
}
