import { Inject } from '@nestjs/common';
import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

import { JWTService } from 'src/application/interfaces/jwt-service.interface';
import { ChatService } from 'src/application/services/chat.service';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection {
  constructor(
    private readonly chatService: ChatService,
    @Inject('JWTService')
    private readonly jwtService: JWTService,
  ) {}

  async handleConnection(client: Socket): Promise<void> {
    try {
      const token = client.handshake.headers['authorization']?.replace(
        'Bearer ',
        '',
      );
      if (this.jwtService.verifyToken(token)) {
        console.log(`Client ${client.id} connected with valid token.`);
        const payload = this.jwtService.decodeToken(token);
        client.data.user = {
          id: payload.sub,
          email: payload.email,
          permissions: payload.permissions,
        };
        const rooms = await this.chatService.getUserRooms(client.data.user.id);
        console.log({ rooms });
        rooms.forEach((room) => {
          client.join(room.id);
        });
      } else {
        console.error(
          `Client ${client.id} connection failed due to invalid token.`,
        );
        client.disconnect();
      }
    } catch (error) {
      console.error(`Error during connection for client ${client.id}:`, error);
      client.disconnect();
    }
  }

  @SubscribeMessage('message')
  async handleMessage(
    client: Socket,
    data: { roomId: string; message: string },
  ): Promise<void> {
    if (
      !(await this.chatService.userHasAccessToRoom(
        data.roomId,
        client.data.user.id,
      ))
    ) {
      client.emit('errors', {
        message: 'You do not have access to this room.',
      });
      return;
    }
    this.chatService.processMessage(
      data.roomId,
      client.data.user.id,
      data.message,
    );
    client.to(data.roomId).emit('message', {
      userId: client.data.user.id,
      message: data.message,
      timestamp: new Date(),
    });
    client.emit('results', {
      message: 'Message sent successfully.',
    });
  }

  @SubscribeMessage('join_room')
  handleJoinRoom(client: Socket, room: string): void {
    try {
      console.log(`Client ${client.id} joined room: ${room}`);
      this.chatService.joinRoom(room, client.data.user.id);
      client.join(room);
      client.emit('results', {
        message: `Joined room ${room} successfully.`,
      });
    } catch (error) {
      console.error(
        `Error joining room ${room} for client ${client.id}:`,
        error,
      );
      client.emit('errors', {
        message: `Failed to join room ${room}.`,
      });
    }
  }
}
