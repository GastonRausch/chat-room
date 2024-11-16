import { Inject, Injectable } from '@nestjs/common';
import { LoginResponseDTO } from 'src/application/dto/login-response.dto';
import { HashService } from 'src/application/interfaces/hash-service.interface';
import { JWTService } from 'src/application/interfaces/jwt-service.interface';
import { UserRepository } from 'src/core/interfaces/user.repository';

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

  async execute(username: string, password: string): Promise<LoginResponseDTO> {
    try {
      const user = await this.userRepository.findByUserName(username);
      if (!user) {
        throw new Error(`User doesn't exist`);
      }

      if (! await this.hashService.comparePassword(password, user.passwordHashed)) {
        throw new Error('Invalid credentials');
      }

      const payload = { sub: user.id, username: user.username };

      const access_token = await this.jwtService.generateToken(payload);
      return {
        access_token,
      };
    } catch (error) {
      console.log('Error while trying to login', { error: error.stack });
      throw error;
    }
  }
}
