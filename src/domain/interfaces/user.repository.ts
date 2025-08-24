import { User } from '../entities/user';

export class UserRepository {
  saveUser: (user: User) => Promise<User>;
  findByUserName: (userName: string) => Promise<User>;
  findByUserId: (userId: string) => Promise<User>;
}
