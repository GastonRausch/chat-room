import { Inject, Injectable } from '@nestjs/common';

import { ChatRoomRepository } from 'src/domain/interfaces/chat-room.repository';

@Injectable()
export class UserHasAccessToRoomUseCase {
  constructor(
    @Inject('ChatRoomRepository')
    private readonly chatRoomRepository: ChatRoomRepository,
  ) {}

  async execute(chatRoomId: string, userId: string): Promise<boolean> {
    return this.chatRoomRepository.userHasAccess(chatRoomId, userId);
  }
}
