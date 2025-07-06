import { ChatRoom } from 'src/domain/entities/chat-room';
import { ChatRoomResponseDTO } from '../dto/responses/chat-room-response.dto';

export class ChatRoomMapper {
  static toDTO(chatRoom: ChatRoom): ChatRoomResponseDTO {
    return new ChatRoomResponseDTO(
      chatRoom.id,
      chatRoom.name,
      chatRoom.usersId,
      chatRoom.isPublic,
    );
  }
}
