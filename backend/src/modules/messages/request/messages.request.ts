import { IsNotEmpty, IsOptional } from 'class-validator';

export class MessageRequest {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  senderId?: string;

  @IsNotEmpty()
  receiverEmail: string;

  @IsNotEmpty()
  content: string;
}
