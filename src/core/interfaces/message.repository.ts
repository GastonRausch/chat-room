import { Message } from "../entities/message.entity";

export class IMessageRepository {
    saveMessage: (message: Message) => void;
    generateId: () => string;
    findByRoomId: (roomId: string)=> Promise<Message[]>
}
