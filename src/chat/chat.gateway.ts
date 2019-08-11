import { SubscribeMessage, WebSocketGateway, WsResponse, OnGatewayConnection, WebSocketServer, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { DecodedJwt } from 'src/auth/strategies/decoded-jwt';
import { OnlineUser } from './online-user';
import { COMMANDS } from './constants';
import { UserService } from '../user/services/user.service';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  users: OnlineUser[] = [];

  constructor(private jwtService: JwtService, private userService: UserService) { }

  async handleConnection(client: Socket, ...args: any[]): Promise<void> {
    try {
      const decoded: DecodedJwt = await this.jwtService.verifyAsync(client.handshake.query.token);
      this.users.push({ userId: decoded.sub, username: decoded.username, client });
      this.broadcastOnlineUsers();
    } catch (e) {
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    if (!client.handshake.query.token)
      return;

    this.removeUser(client);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): WsResponse<string> {
    return { event: 'message', data: payload };
  }

  @SubscribeMessage(COMMANDS.ONLINE_USERS)
  async handleUserList(client: Socket, payload: any): Promise<void> {
    const users = await this.getOnlineUsers();
    client.send(COMMANDS.ONLINE_USERS, JSON.stringify(users));
  }

  private async removeUser(client: Socket) {
    try {
      const decoded: DecodedJwt = await this.jwtService.verifyAsync(client.handshake.query.token);
      this.users = this.users.filter(i => decoded.sub !== i.userId);
      this.broadcastOnlineUsers();
    } catch (e) { }
  }

  private async broadcastOnlineUsers() {
    const users = await this.getOnlineUsers();
    this.server.emit(COMMANDS.ONLINE_USERS, JSON.stringify(users));
  }

  private async getOnlineUsers(): Promise<OnlineUser[]> {
    const users = await this.userService.find();
    return users.map(user => ({ username: user.username, userId: user.id, online: Boolean(this.users.find(x => x.userId == user.id)) }));
  }
}
