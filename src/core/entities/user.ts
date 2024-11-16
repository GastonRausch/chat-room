export class User {
  id: string;
  username: string;
  passwordHashed: string;
  status: string;
  createdAt: Date;

  constructor(
    id: string,
    username: string,
    passwordHashed: string,
    status: string = 'offline',
  ) {
    this.id = id;
    this.username = username;
    this.passwordHashed = passwordHashed;
    this.status = status;
    this.createdAt = new Date();
  }

  static fromData(data: any){
    const instance = new this(
        data.id,
        data.username,
        data.passwordHashed,
        data.status
    )
    return instance
  }
}
