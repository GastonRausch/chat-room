import { v4 as uuid } from 'uuid';

export class User {
  id: string;
  userName: string;
  passwordHashed: string;
  status: string;
  createdAt: Date;
  modifiedAt?: Date | null;

  constructor(
    userName: string,
    passwordHashed: string,
    status: string = 'offline',
  ) {
    this.id = uuid();
    this.userName = userName;
    this.passwordHashed = passwordHashed;
    this.status = status;
    this.createdAt = new Date();
  }

  static fromData(data: any) {
    const instance = new this(data.userName, data.passwordHashed, data.status);
    instance.id = data.id;
    instance.createdAt = data.createdAt;
    instance.modifiedAt = data.modifiedAt;

    return instance;
  }
}
