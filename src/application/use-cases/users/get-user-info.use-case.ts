import { Inject, Injectable } from '@nestjs/common';

import { User } from 'src/domain/entities/user';
import { UserRepository } from 'src/domain/interfaces/user.repository';

@Injectable()
export class GetUserInfoUseCase {
  constructor(
    @Inject('UserRepository')
    private userRepository: UserRepository,
  ) {}

  async execute(userId: string): Promise<User> {
    try {
      const user = await this.userRepository.findByUserId(userId);

      return user;
    } catch (error) {
      console.log('Error while trying to get user info', {
        error: error.stack,
      });
      throw error;
    }
  }
}
