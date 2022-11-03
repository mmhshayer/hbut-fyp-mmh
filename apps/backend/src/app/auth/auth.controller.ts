import { Body, Controller, Post } from '@nestjs/common';
import { Public } from '../../common/decorators/public.deco';
import { AuthTDto } from './auth.dto';
import { AuthenticationService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthenticationService) {}

  @Public()
  @Post('register')
  register(@Body() authTDto: AuthTDto) {
    return this.authService.register(authTDto);
  }

  @Post('login')
  login(@Body() authTDto: AuthTDto) {
    return this.authService.login(authTDto);
  }
}
