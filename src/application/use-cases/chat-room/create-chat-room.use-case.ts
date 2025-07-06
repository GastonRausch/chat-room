import { Inject } from '@nestjs/common';

import { ChatRoom } from 'src/domain/entities/chat-room';
import { ChatRoomRepository } from 'src/domain/interfaces/chat-room.repository';

export class CreateChatRoomUseCase {
  constructor(
    @Inject('ChatRoomRepository')
    private readonly chatRoomRepository: ChatRoomRepository,
  ) {}

  async execute(roomName: string, isPublic: boolean): Promise<ChatRoom> {
    try {
      const chatRoom = ChatRoom.create(roomName, null, isPublic);

      this.chatRoomRepository.saveChatRoom(chatRoom);

      return chatRoom;
    } catch (error) {
      console.error('[CreateChatRoomUseCase][execute] error:', error);
      throw error;
    }
  }
}
