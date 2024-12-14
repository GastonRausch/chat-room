import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChatService } from "src/application/services/chat.service";
import { CreateChatRoomUseCase } from "src/application/use-cases/chat-room/create-chat-room.use-case";
import { GetMessagesFromRoomUseCase } from "src/application/use-cases/chat-room/get-messages-from-room.use-case";
import { GetRoomsUseCase } from "src/application/use-cases/chat-room/get-rooms.use-case";
import { JoinRoomUseCase } from "src/application/use-cases/chat-room/join-room.user-case";
import { SendMessageUseCase } from "src/application/use-cases/message/send-message.use-case";
import { ChatRoomEntity } from "src/infrastructure/entities/typeorm-chat-room.entity";
import { MessageEntity } from "src/infrastructure/entities/typeorm-message.entity";
import { UserEntity } from "src/infrastructure/entities/typeorm-user.entity";
import { TypeOrmChatRepository } from "src/infrastructure/repositories/typeorm/typeorm-chat-room.repository";
import { TypeOrmMessageRepository } from "src/infrastructure/repositories/typeorm/typeorm-message.repository";
import { TypeOrmUserRepository } from "src/infrastructure/repositories/typeorm/typeorm-user.repository";
import { ChatController } from "../controllers/chat.controller";
import { AuthModule } from "./auth.module";

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([ChatRoomEntity, MessageEntity, UserEntity])],
    controllers: [ChatController],
    providers: [
        ChatService,
        SendMessageUseCase,
        CreateChatRoomUseCase,
        GetMessagesFromRoomUseCase,
        JoinRoomUseCase,
        GetRoomsUseCase,
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
        }
    ]
})
export class ChatModule {}