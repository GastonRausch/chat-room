import { ChatRoom } from 'src/core/entities/chat-room';
import { ChatRoomResponseDTO } from '../dto/chat-room-response.dto';

export class ChatRoomMapper {
  static toDTO(chatRoom: ChatRoom): ChatRoomResponseDTO {
    return new ChatRoomResponseDTO(
      chatRoom.id,
      chatRoom.name,
      chatRoom.usersId,
    );
  }
}
