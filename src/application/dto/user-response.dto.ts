export class UserResponseDTO {
  id: string;
  username: string;
  createdAt: Date;

  constructor(id: string, username: string, createdAt: Date) {
    this.id = id;
    this.username = username;
    this.createdAt = createdAt;
  }
}
