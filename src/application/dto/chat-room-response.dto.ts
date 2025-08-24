export class ChatRoomDataDTO {
  id: string;
  name: string;
  isPublic: boolean;
  description: string;
  numberOfUsers: number;

  constructor(
    id: string,
    name: string,
    isPublic: boolean,
    numberOfUsers: number,
    description: string,
  ) {
    this.id = id;
    this.name = name;
    this.isPublic = isPublic;
    this.numberOfUsers = numberOfUsers;
    this.description = description;
  }
}
