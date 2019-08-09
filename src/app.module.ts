import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

const modules = [
  TypeOrmModule.forRoot(),
  UserModule,
];

@Module({
  imports: modules,
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
