import * as bcrypt from 'bcryptjs';

import { HashService } from 'src/application/interfaces/hash-service.interface';

export class BcryptHashService implements HashService {
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
