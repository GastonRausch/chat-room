import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChatService } from 'src/application/services/chat.service';
import { CreateChatRoomUseCase } from 'src/application/use-cases/chat-room/create-chat-room.use-case';
import { GetMessagesFromRoomUseCase } from 'src/application/use-cases/chat-room/get-messages-from-room.use-case';
import { GetRoomsUseCase } from 'src/application/use-cases/chat-room/get-rooms.use-case';
import { JoinRoomUseCase } from 'src/application/use-cases/chat-room/join-room.user-case';
import { SendMessageUseCase } from 'src/application/use-cases/message/send-message.use-case';
import { ChatRoomUsersEntity } from 'src/infrastructure/entities/typeorm-chat-room-users.entity';
import { ChatRoomEntity } from 'src/infrastructure/entities/typeorm-chat-room.entity';
import { MessageEntity } from 'src/infrastructure/entities/typeorm-message.entity';
import { UserEntity } from 'src/infrastructure/entities/typeorm-user.entity';
import { TypeOrmChatRoomUsersRepository } from 'src/infrastructure/repositories/typeorm/typeorm-chat-room-users.repository';
import { TypeOrmChatRepository } from 'src/infrastructure/repositories/typeorm/typeorm-chat-room.repository';
import { TypeOrmMessageRepository } from 'src/infrastructure/repositories/typeorm/typeorm-message.repository';
import { TypeOrmUserRepository } from 'src/infrastructure/repositories/typeorm/typeorm-user.repository';
import { ChatController } from '../../infrastructure/presenters/http/controllers/chat.controller';
import { GetRoomUseCase } from '../use-cases/chat-room/get-room.use-case';
import { GetUserCountUseCase } from '../use-cases/chat-room/get-user-count.use-case';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      ChatRoomEntity,
      MessageEntity,
      UserEntity,
      ChatRoomUsersEntity,
    ]),
  ],
  controllers: [ChatController],
  providers: [
    ChatService,
    SendMessageUseCase,
    CreateChatRoomUseCase,
    GetMessagesFromRoomUseCase,
    JoinRoomUseCase,
    GetRoomsUseCase,
    GetRoomUseCase,
    GetUserCountUseCase,
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
  ],
})
export class ChatModule {}
