import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { HashService } from 'src/application/interfaces/hash-service.interface';
import { UserUniquenessValidator } from 'src/application/services/user-uniquess.service';
import { User } from 'src/domain/entities/user';
import { UserAlreadyExistException } from 'src/domain/exceptions/user_already_exist.exception';
import { UserRepository } from 'src/domain/interfaces/user.repository';

@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    @Inject('HashService')
    private readonly hashService: HashService,
    private readonly userUniquenessValidator: UserUniquenessValidator,
  ) {
    this.userUniquenessValidator = new UserUniquenessValidator(
      this.userRepository,
    );
  }

  async execute(userName: string, password: string): Promise<User> {
    try {
      if (!(await this.userUniquenessValidator.isUserNameUnique(userName))) {
        throw new UserAlreadyExistException(userName);
      }

      const passwordHash = await this.hashService.hashPassword(password);
      const user = new User(userName, passwordHash);

      await this.userRepository.saveUser(user);

      return user;
    } catch (error) {
      if (error instanceof UserAlreadyExistException) {
        throw new HttpException('User Already Registered', HttpStatus.CONFLICT);
      }
      console.error('[RegisterUseCase][execute] error:', error);
      throw error;
    }
  }
}
