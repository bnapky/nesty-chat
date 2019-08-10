import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

import { JwtServiceMock } from './jwt.mock.service';
import { UserService } from '../../user/services/user.service';
import { UserServiceMock } from '../../user/services/user.mock.service';
import { User } from '../../user/entities/user.entity';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: JwtService, useClass: JwtServiceMock },
        { provide: UserService, useClass: UserServiceMock },
        AuthService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    (service as any).userService.findOne = jest.fn(x => ({ username: x.where.username }));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a jwt when login in a user', async () => {
    const user = new User();
    user.username = 'napky';
    user.password = 'Password123!';

    const result = await service.login(user);

    expect(result.access_token).toBeTruthy();
    expect((service as any).jwtService.sign.mock.calls.length).toBe(1);
  });

  it('should validate password strength properly', () => {
    expect(service.isPasswordValid('onlylowercase')).toBe(false);
    expect(service.isPasswordValid('ONLYUPPERCASE')).toBe(false);
    expect(service.isPasswordValid('NoNumericCharacter')).toBe(false);
    expect(service.isPasswordValid('Short1')).toBe(false);

    expect(service.isPasswordValid('Password123!')).toBe(true);
  });

  it('should validate user properly', async () => {
    (service as any).userService.compareHash = jest.fn().mockReturnValue(true);

    const result = await service.validateUser('napky', 'Password123!');

    expect((service as any).userService.findOne.mock.calls.length).toBe(1);
    expect((service as any).userService.compareHash.mock.calls.length).toBe(1);
    expect(result).toBeTruthy();
    expect(result.username).toBe('napky');
  });

  it('should return null on invalid password when validating user', async () => {
    (service as any).userService.compareHash = jest.fn().mockReturnValue(false);
    expect(await service.validateUser('napky', 'Password123!')).toBeNull();
  });
});
