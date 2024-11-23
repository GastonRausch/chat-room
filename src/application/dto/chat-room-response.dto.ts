export class ChatRoomResponseDTO {
    id: string;
    name: string;
    usersId: string[]
    isPublic: boolean
  
    constructor(id: string, name: string, usersId: string[], isPublic: boolean) {
      this.id = id;
      this.name = name;
      this.usersId = usersId;
      this.isPublic = isPublic
    }
  }
  