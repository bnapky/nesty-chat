import { Test, TestingModule } from '@nestjs/testing';
import { UserModule } from '../user.module';
import { UserService } from '../services/user.service';
import { UserController } from './user.controller';

describe('User Controller', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: UserService, useValue: {} },
        UserModule,
      ],
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
