import { Inject } from '@nestjs/common';

import { ChatRoom } from 'src/domain/entities/chat-room';
import { ChatRoomRepository } from 'src/domain/interfaces/chat-room.repository';

export class CreateChatRoomUseCase {
  constructor(
    @Inject('ChatRoomRepository')
    private readonly chatRoomRepository: ChatRoomRepository,
  ) {}

  async execute(roomName: string, isPublic: boolean, description: string): Promise<ChatRoom> {
    try {
      const chatRoom = ChatRoom.create({
        isPublic: isPublic,
        name: roomName,
        description: description,
      });

      await this.chatRoomRepository.saveChatRoom(chatRoom);

      return chatRoom;
    } catch (error) {
      console.error('[CreateChatRoomUseCase][execute] error:', error);
      throw error;
    }
  }
}
