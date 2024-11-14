export class Message {
  id?: string;
  senderId: string;
  chatRoomId: string;
  content: string;
  timestamp: number;

  constructor() {}

  public static create(
    id: string,
    senderId: string,
    chatRoomId: string,
    content: string,
    timestamp: number = Date.now(),
  ) {
    const instance = new this();
    instance.id = id;
    instance.senderId = senderId;
    instance.chatRoomId = chatRoomId;
    instance.content = content;
    instance.timestamp = timestamp;
    return instance
  }

  public static fromData(data: any) {
    const instance = new this();
    instance.id = data.id;
    instance.chatRoomId = data.chatRoomId;
    instance.content = data.content;
    instance.timestamp = data.timestamp;
    instance.senderId = data.senderId
    return instance
  }
}
