import { Inject, Injectable } from '@nestjs/common';
import { LoginResponseDTO } from 'src/application/dto/login-response.dto';
import { UserInfoDTO } from 'src/application/dto/user-info.dto';
import { HashService } from 'src/application/interfaces/hash-service.interface';
import { JWTService } from 'src/application/interfaces/jwt-service.interface';
import { UserRepository } from 'src/core/interfaces/user.repository';

@Injectable()
export class GetUserInfoUseCase {
  constructor(
    @Inject('UserRepository')
    private userRepository: UserRepository,
  ) {}

  async execute(userId: string): Promise<UserInfoDTO> {
    try {
      const user = await this.userRepository.findByUserId(userId);
      if (!user) {
        throw new Error(`User doesn't exist`);
      }

      return {
        userName: user.userName
      }
    } catch (error) {
      console.log('Error while trying to get user info', { error: error.stack });
      throw error;
    }
  }
}
