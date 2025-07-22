export abstract class ChatRoomUsersRepository {
  abstract userJoinRoom(roomId: string, userId: string): Promise<boolean>;
}
