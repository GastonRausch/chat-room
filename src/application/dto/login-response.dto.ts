export class LoginResponseDTO {
  userId: string;
  accessToken: string;
  loggedAt: string;

  constructor(accessToken: string, userId: string, loggedAt: string) {
    this.accessToken = accessToken;
    this.userId = userId;
    this.loggedAt = loggedAt;
  }
}
