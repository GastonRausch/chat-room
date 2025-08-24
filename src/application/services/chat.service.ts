import { Injectable } from '@nestjs/common';

import { ChatRoom } from 'src/domain/entities/chat-room';
import { Message } from 'src/domain/entities/message';
import { CreateChatRoomUseCase } from '../use-cases/chat-room/create-chat-room.use-case';
import { GetMessagesFromRoomUseCase } from '../use-cases/chat-room/get-messages-from-room.use-case';
import { GetRoomUseCase } from '../use-cases/chat-room/get-room.use-case';
import { GetRoomsUseCase } from '../use-cases/chat-room/get-rooms.use-case';
import { GetUserCountUseCase } from '../use-cases/chat-room/get-user-count.use-case';
import { JoinRoomUseCase } from '../use-cases/chat-room/join-room.user-case';
import { ProcessMessageUseCase } from '../use-cases/message/send-message.use-case';
import { ChatRoomDataDTO } from '../dto/chat-room-response.dto';
import { UserHasAccessToRoomUseCase } from '../use-cases/chat-room/user-has-access-to-room.use-case';
import { GetUserRoomsUseCase } from '../use-cases/chat-room/get-user-rooms.use-case';

@Injectable()
export class ChatService {
  constructor(
    private readonly processMessageUseCase: ProcessMessageUseCase,
    private readonly createChatRoomUseCase: CreateChatRoomUseCase,
    private readonly getMessagesFromRoomUseCase: GetMessagesFromRoomUseCase,
    private readonly joinRoomUseCase: JoinRoomUseCase,
    private readonly getRoomsUseCase: GetRoomsUseCase,
    private readonly getRoomUseCase: GetRoomUseCase,
    private readonly getUserCountUseCase: GetUserCountUseCase,
    private readonly userHasAccessToRoomUseCase: UserHasAccessToRoomUseCase,
    private readonly getUserRoomsUseCase: GetUserRoomsUseCase,
  ) {}

  async processMessage(
    chatRoomId: string,
    senderId: string,
    content: string,
  ): Promise<Message> {
    console.debug('[ChatService][processMessage]');
    return this.processMessageUseCase.execute(senderId, chatRoomId, content);
  }

  async createRoom(roomName: string, isPublic: boolean, description: string): Promise<ChatRoom> {
    console.debug('[ChatService][createRoom]');
    try {
      const chatRoom = await this.createChatRoomUseCase.execute(
        roomName,
        isPublic,
        description,
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
      chatRoom.description,
    );
  }

  async getMessagesForRoom(chatRoomId: string) {
    return this.getMessagesFromRoomUseCase.execute(chatRoomId);
  }

  async joinRoom(roomId: string, userId: string) {
    return this.joinRoomUseCase.execute(roomId, userId);
  }

  async userHasAccessToRoom(roomId: string, userId: string): Promise<boolean> {
    return this.userHasAccessToRoomUseCase.execute(roomId, userId);
  }

  async getUserRooms(userId: string): Promise<ChatRoom[]> {
    return this.getUserRoomsUseCase.execute(userId);
  }
}
