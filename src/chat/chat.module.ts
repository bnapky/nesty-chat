import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ChatGateway } from './chat.gateway';
import { JWT } from '../auth/constants';
import { UserModule } from '../user/user.module';
import { StockyService } from './stocky/stocky.service';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: JWT.SECRET,
      signOptions: { expiresIn: `${JWT.TTL}s` },
    })
  ],
  providers: [ChatGateway, StockyService],
  exports: [ChatGateway, StockyService],
})
export class ChatModule { }
