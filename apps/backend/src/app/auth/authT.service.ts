import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthTDto } from './auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async register(authTDto: AuthTDto) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(authTDto.password, saltOrRounds);
    return this.usersService.createUser(authTDto.username, hashedPassword);
  }
}
