import { Inject, Injectable } from '@nestjs/common';

import { ChatRoomRepository } from 'src/domain/interfaces/chat-room.repository';

@Injectable()
export class GetUserCountUseCase {
  constructor(
    @Inject('ChatRoomRepository')
    private readonly chatRoomRepository: ChatRoomRepository,
  ) {}

  async execute(chatRoomId: string): Promise<number> {
    return this.chatRoomRepository.countUsers(chatRoomId);
  }
}
