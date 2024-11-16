import { IsNotEmpty, IsString } from "class-validator";

export class JoinRoomDTO {
    @IsString()
    @IsNotEmpty()
    userId: string
}