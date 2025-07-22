import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/domain/entities/user';
import { UserNotFoundException } from 'src/domain/exceptions/user_not_found.exception';
import { UserRepository } from 'src/domain/interfaces/user.repository';
import { UserEntity } from 'src/infrastructure/entities/typeorm-user.entity';

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async saveUser(user: User): Promise<User> {
    try {
      const entity = UserEntity.fromDomainObject(user);
      await this.userRepository.save(entity);
      return entity.toDomainObject();
    } catch (error) {
      console.error('[TypeOrmUserRepository][saveUser] error:', error);
      throw error;
    }
  }

  async findByUserName(userName: string): Promise<User> {
    try {
      const entity = await this.userRepository.findOneBy({
        userName: userName,
      });
      if (!entity) {
        throw new UserNotFoundException(userName);
      }
      return entity.toDomainObject();
    } catch (error) {
      console.error('[TypeOrmUserRepository][findByUserName] error:', error);
      throw error;
    }
  }

  async findByUserId(userId: string): Promise<User> {
    try {
      const entity = await this.userRepository.findOneBy({ id: userId });
      if (!entity) {
        throw new UserNotFoundException(userId);
      }

      console.log('[findByUserId][userEntity]', { userEntity: entity });
      return entity.toDomainObject();
    } catch (error) {
      console.error('[TypeOrmUserRepository][findByUserId] error:', error);
      throw error;
    }
  }
}
