import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { USER_PERMISSIONS } from 'src/application/common/constants';

import { HashService } from 'src/application/interfaces/hash-service.interface';
import { JWTService } from 'src/application/interfaces/jwt-service.interface';
import { Login } from 'src/domain/entities/login';
import { UserRepository } from 'src/domain/interfaces/user.repository';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('UserRepository')
    private userRepository: UserRepository,
    @Inject('HashService')
    private readonly hashService: HashService,
    @Inject('JWTService')
    private readonly jwtService: JWTService,
  ) {}

  async execute(userName: string, password: string): Promise<Login> {
    try {
      const user = await this.userRepository.findByUserName(userName);

      if (!user) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }

      if (
        !(await this.hashService.comparePassword(password, user.passwordHashed))
      ) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }

      const payload = {
        sub: user.id,
        userName: user.userName,
        permissions: USER_PERMISSIONS,
      };

      const access_token = await this.jwtService.generateToken(payload);

      return Login.create(user.id, access_token);
    } catch (error: any) {
      console.error(`Error during login`, {
        error: error.stack,
      });
      throw error;
    }
  }
}
