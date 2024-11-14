import { Injectable } from "@nestjs/common";
import { Message } from "src/core/entities/message.entity";
import { IMessageRepository } from "src/core/interfaces/message.repository";

@Injectable()
export class SimMessageRepository implements IMessageRepository {
    private messages: Message[] = [];   // This is a simple in-memory store

    saveMessage(message: Message): void {
        this.messages.push(message);
    }

    generateId(): string {
        return Math.random().toString(36).substring(2);
    }

    async findByRoomId(roomId: string): Promise<Message[]>{
        return this.messages.filter((message)=>{
            message.chatRoomId === roomId
        })
    }
}