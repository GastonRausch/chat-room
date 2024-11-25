import { Inject, Injectable } from '@nestjs/common';
import { Message } from 'src/core/entities/message';
import { ChatRoomRepository } from 'src/core/interfaces/chat-room.repository';
import { MessageRepository } from 'src/core/interfaces/message.repository';
import { UserRepository } from 'src/core/interfaces/user.repository';

@Injectable()
export class SendMessageUseCase {
  constructor(
    @Inject('ChatRoomRepository')
    private readonly chatRoomRepository: ChatRoomRepository,
    @Inject('MessageRepository')
    private readonly messageRepository: MessageRepository,
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async execute(
    senderId: string,
    chatRoomId: string,
    content: string,
  ): Promise<Message> {
    try {
      const user = await this.userRepository.findByUserId(senderId);
      if (!user) {
        throw new Error('User not found');
      }
      const chatRoom =
        await this.chatRoomRepository.findChatRoomById(chatRoomId);
      if (!chatRoom) {
        throw new Error('Chat room not found');
      }
      console.debug('[SendMessageUseCase][execute]chatRoom:', chatRoom);
      const message = Message.create(senderId, chatRoomId, content);
      this.messageRepository.saveMessage(message);
      return message;
    } catch (error) {
      console.error('[SendMessageUseCase][execute] error:', error);
      throw error;
    }
  }
}
