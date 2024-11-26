import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { LoginResponseDTO } from 'src/application/dto/login-response.dto';
import { HashService } from 'src/application/interfaces/hash-service.interface';
import { JWTService } from 'src/application/interfaces/jwt-service.interface';
import { UserNotFoundException } from 'src/core/exceptions/user_not_found.exception';
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

  async execute(userName: string, password: string): Promise<LoginResponseDTO> {
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

      const payload = { sub: user.id, userName: user.userName };

      const access_token = await this.jwtService.generateToken(payload);
      return {
        access_token,
      };
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }
      throw error
    }
  }
}
