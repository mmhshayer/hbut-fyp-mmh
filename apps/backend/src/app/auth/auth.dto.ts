import { IsEmail, IsString } from 'class-validator';

export class AuthTDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class RegisterDto extends AuthTDto {
  @IsString()
  name: string;
}
