import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from '../../core/constants/jwt.const';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { AuthenticationService } from './authT.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, AuthenticationService, UsersModule],
})
export class AuthModule {}
