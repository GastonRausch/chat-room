import { v4 as uuidv4 } from "uuid";

export class User {
  id: string;
  userName: string;
  passwordHashed: string;
  status: string;
  createdAt: Date;
  modifiedAt?: Date | null

  constructor(
    userName: string,
    passwordHashed: string,
    status: string = 'offline',
  ) {
    this.id = uuidv4();
    this.userName = userName;
    this.passwordHashed = passwordHashed;
    this.status = status;
    this.createdAt = new Date();
  }

  static fromData(data: any){
    const instance = new this(
        data.userName,
        data.passwordHashed,
        data.status,
    )
    instance.createdAt = data.createdAt
    instance.modifiedAt = data.modifiedAt

    return instance
  }
}
