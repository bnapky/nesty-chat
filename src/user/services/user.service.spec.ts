import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { User } from '../entities/user.entity';
import { userRepositoryMock } from './user-repository.mock';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getRepositoryToken(User), useClass: userRepositoryMock },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to compare passwords with a hash properly', async () => {
    const hash = '$2b$10$5zsNmEAg/MwVaduxGCceMO0e05GG7eqNN1q06M9HcTQfVisWo22Uy';

    expect(await service.compareHash('Password123!', hash)).toBe(true);
    expect(await service.compareHash('wrong password', '$2b$10$5zsNmEAg/MwVaduxGCceMO0e05GG7eqNN1q06M9HcTQfVisWo22Uy')).toBe(false);
  });

  it('should insert to database when registering a user', async () => {
    await service.register('napky', 'Password123!');

    expect((service as any).repo.create.mock.calls.length).toBe(1);
    expect((service as any).repo.insert.mock.calls.length).toBe(1);
  });

  it('should hash password when registering', async () => {
    (service as any).hash = jest.fn(x => x);
    service.register('napky', 'Password123!');

    expect((service as any).hash.mock.calls.length).toBe(1);
  });
});
