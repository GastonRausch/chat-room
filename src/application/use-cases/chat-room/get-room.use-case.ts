import { Inject, Injectable } from '@nestjs/common';

import { ChatRoom } from 'src/domain/entities/chat-room';
import { ChatRoomRepository } from 'src/domain/interfaces/chat-room.repository';

@Injectable()
export class GetRoomUseCase {
  constructor(
    @Inject('ChatRoomRepository')
    private readonly chatRoomRepository: ChatRoomRepository,
  ) {}

  async execute(chatRoomId: string): Promise<ChatRoom> {
    return this.chatRoomRepository.findChatRoomById(chatRoomId);
  }
}
