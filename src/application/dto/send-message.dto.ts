import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class SendMessageDTO {
    @IsString()
    @IsNotEmpty()
    senderId: string;

    @IsOptional()
    content: string | null;
}