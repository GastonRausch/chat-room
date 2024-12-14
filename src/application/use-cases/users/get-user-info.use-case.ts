import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { UserInfoDTO } from 'src/application/dto/user-info.dto';
import { UserNotFoundException } from 'src/core/exceptions/user_not_found.exception';
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

      return {
        userName: user.userName
      }
    } catch (error) {
      if ( error instanceof UserNotFoundException ){
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      console.log('Error while trying to get user info', { error: error.stack });
      throw error;
    }
  }
}
