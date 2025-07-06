import { Column, Entity, PrimaryColumn } from 'typeorm';

import { Message } from 'src/domain/entities/message';

@Entity({ name: 'message' })
export class MessageEntity {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @Column()
  senderId: string;

  @Column()
  chatRoomId: string;

  @Column()
  content: string;

  @Column({ type: 'varchar' })
  timestamp: string;

  static fromMessage(message: Message) {
    const messageEntity = new MessageEntity();
    messageEntity.chatRoomId = message.chatRoomId;
    messageEntity.content = message.content;
    messageEntity.id = message.id;
    messageEntity.senderId = message.senderId;
    messageEntity.timestamp = message.timestamp;
    return messageEntity;
  }
}
