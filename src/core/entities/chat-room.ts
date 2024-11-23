import { v4 as uuidv4 } from 'uuid';

export class ChatRoom {
  id: string;
  name: string;
  usersId: string[];
  isPublic: boolean

  constructor() {}

  public static create(name: string, usersId: string[], isPublic: boolean) {
    const instance = new this();
    instance.id = uuidv4();
    instance.name = name;
    instance.usersId = usersId;
    instance.isPublic = isPublic;
    return instance;
  }

  public static fromData(data: any) {
    const instance = new this();
    instance.id = data.id;
    instance.name = data.name;
    instance.usersId = data.usersId;
    return instance;
  }

  addUser(userId: string) {
    this.usersId.push(userId);
  }
}
