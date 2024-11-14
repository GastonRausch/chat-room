import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/core/entities/message.entity';
import { IMessageRepository } from 'src/core/interfaces/message.repository';
import { MessageEntity } from 'src/infrastructure/entities/typeorm-message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TypeOrmMessageRepository implements IMessageRepository {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
  ) {}
  saveMessage(message: Message): void {
    try{
      const messageEntity = MessageEntity.fromMessage(message)
      this.messageRepository.save(messageEntity);
    } catch (error) {
      console.error('[TypeOrmMessageRepository][saveMessage] error:', error);
      throw error;
    }
  }

  generateId(): string {
    return '';
  }

  async findByRoomId(chatRoomId: string): Promise<Message[]> {
    const messageEntity = await this.messageRepository.find({
      where:{ chatRoomId }
    })
    if (messageEntity == null){
      return null
    }
    const messages = []
    messageEntity.map((message)=>{
      messages.push(Message.fromData({
        id: message.id,
        chatRoomId: message.chatRoomId,
        content: message.content,
        senderId: message.senderId,
        timestamp: message.timestamp,
      }))
    })
  }
}
