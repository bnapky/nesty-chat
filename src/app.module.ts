import { Module } from '@nestjs/common';
import { AppService } from './app.service';

import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

const modules = [
  TypeOrmModule.forRoot(),
  UserModule,
  AuthModule
];

@Module({
  imports: modules,
  controllers: [],
  providers: [AppService],
})
export class AppModule { }
