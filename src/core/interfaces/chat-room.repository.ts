import { ChatRoom } from '../entities/chat-room';

export abstract class ChatRoomRepository {
  abstract saveChatRoom: (chatRoom: ChatRoom) => Promise<ChatRoom>;
  abstract findChatRoomById: (id: string) => Promise<ChatRoom>;
  abstract deleteChatRoom: (id: string) => Promise<boolean>;
  abstract generateId: () => string;
  abstract find: () => Promise<ChatRoom[]>
}
