import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoomDTO {
  @IsString()
  @IsNotEmpty()
  roomName: string;
}
