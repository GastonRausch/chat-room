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
import { JwtAuthGuard } from 'src/shared/guards/jwt.guard';
import { ChatRoomDataDTO } from '../../../../application/dto/chat-room-response.dto';
import { CreateRoomDTO } from '../dto/create-room.dto';

@Controller('rooms')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @HttpCode(201)
  async createRoom(
    @Request() req,
    @Body() createRoomDto: CreateRoomDTO,
  ): Promise<ChatRoomDataDTO> {
    try {
      const chatRoom = await this.chatService.createRoom(
        createRoomDto.roomName,
        createRoomDto.isPublic,
      );

      const userId = req.user;

      await this.chatService.joinRoom(chatRoom.id, userId);

      return {
        numberOfUsers: 0,
        ...chatRoom,
      };
    } catch (error) {}
  }

  @Get('/all')
  async getAllRooms(): Promise<ChatRoom[]> {
    return this.chatService.getRooms();
  }

  @Post(':id')
  async joinRoom(@Request() req, @Param('id') roomId: string): Promise<void> {
    const userId = req.user;
    await this.chatService.joinRoom(roomId, userId);
  }

  @Get()
  async getRoomsUserBelongsTo(@Request() req): Promise<ChatRoomDataDTO[]> {
    const rooms = await this.chatService.getUserRooms(req.user);
    console.log( { rooms });
    return rooms as ChatRoomDataDTO[];
  }

  @Get(':id')
  async getRoomInfo(@Param('id') roomId: string): Promise<ChatRoomDataDTO> {
    return this.chatService.getRoomData(roomId);
  }
}
