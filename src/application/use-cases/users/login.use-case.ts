import { User } from 'src/core/entities/user.entity';
import { IUserRepository } from 'src/core/interfaces/user.repository';
import { LoginDTO } from '../../dto/login.dto';
import { HashService } from 'src/application/services/hash.service';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('UserRepository')
    private userRepository: IUserRepository,
    @Inject('HashService')
    private readonly hashService: HashService,
  ) {}

  async execute(userDto: LoginDTO): Promise<User> {
    const user = await this.userRepository.findByUserName(userDto.username);
    if (!user) {
      throw new Error('User not found');
    }

    if (
      !this.hashService.comparePassword(userDto.password, user.passwordHashed)
    ) {
      throw new Error('Invalid credentials');
    }

    return user;
  }
}
