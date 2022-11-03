import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthTDto } from './auth.dto';
import * as bcrypt from 'bcrypt';
import {
  comparePassword,
  hashPassword,
} from '../../core/utils/passwords.utils';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async register(authTDto: AuthTDto) {
    const hashedPassword = hashPassword(authTDto.password);
    return this.usersService.createUser(authTDto.username, hashedPassword);
  }

  async login(authTDto: AuthTDto) {
    const user = await this.usersService.findOneByUsername(authTDto.username);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isValidPassword = comparePassword(authTDto.password, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid password');
    }
    /*
      WARNING: this sets the payload (user) for authentication
    */
    const payload = {
      _id: user.id,
      username: user.username,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}