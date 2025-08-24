import { ChatRoom } from '../entities/chat-room';

export abstract class ChatRoomRepository {
  abstract saveChatRoom: (chatRoom: ChatRoom) => Promise<ChatRoom>;
  abstract findChatRoomById: (id: string) => Promise<ChatRoom>;
  abstract userHasAccess: (
    chatRoomId: string,
    userId: string,
  ) => Promise<boolean>;
  abstract deleteChatRoom: (id: string) => Promise<boolean>;
  abstract find: () => Promise<ChatRoom[]>;
  abstract countUsers: (id: string) => Promise<number>;
  abstract getUserRooms: (userId: string) => Promise<ChatRoom[]>;
}
