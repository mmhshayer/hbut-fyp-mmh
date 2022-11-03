import { IsString } from 'class-validator';

export class AuthTDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
