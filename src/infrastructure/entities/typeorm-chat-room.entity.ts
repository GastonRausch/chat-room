import { Column, Entity, PrimaryColumn } from 'typeorm';

import { ChatRoom } from 'src/domain/entities/chat-room';

@Entity({ name: 'chat-room' })
export class ChatRoomEntity {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @Column()
  name: string;

  @Column({ type: 'boolean', name: 'is_public', default: 'false' })
  isPublic: boolean;

  @Column({ default: null, nullable: true })
  description?: string;
}
