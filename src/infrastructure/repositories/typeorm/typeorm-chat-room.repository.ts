import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ChatRoom } from 'src/domain/entities/chat-room';
import { ChatRoomRepository } from 'src/domain/interfaces/chat-room.repository';
import { ChatRoomEntity } from 'src/infrastructure/entities/typeorm-chat-room.entity';
import { ChatRoomUsersEntity } from 'src/infrastructure/entities/typeorm-chat-room-users.entity';

@Injectable()
export class TypeOrmChatRepository implements ChatRoomRepository {
  constructor(
    @InjectRepository(ChatRoomEntity)
    private readonly chatRoomRepository: Repository<ChatRoomEntity>,
    @InjectRepository(ChatRoomUsersEntity)
    private readonly chatRoomUsersRepository: Repository<ChatRoomUsersEntity>,
  ) {}

  async deleteChatRoom(id: string): Promise<boolean> {
    const result = await this.chatRoomRepository.delete(id);
    return result.affected > 0;
  }

  async findChatRoomById(id: string): Promise<ChatRoom> {
    const entity = await this.chatRoomRepository.findOneBy({ id });
    if (!entity) {
      return null;
    }

    return ChatRoom.fromData({
      id,
      name: entity.name,
      isPublic: entity.isPublic,
      description: entity.description,
    });
  }

  async saveChatRoom(chatRoom: ChatRoom): Promise<ChatRoom> {
    try {
      const entity = new ChatRoomEntity();
      entity.name = chatRoom.name;
      entity.id = chatRoom.id;
      await this.chatRoomRepository.save(entity);
      console.debug(
        '[TypeOrmChatRepository][saveChatRoom] chatRoomEntity:',
        entity,
      );
      return ChatRoom.fromData({
        id: entity.id,
        name: entity.name,
        isPublic: entity.isPublic,
        description: entity.description,
      });
    } catch (error) {
      console.error('[TypeOrmChatRepository][saveChatRoom] error:', error);
      throw error;
    }
  }

  async find(): Promise<ChatRoom[]> {
    try {
      const chatRooms = await this.chatRoomRepository.find();
      const entities = chatRooms.map((entity) =>
        ChatRoom.fromData({
          id: entity.id,
          isPublic: entity.isPublic,
          name: entity.name,
          description: entity.description,
        }),
      );
      return entities;
    } catch (error) {
      throw error;
    }
  }

  async countUsers(roomId: string): Promise<number> {
    const queryBuilder = this.chatRoomUsersRepository.createQueryBuilder();

    const number = await queryBuilder
      .select()
      .where('chat_room_id = :id', { id: roomId })
      .getCount();

    return number;
  }

  async userHasAccess(chatRoomId: string, userId: string): Promise<boolean> {
    const queryBuilder = this.chatRoomUsersRepository.createQueryBuilder();

    const count = await queryBuilder
      .select()
      .where('chat_room_id = :chatRoomId', { chatRoomId })
      .andWhere('user_id = :userId', { userId })
      .getCount();

    return count > 0;
  }

  async getUserRooms(userId: string): Promise<ChatRoom[]> {
    const entities = await this.chatRoomRepository
      .createQueryBuilder('cr')
      .leftJoin('chat_room_users', 'cru', 'cr.id = cru.chat_room_id')
      .where('cru.user_id = :userId', { userId })
      .getRawMany();

    return entities.map((room) =>
      ChatRoom.fromData({
        id: room.cr_id,
        name: room.cr_name,
        isPublic: room.cr_is_public,
        description: room.cr_description,
      }),
    );
  }
}
