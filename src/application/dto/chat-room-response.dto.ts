export class ChatRoomDataDTO {
  id: string;
  name: string;
  isPublic: boolean;
  numberOfUsers: number;

  constructor(
    id: string,
    name: string,
    isPublic: boolean,
    numberOfUsers: number,
  ) {
    this.id = id;
    this.name = name;
    this.isPublic = isPublic;
    this.numberOfUsers = numberOfUsers;
  }
}
