import { v4 as uuid } from 'uuid';

export class ChatRoomUser {
  id: string;
  userId: string;
  chatRoomId: string;
  joinedAt: Date;

  constructor() {}

  public static create(chatRoomId: string, userId: string) {
    const instance = new this();
    instance.id = uuid();
    instance.chatRoomId = chatRoomId;
    instance.userId = userId;
    instance.joinedAt = new Date();
    return instance;
  }
}
