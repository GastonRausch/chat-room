import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRoomDTO {
  @IsString()
  @IsNotEmpty()
  roomName: string;

  @IsOptional()
  @IsBoolean()
  isPublic: boolean = false
}
