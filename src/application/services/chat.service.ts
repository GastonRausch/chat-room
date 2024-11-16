import { Injectable } from "@nestjs/common";
import { ChatRoom } from "src/core/entities/chat-room";
import { Message } from "src/core/entities/message";

import { CreateChatRoomUseCase } from "../use-cases/chat-room/create-chat-room.use-case";
import { GetMessagesFromRoomUseCase } from "../use-cases/chat-room/get-messages-from-room.use-case";
import { GetRoomsUseCase } from "../use-cases/chat-room/get-rooms.use-case";
import { JoinRoomUseCase } from "../use-cases/chat-room/join-room.user-case";
import { SendMessageUseCase } from "../use-cases/message/send-message.use-case";

@Injectable()
export class ChatService {
    constructor(
        private readonly sendMessageUseCase: SendMessageUseCase,
        private readonly createChatRoomUseCase: CreateChatRoomUseCase,
        private readonly getMessagesFromRoomUseCase: GetMessagesFromRoomUseCase,
        private readonly joinRoomUseCase: JoinRoomUseCase,
        private readonly getRoomsUseCase: GetRoomsUseCase,
    ) {}

    async sendMessage(chatRoomId: string, senderId: string, content:string): Promise<Message> {
        console.debug('[ChatService][sendMessage]');
        return this.sendMessageUseCase.execute(senderId, chatRoomId, content);
    }

    async createRoom(roomName: string): Promise<ChatRoom> {
        console.debug('[ChatService][createRoom]');
        try{
            const chatRoom = await this.createChatRoomUseCase.execute(roomName);
            return chatRoom;
        } catch (error) {
            console.error('[ChatService][createRoom] error:', error);
            throw error;
        }
    }

    async getRooms(){
        return this.getRoomsUseCase.execute()
    }

    async getMessagesForRoom(chatRoomId: string){
        return this.getMessagesFromRoomUseCase.execute(chatRoomId)
    }

    async join(roomId: string, userId:string){
        return this.joinRoomUseCase.execute(roomId, userId)
    }
}