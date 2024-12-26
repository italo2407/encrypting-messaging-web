import { IsNotEmpty, IsOptional } from 'class-validator';

export class MessageRequest {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  senderId?: string;

  @IsNotEmpty()
  receiverId: string;

  @IsNotEmpty()
  content: string;
}
