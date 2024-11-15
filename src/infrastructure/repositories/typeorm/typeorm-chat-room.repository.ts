import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatRoom } from 'src/core/entities/chat-room.entity';
import { IChatRoomRepository } from 'src/core/interfaces/chat-room.repository';
import { ChatRoomEntity } from 'src/infrastructure/entities/typeorm-chat-room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TypeOrmChatRepository implements IChatRoomRepository {
  constructor(
    @InjectRepository(ChatRoomEntity)
    private readonly chatRoomRepository: Repository<ChatRoomEntity>,
  ) {}
  async deleteChatRoom(id: string): Promise<boolean> {
    const result = await this.chatRoomRepository.delete(id);
    return result.affected > 0;
  }
  async findChatRoomById(id: string): Promise<ChatRoom> {
    const chatRoomEntity = await this.chatRoomRepository.findOneBy({ id });
    if (!chatRoomEntity) {
      return null;
    }
    return ChatRoom.create(
      chatRoomEntity.id,
      chatRoomEntity.name,
      chatRoomEntity.usersId,
    );
  }
  generateId(): string {
    return '';
  }
  async saveChatRoom(chatRoom: ChatRoom): Promise<ChatRoom> {
    try {
      const chatRoomEntity = new ChatRoomEntity();
      chatRoomEntity.name = chatRoom.name;
      chatRoomEntity.usersId = chatRoom.usersId;
      await this.chatRoomRepository.save(chatRoomEntity);
      console.debug(
        '[TypeOrmChatRepository][saveChatRoom] chatRoomEntity:',
        chatRoomEntity,
      );
      return ChatRoom.fromData({
        id: chatRoomEntity.id,
        name: chatRoomEntity.name,
        usersId: chatRoomEntity.usersId,
      });
    } catch (error) {
      console.error('[TypeOrmChatRepository][saveChatRoom] error:', error);
      throw error;
    }
  }

  async find(): Promise<ChatRoom[]> {
    try {
      const chatRooms = await this.chatRoomRepository.find();
      const chatRoomsEntities = chatRooms.map((chatRoomEntity) =>
        ChatRoomEntity.toDomainObject(chatRoomEntity),
      );
      return chatRoomsEntities;
    } catch (error) {
      throw error;
    }
  }
}
