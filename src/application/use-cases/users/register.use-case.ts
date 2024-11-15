import { Inject, Injectable } from '@nestjs/common';
import { HashService } from 'src/application/services/hash.service';
import { User } from 'src/core/entities/user.entity';
import { IUserRepository } from 'src/core/interfaces/user.repository';

@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('HashService')
    private readonly hashService: HashService,
  ) {}

  async execute(username: string, password: string): Promise<User> {
    try {
      const id = this.userRepository.generateId();
      
      const passwordHash = await this.hashService.hashPassword(password);

      const user = new User(id, username, passwordHash);

      return await this.userRepository.saveUser(user);
    } catch (error) {
      console.error('[RegisterUseCase][execute] error:', error);
      throw error;
    }
  }
}
