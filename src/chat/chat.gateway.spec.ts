import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ChatGateway } from './chat.gateway';
import { UserService } from '../user/services//user.service';
import { UserServiceMock } from '../user/services/user.mock.service';
import { JwtServiceMock } from '../auth/services/jwt.mock.service';
import { Socket } from 'socket.io';

describe('ChatGateway', () => {
  let gateway: ChatGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: JwtService, useClass: JwtServiceMock },
        { provide: UserService, useClass: UserServiceMock },
        ChatGateway
      ],
    }).compile();

    gateway = module.get<ChatGateway>(ChatGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  it('should remove user on handleDisconnect', () => {
    (gateway as any).removeUser = jest.fn(x => x);
    gateway.handleDisconnect({
      handshake: { query: { token: '1233' } }
    } as Socket);

    expect((gateway as any).removeUser.mock.calls.length).toBe(1);
  });

  it('should broadcast online users when adding a connection', async () => {
    (gateway as any).broadcastOnlineUsers = jest.fn(x => x);

    await gateway.handleConnection({
      handshake: { query: { token: '1233' } }
    } as Socket);

    expect((gateway as any).broadcastOnlineUsers.mock.calls.length).toBe(1);
  });

  it('should broadcast online users when removing a connection', async () => {
    (gateway as any).broadcastOnlineUsers = jest.fn(x => x);

    await (gateway as any).removeUser({
      handshake: { query: { token: '1233' } }
    } as Socket);

    expect((gateway as any).broadcastOnlineUsers.mock.calls.length).toBe(1);
  });

  it('server should emit values when broadcasting online users ', async () => {
    (gateway as any).server = { emit: jest.fn(x => x) };

    await (gateway as any).broadcastOnlineUsers();

    expect((gateway as any).server.emit.mock.calls.length).toBe(1);
  });
});
