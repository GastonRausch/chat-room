import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/application/services/user.service';
import { LoginUseCase } from 'src/application/use-cases/users/login.use-case';
import { RegisterUseCase } from 'src/application/use-cases/users/register.use-case';
import { UserEntity } from 'src/infrastructure/entities/typeorm-user.entity';
import { TypeOrmUserRepository } from 'src/infrastructure/repositories/typeorm/typeorm-user.repository';
import { BcryptHashService } from 'src/infrastructure/services/bcrypt-hash.service';
import { JWtService } from 'src/infrastructure/services/jwt.service';
import { UserController } from '../controllers/user.controller';
import { GetUserInfoUseCase } from '../use-cases/users/get-user-info.use-case';
import { UserUniquenessValidator } from 'src/core/services/user-uniquess.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
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
    {
      provide: 'JWTService',
      useClass: JWtService,
    },
  ],
})
export class UserModule {}
