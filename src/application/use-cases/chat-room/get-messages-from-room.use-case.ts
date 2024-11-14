import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ChatRoom } from 'src/core/entities/chat-room.entity';
import { Message } from 'src/core/entities/message.entity';
import { IChatRoomRepository } from 'src/core/interfaces/chat-room.repository';
import { IMessageRepository } from 'src/core/interfaces/message.repository';

@Injectable()
export class GetMessagesFromRoomUseCase {
  constructor(
    @Inject('ChatRoomRepository')
    private readonly chatRoomRepository: IChatRoomRepository,
    @Inject('MessageRepository')
    private readonly messageRepository: IMessageRepository
    ) {}

  async execute(roomId: string): Promise<Message[]> {
    try{
      const chatRoom = await this.chatRoomRepository.findChatRoomById(roomId);
      if(!chatRoom){
        throw new Error('Chat room not found');
      }
      return this.messageRepository.findByRoomId(roomId)
    } catch (error) {
      console.error('[GetMessagesFromRoomUseCase][execute] error:', error);
      throw error;
    }
  }
}
