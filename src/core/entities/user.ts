import { v4 as uuidv4 } from "uuid";

export class User {
  id: string;
  username: string;
  passwordHashed: string;
  status: string;
  createdAt: Date;

  constructor(
    username: string,
    passwordHashed: string,
    status: string = 'offline',
  ) {
    this.id = uuidv4();
    this.username = username;
    this.passwordHashed = passwordHashed;
    this.status = status;
    this.createdAt = new Date();
  }

  static fromData(data: any){
    const instance = new this(
        data.username,
        data.passwordHashed,
        data.status
    )
    return instance
  }
}
