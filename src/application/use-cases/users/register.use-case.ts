import { Inject, Injectable } from "@nestjs/common";
import { User } from "src/core/entities/user.entity";
import { IUserRepository } from "src/core/interfaces/user.repository";

@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: IUserRepository
  ) {}

  async execute(username: string, passwordHash:string, ): Promise<User> {
    try {
        const id = this.userRepository.generateId();
        const user = new User(id, username, passwordHash);
      return await this.userRepository.saveUser(user);
    } catch (error) {
      console.error('[RegisterUseCase][execute] error:', error);
      throw error;
    }
  }
}