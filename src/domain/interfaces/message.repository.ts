import { Message } from '../entities/message';

export class MessageRepository {
  saveMessage: (message: Message) => void;
  findByRoomId: (roomId: string) => Promise<Message[]>;
}
