import { Inject, Injectable } from '@nestjs/common';
import { UserResponseDTO } from 'src/application/dto/user-response.dto';
import { HashService } from 'src/application/interfaces/hash-service.interface';
import { UserMapper } from 'src/application/mappers/user.mapper';
import { User } from 'src/core/entities/user';
import { UserRepository } from 'src/core/interfaces/user.repository';

@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    @Inject('HashService')
    private readonly hashService: HashService,
  ) {}

  async execute(username: string, password: string): Promise<UserResponseDTO> {
    try {
      const id = this.userRepository.generateId();

      const passwordHash = await this.hashService.hashPassword(password);

      const user = new User(id, username, passwordHash);

      await this.userRepository.saveUser(user);

      return UserMapper.toDTO(user);
    } catch (error) {
      console.error('[RegisterUseCase][execute] error:', error);
      throw error;
    }
  }
}
