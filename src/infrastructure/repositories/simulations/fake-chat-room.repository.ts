import { Injectable } from '@nestjs/common';

import { ChatRoom } from 'src/domain/entities/chat-room';
import { ChatRoomRepository } from 'src/domain/interfaces/chat-room.repository';

@Injectable()
export class SimChatRoomRepository implements ChatRoomRepository {
  private chatRooms: ChatRoom[] = [];

  saveChatRoom(chatRoom: ChatRoom): Promise<ChatRoom> {
    this.chatRooms.push(chatRoom);
    console.debug(
      '[SimChatRoomRepository][saveChatRoom]chatRooms',
      this.chatRooms,
    );
    return Promise.resolve(chatRoom);
  }

  deleteChatRoom(id: string): Promise<boolean> {
    const index = this.chatRooms.findIndex((chatRoom) => chatRoom.id === id);
    if (index < 0) {
      return Promise.resolve(false);
    }
    this.chatRooms.splice(index, 1);
    return Promise.resolve(true);
  }

  findChatRoomById(id: string): Promise<ChatRoom> {
    console.debug('[SimChatRoomRepository][findChatRoomById]id:', id);
    return Promise.resolve(
      this.chatRooms.find((chatRoom) => chatRoom.id === id),
    );
  }

  find: () => Promise<ChatRoom[]>;

  countUsers: (id: string) => Promise<number>;

  userHasAccess: (chatRoomId: string, userId: string) => Promise<boolean>;

  getUserRooms: (userId: string) => Promise<ChatRoom[]>;
}
