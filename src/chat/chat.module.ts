import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { JwtModule } from '@nestjs/jwt';
import { JWT } from '../auth/constants';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: JWT.SECRET,
      signOptions: { expiresIn: `${JWT.TTL}s` },
    })
  ],
  providers: [ChatGateway],
  exports: [ChatGateway],
})
export class ChatModule { }
