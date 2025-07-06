import { Injectable } from '@nestjs/common';
import { Message } from 'src/domain/entities/message';
import { MessageRepository } from 'src/domain/interfaces/message.repository';

@Injectable()
export class SimMessageRepository implements MessageRepository {
  private messages: Message[] = []; // This is a simple in-memory store

  saveMessage(message: Message): void {
    this.messages.push(message);
  }

  async findByRoomId(roomId: string): Promise<Message[]> {
    return this.messages.filter((message) => {
      message.chatRoomId === roomId;
    });
  }
}
