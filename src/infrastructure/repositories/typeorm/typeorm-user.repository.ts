import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/core/entities/user";
import { UserRepository } from "src/core/interfaces/user.repository";
import { UserEntity } from "src/infrastructure/entities/typeorm-user.entity";
import { Repository } from "typeorm";


@Injectable()
export class TypeOrmUserRepository implements UserRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ){}
    async saveUser(user: User): Promise<User> {
        try{
            const userEntity = new UserEntity();
            userEntity.userName = user.userName;
            userEntity.passwordHashed = user.passwordHashed;
            userEntity.id = user.id
            await this.userRepository.save(userEntity);
            return userEntity.toDomainObject()
        } catch (error) {
            console.error('[TypeOrmUserRepository][saveUser] error:', error);
            throw error;
        }
    }

    async findByUserName(userName: string): Promise<User> {
        try {
            const userEntity = await this.userRepository.findOneBy({userName: userName});
            if (!userEntity) {
                throw new Error('User not found');
            }
            return userEntity.toDomainObject()
        } catch (error) {
            console.error('[TypeOrmUserRepository][findByUserName] error:', error);
            throw error;
        }
    }

    async findByUserId(userId: string): Promise<User> {
        try {
            const userEntity = await this.userRepository.findOneBy({id: userId});
            if (!userEntity) {
                throw new Error('User not found');
            }
            console.log('[findByUserId][userEntity]', {userEntity})
            return userEntity.toDomainObject()
        } catch (error) {
            console.error('[TypeOrmUserRepository][findByUserId] error:', error);
            throw error;
        }
    }
}