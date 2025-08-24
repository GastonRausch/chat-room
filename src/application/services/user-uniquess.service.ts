import { UserNotFoundException } from 'src/domain/exceptions/user_not_found.exception';
import { UserRepository } from 'src/domain/interfaces/user.repository';

export class UserUniquenessValidator {
  constructor(private readonly userRepository: UserRepository) {}

  async isUserNameUnique(userName: string): Promise<boolean> {
    try {
      const user = await this.userRepository.findByUserName(userName);
      return !user;
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        return true;
      }

      console.error('Error isUserNameUnique', {
        stack: error.stack,
      });

      return false;
    }
  }
}
