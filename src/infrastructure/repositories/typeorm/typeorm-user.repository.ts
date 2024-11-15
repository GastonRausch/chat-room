import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/core/entities/user.entity";
import { IUserRepository } from "src/core/interfaces/user.repository";
import { UserEntity } from "src/infrastructure/entities/typeorm-user.entity";
import { Repository } from "typeorm";


@Injectable()
export class TypeOrmUserRepository implements IUserRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ){}
    async saveUser(user: User): Promise<User> {
        try{
            const userEntity = new UserEntity();
            userEntity.userName = user.username;
            userEntity.passwordHashed = user.passwordHashed;
            await this.userRepository.save(userEntity);
            return new User(userEntity.id, userEntity.userName, userEntity.passwordHashed);
        } catch (error) {
            console.error('[TypeOrmUserRepository][saveUser] error:', error);
            throw error;
        }
    }

    async findByUserName(userName: string): Promise<User> {
        try {
            const entity = await this.userRepository.findOneBy({userName: userName});
            if (!entity) {
                throw new Error('User not found');
            }
            return new User(entity.id, entity.userName, entity.passwordHashed);
        } catch (error) {
            console.error('[TypeOrmUserRepository][findByUserName] error:', error);
            throw error;
        }
    }

    generateId(): string {
        return '';
    }

    async findByUserId(userId: string): Promise<User> {
        try {
            const entity = await this.userRepository.findOneBy({id: userId});
            return new User(entity.id, entity.userName, entity.passwordHashed);
        } catch (error) {
            console.error('[TypeOrmUserRepository][findByUserId] error:', error);
            throw error;
        }
    }
}