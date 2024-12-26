import { IsNotEmpty } from 'class-validator';

export class UserRequest {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
