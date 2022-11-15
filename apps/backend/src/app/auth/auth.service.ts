import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AuthTDto, RegisterDto } from './auth.dto';

import {
  compareDtoWithDbPassword,
  hashPassword,
} from '../../core/utils/passwords.utils';
import { IAuthPayload } from './payload.interface';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async register(registerDto: RegisterDto) {
    const { password, ...rest } = registerDto;
    const hashedPassword = hashPassword(password);
    const user = await this.usersService.createUser(
      rest as User,
      hashedPassword
    );
    return await this.login({ email: user.email, password });
  }

  async login(authTDto: AuthTDto) {
    const user = await this.usersService.findOneByEmail(authTDto.email, false);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isValidPassword = compareDtoWithDbPassword(
      authTDto.password,
      user.password
    );
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid password');
    }
    /*
      WARNING: this sets the payload (user) for authentication
    */
    const payload: IAuthPayload = {
      _id: user.id,
      email: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
