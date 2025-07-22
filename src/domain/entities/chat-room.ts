import { v4 as uuid } from 'uuid';

export class ChatRoom {
  id: string;
  name: string;
  isPublic: boolean;

  constructor() {}

  public static create(name: string, isPublic: boolean) {
    const instance = new this();
    instance.id = uuid();
    instance.name = name;
    instance.isPublic = isPublic;
    return instance;
  }

  public static fromData(data: any) {
    const instance = new this();
    instance.id = data.id;
    instance.name = data.name;
    return instance;
  }
}
