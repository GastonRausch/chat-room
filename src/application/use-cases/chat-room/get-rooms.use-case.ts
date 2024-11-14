import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ChatRoom } from 'src/core/entities/chat-room.entity';
import { IChatRoomRepository } from 'src/core/interfaces/chat-room.repository';

@Injectable()
export class GetRoomsUseCase {
  constructor(
    @Inject('ChatRoomRepository')
    private readonly chatRoomRepository: IChatRoomRepository,
    ) {}

  async execute(): Promise<ChatRoom[]> {
    return this.chatRoomRepository.find()
  }
}
