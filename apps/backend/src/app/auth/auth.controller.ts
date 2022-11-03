import { Body, Controller, Post } from '@nestjs/common';
import { PublicRoute } from '../../common/decorators';
import { AuthTDto } from './auth.dto';
import { AuthenticationService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthenticationService) {}

  @PublicRoute()
  @Post('register')
  register(@Body() authTDto: AuthTDto) {
    return this.authService.register(authTDto);
  }

  @PublicRoute()
  @Post('login')
  login(@Body() authTDto: AuthTDto) {
    return this.authService.login(authTDto);
  }
}
