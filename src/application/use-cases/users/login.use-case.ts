import { User } from 'src/core/entities/user.entity';
import { IUserRepository } from 'src/core/interfaces/user.repository';
import { LoginDTO } from '../../dto/login.dto';

export class LoginUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userDto: LoginDTO): Promise<User> {
    const user = await this.userRepository.findByUserName(userDto.username);
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await this.userRepository.validatePassword(
      user,
      userDto.password,
    );
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    return user;
  }
}
