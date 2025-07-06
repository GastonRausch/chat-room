import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from 'src/application/services/user.service';
import { LoginUseCase } from 'src/application/use-cases/users/login.use-case';
import { RegisterUseCase } from 'src/application/use-cases/users/register.use-case';
import { UserEntity } from 'src/infrastructure/entities/typeorm-user.entity';
import { TypeOrmUserRepository } from 'src/infrastructure/repositories/typeorm/typeorm-user.repository';
import { BcryptHashService } from 'src/infrastructure/services/bcrypt-hash.service';
import { UserController } from '../../infrastructure/presenters/http/controllers/user.controller';
import { UserUniquenessValidator } from '../services/user-uniquess.service';
import { GetUserInfoUseCase } from '../use-cases/users/get-user-info.use-case';
import { AuthModule } from './auth.module';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    UserService,
    LoginUseCase,
    RegisterUseCase,
    GetUserInfoUseCase,
    UserUniquenessValidator,
    {
      provide: 'UserRepository',
      useClass: TypeOrmUserRepository,
    },
    {
      provide: 'HashService',
      useClass: BcryptHashService,
    },
  ],
})
export class UserModule {}
