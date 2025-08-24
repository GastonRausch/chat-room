import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ChatRoomUser } from 'src/domain/entities/chat-room-user';
import { ChatRoomUsersRepository } from 'src/domain/interfaces/chat-room-users.repository';
import { ChatRoomUsersEntity } from 'src/infrastructure/entities/typeorm-chat-room-users.entity';

@Injectable()
export class TypeOrmChatRoomUsersRepository implements ChatRoomUsersRepository {
  constructor(
    @InjectRepository(ChatRoomUsersEntity)
    private readonly chatRoomUsersRepository: Repository<ChatRoomUsersEntity>,
  ) {}

  async userJoinRoom(chatRoomId: string, userId: string) {
    try {
      const oldEntity = await this.chatRoomUsersRepository
        .createQueryBuilder()
        .select()
        .where('chat_room_id = :id', { id: chatRoomId })
        .andWhere('user_id = :id', { id: userId })
        .getOne();

      if (oldEntity) {
        return true;
      }

      const newEntity = ChatRoomUser.create(chatRoomId, userId);
      this.chatRoomUsersRepository.save(newEntity);
      return true;
    } catch (error) {
      console.error('[TypeOrmChatRoomUsersRepository][userJoinRoom]:', {
        error_message: error.message,
        error_stack: error,
      });
      throw error;
    }
  }
}
