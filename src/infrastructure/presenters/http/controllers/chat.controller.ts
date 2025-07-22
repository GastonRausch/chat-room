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
import { ChatRoomDataDTO } from '../../../../application/dto/chat-room-response.dto';
import { CreateRoomDTO } from '../dto/create-room.dto';
import { SendMessageDTO } from '../dto/send-message.dto';

@Controller('rooms')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @HttpCode(201)
  async createRoom(
    @Body() createRoomDto: CreateRoomDTO,
  ): Promise<ChatRoomDataDTO> {
    try {
      const chatRoom = await this.chatService.createRoom(
        createRoomDto.roomName,
        createRoomDto.isPublic,
      );

      return {
        numberOfUsers: 0,
        ...chatRoom,
      };
    } catch (error) {}
  }

  @Get()
  async getAllRooms(): Promise<ChatRoom[]> {
    return this.chatService.getRooms();
  }

  @Get(':id')
  async getRoomInfo(@Param('id') roomId: string): Promise<ChatRoomDataDTO> {
    return this.chatService.getRoomData(roomId);
  }

  @Post(':id/messages')
  @HttpCode(200)
  async sendMessage(
    @Param('id') roomId: string,
    @Body() sendMessageDto: SendMessageDTO,
    @Request() request: any,
  ): Promise<Message> {
    const userId = request.user;

    return this.chatService.sendMessage(roomId, userId, sendMessageDto.content);
  }

  @Post(':id/join')
  @HttpCode(200)
  async joinRoom(
    @Param('id') roomId: string,
    @Request() request: any,
  ): Promise<void> {
    const userId = request.user;

    return this.chatService.join(roomId, userId);
  }
}
