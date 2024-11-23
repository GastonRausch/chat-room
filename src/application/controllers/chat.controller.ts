import { Body, Controller, Get, HttpCode, Param, Post, Res } from '@nestjs/common';
import { ChatService } from 'src/application/services/chat.service';
import { ChatRoom } from 'src/core/entities/chat-room';
import { Message } from 'src/core/entities/message';
import { CreateRoomDTO } from '../dto/create-room.dto';
import { SendMessageDTO } from '../dto/send-message.dto';
import { JoinRoomDTO } from '../dto/join-room.dto';
import { ChatRoomResponseDTO } from '../dto/chat-room-response.dto';

@Controller('rooms')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @HttpCode(201)
  async createRoom(@Body() createRoomDto: CreateRoomDTO): Promise<ChatRoomResponseDTO> {
    return this.chatService.createRoom(createRoomDto.roomName, createRoomDto.isPublic);
  }

  @Get()
  async getAllRooms(): Promise<ChatRoom[]>{
    return this.chatService.getRooms();
  }

  @Post(':id/messages')
  @HttpCode(200)
  async sendMessage(
    @Param('id') roomId: string,
    @Body() sendMessageDto: SendMessageDTO
  ): Promise<Message> {
    return this.chatService.sendMessage(
      roomId,
      sendMessageDto.senderId,
      sendMessageDto.content,
    );
  }

  @Post(':id/join')
  @HttpCode(200)
  async joinRoom(
    @Param('id') roomId: string,
    @Body() joinRoomDto: JoinRoomDTO): Promise<void>{
    return this.chatService.join(roomId, joinRoomDto.userId)
  }
}
