import { Inject } from "@nestjs/common";
import { ChatRoom } from "src/core/entities/chat-room";
import { ChatRoomRepository } from "src/core/interfaces/chat-room.repository";

export class CreateChatRoomUseCase {
    constructor(
        @Inject('ChatRoomRepository')
        private readonly chatRoomRepository: ChatRoomRepository,
        ) {}
    
      async execute(roomName: string): Promise<ChatRoom> {
        try{
          const chatRoom = new ChatRoom()
          chatRoom.name = roomName

          this.chatRoomRepository.saveChatRoom(chatRoom)

          return chatRoom
        } catch (error) {
          console.error('[CreateChatRoomUseCase][execute] error:', error);
          throw error;
        }
      }
}