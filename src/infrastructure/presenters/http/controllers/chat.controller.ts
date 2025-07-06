import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { ChatService } from 'src/application/services/chat.service';
import { ChatRoom } from 'src/domain/entities/chat-room';
import { Message } from 'src/domain/entities/message';
import { JwtAuthGuard } from 'src/shared/guards/jwt.guard';
import { ChatRoomResponseDTO } from '../dto/responses/chat-room-response.dto';
import { CreateRoomDTO } from '../dto/requests/create-room.dto';
import { JoinRoomDTO } from '../dto/requests/join-room.dto';
import { SendMessageDTO } from '../dto/requests/send-message.dto';
import { ChatRoomMapper } from '../mappers/chat-room.mapper';

@UseGuards(JwtAuthGuard)
@Controller('rooms')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @HttpCode(201)
  async createRoom(
    @Body() createRoomDto: CreateRoomDTO,
  ): Promise<ChatRoomResponseDTO> {
    try {
      const chatRoom = await this.chatService.createRoom(
        createRoomDto.roomName,
        createRoomDto.isPublic,
      );

      return ChatRoomMapper.toDTO(chatRoom);
    } catch (error) {}
  }

  @Get()
  async getAllRooms(): Promise<ChatRoom[]> {
    return this.chatService.getRooms();
  }

  @Post(':id/messages')
  @HttpCode(200)
  async sendMessage(
    @Param('id') roomId: string,
    @Body() sendMessageDto: SendMessageDTO,
    @Request() request: any,
  ): Promise<Message> {
    const userId = request.user;

    console.log({ userId });

    return this.chatService.sendMessage(roomId, userId, sendMessageDto.content);
  }

  @Post(':id/join')
  @HttpCode(200)
  async joinRoom(
    @Param('id') roomId: string,
    @Body() joinRoomDto: JoinRoomDTO,
  ): Promise<void> {
    return this.chatService.join(roomId, joinRoomDto.userId);
  }
}
