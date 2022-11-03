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

  async login(authTDto: AuthTDto) {
    const user = await this.usersService.findOneByUsername(authTDto.username);
    if (!user) {
      throw new Error('User not found');
    }
    const isValidPassword = await bcrypt.compare(
      authTDto.password,
      user.password
    );
    if (!isValidPassword) {
      throw new Error('Invalid password');
    }
    const { password: _, ...userWithoutPassword } = user;
    return {
      access_token: this.jwtService.sign(userWithoutPassword),
    };
  }
}
