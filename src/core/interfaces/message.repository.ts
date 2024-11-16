import { Message } from "../entities/message";

export class MessageRepository {
    saveMessage: (message: Message) => void;
    generateId: () => string;
    findByRoomId: (roomId: string)=> Promise<Message[]>
}
