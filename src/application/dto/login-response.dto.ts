export class LoginResponseDTO {
  user_id: string;
  access_token: string;

  constructor(access_token: string, user_id: string) {
    this.access_token = access_token;
    this.user_id = user_id;
  }
}
