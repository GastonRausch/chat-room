import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Message } from 'src/domain/entities/message';
import { MessageRepository } from 'src/domain/interfaces/message.repository';
import { MessageEntity } from 'src/infrastructure/entities/typeorm-message.entity';

@Injectable()
export class TypeOrmMessageRepository implements MessageRepository {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
  ) {}
  saveMessage(message: Message): void {
    try {
      const entity = MessageEntity.fromMessage(message);
      this.messageRepository.save(entity);
    } catch (error) {
      console.error('[TypeOrmMessageRepository][saveMessage] error:', error);
      throw error;
    }
  }

  async findByRoomId(chatRoomId: string): Promise<Message[]> {
    const entity = await this.messageRepository.find({
      where: { chatRoomId },
    });
    if (entity == null) {
      return null;
    }
    const messages = [];
    entity.map((message) => {
      messages.push(
        Message.fromData({
          id: message.id,
          chatRoomId: message.chatRoomId,
          content: message.content,
          senderId: message.senderId,
          timestamp: message.timestamp,
        }),
      );
    });

    return messages;
  }
}
