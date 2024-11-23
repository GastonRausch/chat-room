export class UserResponseDTO {
  id: string;
  userName: string;
  createdAt: Date;

  constructor(id: string, userName: string, createdAt: Date) {
    this.id = id;
    this.userName = userName;
    this.createdAt = createdAt;
  }
}
