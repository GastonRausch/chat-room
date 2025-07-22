import { Column, Entity, PrimaryColumn } from 'typeorm';

import { ChatRoom } from 'src/domain/entities/chat-room';

@Entity({ name: 'chat-room' })
export class ChatRoomEntity {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @Column()
  name: string;

  static toDomainObject(chatRoomEntity: ChatRoomEntity): ChatRoom {
    const chatRoom = new ChatRoom();

    chatRoom.id = chatRoomEntity.id;
    chatRoom.name = chatRoomEntity.name;

    return chatRoom;
  }
}
