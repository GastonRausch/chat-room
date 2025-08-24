export class Login {
  userId: string;
  token: string;
  loggedAt: string;

  constructor() {}

  public static create(userId: string, token: string) {
    const instance = new this();
    instance.userId = userId;
    instance.token = token;
    instance.loggedAt = new Date().toString();
    return instance;
  }
}
