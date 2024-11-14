import { Inject } from "@nestjs/common";
import { IChatRoomRepository } from "src/core/interfaces/chat-room.repository";

export class CreateChatRoomUseCase {
    constructor(
        @Inject('ChatRoomRepository')
        private readonly chatRoomRepository: IChatRoomRepository,
        ) {}
    
      async execute(roomId: string): Promise<void> {
        try{
          const chatRoom = await this.chatRoomRepository.findChatRoomById(roomId);
          if(!chatRoom){
            throw new Error('Chat room not found');
          }
          
        } catch (error) {
          console.error('[CreateChatRoomUseCase][execute] error:', error);
          throw error;
        }
      }
}