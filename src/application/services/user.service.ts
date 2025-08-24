import { Injectable } from '@nestjs/common';

import { GetUserInfoUseCase } from '../use-cases/users/get-user-info.use-case';
import { LoginUseCase } from '../use-cases/users/login.use-case';
import { RegisterUseCase } from '../use-cases/users/register.use-case';
import { User } from 'src/domain/entities/user';
import { Login } from 'src/domain/entities/login';

@Injectable()
export class UserService {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly getUserInfoUseCase: GetUserInfoUseCase,
  ) {}

  async register(user: string, password: string): Promise<User> {
    return this.registerUseCase.execute(user, password);
  }

  async login(user: string, password: string): Promise<Login> {
    return this.loginUseCase.execute(user, password);
  }

  async getUserInfo(userId: string): Promise<User> {
    return this.getUserInfoUseCase.execute(userId);
  }
}
