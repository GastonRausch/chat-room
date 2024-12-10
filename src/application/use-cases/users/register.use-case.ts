import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { UserResponseDTO } from 'src/application/dto/user-response.dto';
import { HashService } from 'src/application/interfaces/hash-service.interface';
import { UserMapper } from 'src/application/mappers/user.mapper';
import { User } from 'src/core/entities/user';
import { UserAlreadyExistException } from 'src/core/exceptions/user_already_exist.exception';
import { UserRepository } from 'src/core/interfaces/user.repository';
import { UserUniquenessValidator } from 'src/core/services/user-uniquess.service';

@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    @Inject('HashService')
    private readonly hashService: HashService,
    private readonly userUniquenessValidator: UserUniquenessValidator,
  ) {
    this.userUniquenessValidator = new UserUniquenessValidator(this.userRepository)
  }

  async execute(userName: string, password: string): Promise<UserResponseDTO> {
    try {

      if(!await this.userUniquenessValidator.isUserNameUnique(userName)){
        throw new UserAlreadyExistException(userName);
      }

      const passwordHash = await this.hashService.hashPassword(password);
      const user = new User(userName, passwordHash);

      await this.userRepository.saveUser(user);

      return UserMapper.toDTO(user);
    } catch (error) {
      if (error instanceof UserAlreadyExistException) {
        throw new HttpException('User Already Registered', HttpStatus.CONFLICT);
      }
      console.error('[RegisterUseCase][execute] error:', error)
      throw error;
    }
  }
}
