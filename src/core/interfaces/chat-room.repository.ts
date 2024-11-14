import { ChatRoom } from '../entities/chat-room.entity';

export class IChatRoomRepository {
  saveChatRoom: (chatRoom: ChatRoom) => Promise<ChatRoom>;
  findChatRoomById: (id: string) => Promise<ChatRoom>;
  deleteChatRoom: (id: string) => Promise<boolean>;
  generateId: () => string;
  find: () => Promise<ChatRoom[]>
}
