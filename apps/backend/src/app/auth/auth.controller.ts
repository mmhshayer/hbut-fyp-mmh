import { Body, Controller, Post } from '@nestjs/common';
import { AuthTDto } from './auth.dto';
import { AuthenticationService } from './authT.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('register')
  register(@Body() authTDto: AuthTDto) {
    return this.authService.register(authTDto);
  }
}
