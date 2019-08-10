import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { UserModule } from '../user/user.module';
import { AuthController } from './controllers/auth.controller';
import { JWT } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';


@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: JWT.SECRET,
      signOptions: { expiresIn: `${JWT.TTL}s` },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule { }
