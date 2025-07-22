import { IsOptional } from 'class-validator';

export class SendMessageDTO {
  @IsOptional()
  content: string | null;
}
