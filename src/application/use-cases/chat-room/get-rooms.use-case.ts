import { Inject, Injectable } from '@nestjs/common';

import { ChatRoom } from 'src/domain/entities/chat-room';
import { ChatRoomRepository } from 'src/domain/interfaces/chat-room.repository';

@Injectable()
export class GetRoomsUseCase {
  constructor(
    @Inject('ChatRoomRepository')
    private readonly chatRoomRepository: ChatRoomRepository,
  ) {}

  async execute(): Promise<ChatRoom[]> {
    return this.chatRoomRepository.find();
  }
}
