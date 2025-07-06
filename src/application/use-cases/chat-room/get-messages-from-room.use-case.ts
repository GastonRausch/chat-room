import { Inject, Injectable } from '@nestjs/common';

import { Message } from 'src/domain/entities/message';
import { ChatRoomRepository } from 'src/domain/interfaces/chat-room.repository';
import { MessageRepository } from 'src/domain/interfaces/message.repository';

@Injectable()
export class GetMessagesFromRoomUseCase {
  constructor(
    @Inject('ChatRoomRepository')
    private readonly chatRoomRepository: ChatRoomRepository,
    @Inject('MessageRepository')
    private readonly messageRepository: MessageRepository,
  ) {}

  async execute(roomId: string): Promise<Message[]> {
    try {
      const chatRoom = await this.chatRoomRepository.findChatRoomById(roomId);
      if (!chatRoom) {
        throw new Error('Chat room not found');
      }
      return this.messageRepository.findByRoomId(roomId);
    } catch (error) {
      console.error('[GetMessagesFromRoomUseCase][execute] error:', error);
      throw error;
    }
  }
}
