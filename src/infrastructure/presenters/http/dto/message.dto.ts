import { IsNotEmpty, IsString } from 'class-validator';

export class MessageDTO {
  @IsString()
  @IsNotEmpty()
  sender: string;

  @IsString()
  @IsNotEmpty()
  chatRoomId: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  timestamp: string;
}
