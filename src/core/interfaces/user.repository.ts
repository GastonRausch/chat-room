import { User } from '../entities/user.entity';

export class IUserRepository {
  saveUser: (user: User) => Promise<User>;
  generateId: () => string;
  findByUserName: (userName: string) => Promise<User>;
  findByUserId: (userId: string) => Promise<User>;
}
