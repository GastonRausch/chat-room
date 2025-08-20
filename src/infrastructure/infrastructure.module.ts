import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChatService } from 'src/application/services/chat.service';
import { UserUniquenessValidator } from 'src/application/services/user-uniquess.service';
import { UserService } from 'src/application/services/user.service';
import { CreateChatRoomUseCase } from 'src/application/use-cases/chat-room/create-chat-room.use-case';
import { GetMessagesFromRoomUseCase } from 'src/application/use-cases/chat-room/get-messages-from-room.use-case';
import { GetRoomUseCase } from 'src/application/use-cases/chat-room/get-room.use-case';
import { GetRoomsUseCase } from 'src/application/use-cases/chat-room/get-rooms.use-case';
import { GetUserCountUseCase } from 'src/application/use-cases/chat-room/get-user-count.use-case';
import { JoinRoomUseCase } from 'src/application/use-cases/chat-room/join-room.user-case';
import { UserHasAccessToRoomUseCase } from 'src/application/use-cases/chat-room/user-has-access-to-room.use-case';
import { ProcessMessageUseCase } from 'src/application/use-cases/message/send-message.use-case';
import { GetUserInfoUseCase } from 'src/application/use-cases/users/get-user-info.use-case';
import { LoginUseCase } from 'src/application/use-cases/users/login.use-case';
import { RegisterUseCase } from 'src/application/use-cases/users/register.use-case';
import { ChatRoomUsersEntity } from './entities/typeorm-chat-room-users.entity';
import { ChatRoomEntity } from './entities/typeorm-chat-room.entity';
import { MessageEntity } from './entities/typeorm-message.entity';
import { UserEntity } from './entities/typeorm-user.entity';
import { ChatGateway } from './gateways/chat.gateway';
import { ChatController } from './presenters/http/controllers/chat.controller';
import { UserController } from './presenters/http/controllers/user.controller';
import { TypeOrmChatRoomUsersRepository } from './repositories/typeorm/typeorm-chat-room-users.repository';
import { TypeOrmChatRepository } from './repositories/typeorm/typeorm-chat-room.repository';
import { TypeOrmMessageRepository } from './repositories/typeorm/typeorm-message.repository';
import { TypeOrmUserRepository } from './repositories/typeorm/typeorm-user.repository';
import { BcryptHashService } from './services/bcrypt-hash.service';
import { JWtService } from './services/jwt.service';
import { GetUserRoomsUseCase } from 'src/application/use-cases/chat-room/get-user-rooms.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      MessageEntity,
      ChatRoomEntity,
      ChatRoomUsersEntity,
    ]),
  ],
  providers: [
    ChatGateway,
    ChatService,
    ProcessMessageUseCase,
    CreateChatRoomUseCase,
    GetMessagesFromRoomUseCase,
    JoinRoomUseCase,
    GetRoomsUseCase,
    GetRoomUseCase,
    GetUserCountUseCase,
    UserService,
    LoginUseCase,
    RegisterUseCase,
    GetUserInfoUseCase,
    UserUniquenessValidator,
    UserHasAccessToRoomUseCase,
    GetUserRoomsUseCase,
    {
      provide: 'JWTService',
      useClass: JWtService,
    },
    {
      provide: 'MessageRepository',
      useClass: TypeOrmMessageRepository,
    },
    {
      provide: 'ChatRoomRepository',
      useClass: TypeOrmChatRepository,
    },
    {
      provide: 'UserRepository',
      useClass: TypeOrmUserRepository,
    },
    {
      provide: 'ChatRoomUsersRepository',
      useClass: TypeOrmChatRoomUsersRepository,
    },
    {
      provide: 'HashService',
      useClass: BcryptHashService,
    },
  ],
  controllers: [ChatController, UserController],
  exports: [
    'MessageRepository',
    'ChatRoomRepository',
    'UserRepository',
    'ChatRoomUsersRepository',
    'HashService',
  ],
})
export class InfrastructureModule {}
