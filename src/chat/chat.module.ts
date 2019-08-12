import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ChatGateway } from './chat.gateway';
import { JWT } from '../auth/constants';
import { UserModule } from '../user/user.module';

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
