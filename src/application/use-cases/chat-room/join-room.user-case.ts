import { Inject, Injectable } from '@nestjs/common';
import { ChatRoomUsersRepository } from 'src/domain/interfaces/chat-room-users.repository';

import { ChatRoomRepository } from 'src/domain/interfaces/chat-room.repository';
import { UserRepository } from 'src/domain/interfaces/user.repository';

@Injectable()
export class JoinRoomUseCase {
  constructor(
    @Inject('ChatRoomRepository')
    private readonly chatRoomRepository: ChatRoomRepository,
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    @Inject('ChatRoomUsersRepository')
    private readonly chatRoomUsersRepository: ChatRoomUsersRepository,
  ) {}

  async execute(roomId: string, userId: string): Promise<void> {
    try {
      console.log('JoinRoomUseCase', roomId);
      const chatRoom = await this.chatRoomRepository.findChatRoomById(roomId);
      if (!chatRoom) {
        throw new Error('Chat room not found');
      }

      const user = await this.userRepository.findByUserId(userId);
      if (!user) {
        throw new Error('User not found');
      }
      await this.chatRoomUsersRepository.userJoinRoom(chatRoom.id, user.id);
    } catch (error) {
      console.error('[JoinRoomUseCase][execute] error:', error);
      throw error;
    }
  }
}
