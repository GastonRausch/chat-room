import {
    Inject,
    Injectable,
} from '@nestjs/common';
import { ChatRoom } from 'src/core/entities/chat-room';
import { ChatRoomRepository } from 'src/core/interfaces/chat-room.repository';

@Injectable()
export class JoinRoomUseCase {
  constructor(
    @Inject('ChatRoomRepository')
    private readonly chatRoomRepository: ChatRoomRepository,
  ) {}

  async execute(roomId: string, userId: string): Promise<void> {
    try {
      const chatRoom = await this.chatRoomRepository.findChatRoomById(roomId);
      if (!chatRoom) {
        throw new Error('Chat room not found');
      }
      chatRoom.addUser(userId);
      await this.chatRoomRepository.saveChatRoom(chatRoom);
    } catch (error) {
      console.error('[JoinRoomUseCase][execute] error:', error);
      throw error;
    }
  }
}
