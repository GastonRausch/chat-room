import { Inject } from "@nestjs/common";
import { ChatRoomResponseDTO } from "src/application/dto/chat-room-response.dto";
import { ChatRoomMapper } from "src/application/mappers/chat-room.mapper";
import { ChatRoom } from "src/core/entities/chat-room";
import { ChatRoomRepository } from "src/core/interfaces/chat-room.repository";

export class CreateChatRoomUseCase {
    constructor(
        @Inject('ChatRoomRepository')
        private readonly chatRoomRepository: ChatRoomRepository,
        ) {}
    
      async execute(roomName: string, isPublic: boolean): Promise<ChatRoomResponseDTO> {
        try{
          const chatRoom = ChatRoom.create(roomName, null, isPublic)

          this.chatRoomRepository.saveChatRoom(chatRoom)

          return ChatRoomMapper.toDTO(chatRoom)
        } catch (error) {
          console.error('[CreateChatRoomUseCase][execute] error:', error);
          throw error;
        }
      }
}