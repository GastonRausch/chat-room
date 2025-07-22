import { Injectable } from '@nestjs/common';

import { ChatRoom } from 'src/domain/entities/chat-room';
import { Message } from 'src/domain/entities/message';
import { CreateChatRoomUseCase } from '../use-cases/chat-room/create-chat-room.use-case';
import { GetMessagesFromRoomUseCase } from '../use-cases/chat-room/get-messages-from-room.use-case';
import { GetRoomUseCase } from '../use-cases/chat-room/get-room.use-case';
import { GetRoomsUseCase } from '../use-cases/chat-room/get-rooms.use-case';
import { GetUserCountUseCase } from '../use-cases/chat-room/get-user-count.use-case';
import { JoinRoomUseCase } from '../use-cases/chat-room/join-room.user-case';
import { SendMessageUseCase } from '../use-cases/message/send-message.use-case';
import { ChatRoomDataDTO } from '../dto/chat-room-response.dto';

@Injectable()
export class ChatService {
  constructor(
    private readonly sendMessageUseCase: SendMessageUseCase,
    private readonly createChatRoomUseCase: CreateChatRoomUseCase,
    private readonly getMessagesFromRoomUseCase: GetMessagesFromRoomUseCase,
    private readonly joinRoomUseCase: JoinRoomUseCase,
    private readonly getRoomsUseCase: GetRoomsUseCase,
    private readonly getRoomUseCase: GetRoomUseCase,
    private readonly getUserCountUseCase: GetUserCountUseCase,
  ) {}

  async sendMessage(
    chatRoomId: string,
    senderId: string,
    content: string,
  ): Promise<Message> {
    console.debug('[ChatService][sendMessage]');
    return this.sendMessageUseCase.execute(senderId, chatRoomId, content);
  }

  async createRoom(roomName: string, isPublic: boolean): Promise<ChatRoom> {
    console.debug('[ChatService][createRoom]');
    try {
      const chatRoom = await this.createChatRoomUseCase.execute(
        roomName,
        isPublic,
      );
      return chatRoom;
    } catch (error) {
      console.error('[ChatService][createRoom] error:', error);
      throw error;
    }
  }

  async getRooms() {
    return this.getRoomsUseCase.execute();
  }

  async getRoomData(chatRoomId: string) {
    const chatRoom = await this.getRoomUseCase.execute(chatRoomId);
    const userCount = await this.getUserCountUseCase.execute(chatRoomId);

    return new ChatRoomDataDTO(
      chatRoom.id,
      chatRoom.name,
      chatRoom.isPublic,
      userCount,
    );
  }

  async getMessagesForRoom(chatRoomId: string) {
    return this.getMessagesFromRoomUseCase.execute(chatRoomId);
  }

  async join(roomId: string, userId: string) {
    return this.joinRoomUseCase.execute(roomId, userId);
  }
}
