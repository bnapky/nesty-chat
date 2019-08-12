import { SubscribeMessage, WebSocketGateway, WsResponse, OnGatewayConnection, WebSocketServer, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { JwtService } from '@nestjs/jwt';

import { DecodedJwt } from '../auth/strategies/decoded-jwt';
import { OnlineUser } from './online-user';
import { ACTIONS } from './constants';
import { UserService } from '../user/services/user.service';
import { MessagePayload } from './message-payload';
import { StockyService } from './stocky/stocky.service';
import { ModuleRef } from '@nestjs/core';


@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  stockyService: StockyService;
  users: OnlineUser[] = [];
  messages: MessagePayload[][] = [[], [], []];
  limit = 50;

  //command dictionary, this could be refactored in a separate file for easier extensibility.
  commands = {
    stock: (code, args) => this.stockyService.send(code, args)
  }

  constructor(private jwtService: JwtService, private userService: UserService, private moduleRef: ModuleRef) { }

  async handleConnection(client: Socket, ...args: any[]): Promise<void> {
    try {
      const decoded: DecodedJwt = await this.jwtService.verifyAsync(client.handshake.query.token);
      this.users.push({ userId: decoded.sub, username: decoded.username, client });
      this.broadcastOnlineUsers();
      client.join('0');
    } catch (e) {
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    if (!client.handshake.query.token)
      return;

    this.removeUser(client);
  }

  @SubscribeMessage(ACTIONS.MESSAGE)
  handleMessage(client: Socket, payload: string): void {
    const messagePayload: MessagePayload = JSON.parse(payload);

    if (messagePayload.text.startsWith('/')) {
      const command = messagePayload.text.split('/')[1];
      this.handleCommand(client, command);
      return;
    }

    const room = this.getClientRoom(client);
    this.broadcastMessage(+room, payload);
  }

  @SubscribeMessage(ACTIONS.MESSAGE_LIST)
  handleMessageList(client: Socket, payload: any): void {
    const room = +this.getClientRoom(client);
    client.emit(ACTIONS.MESSAGE_LIST, JSON.stringify(this.messages[room]));
  }

  @SubscribeMessage(ACTIONS.ONLINE_USERS)
  async handleUserList(client: Socket, payload: any): Promise<void> {
    const users = await this.getOnlineUsers();
    client.send(ACTIONS.ONLINE_USERS, JSON.stringify(users));
  }

  @SubscribeMessage(ACTIONS.ROOM)
  async handleJoinRoom(client: Socket, payload: string): Promise<void> {
    const messagePayload: MessagePayload = JSON.parse(payload);
    const room = this.getClientRoom(client);

    if (room == messagePayload.text)
      return;

    client.leaveAll();
    client.join(messagePayload.text + '');
  }

  onModuleInit() {
    this.stockyService = this.moduleRef.get(StockyService);
  }

  private getClientRoom = (client: Socket): string => Object.keys(client.rooms).find(k => k !== client.id);

  private async removeUser(client: Socket) {
    try {
      const decoded: DecodedJwt = await this.jwtService.verifyAsync(client.handshake.query.token);
      this.users = this.users.filter(i => decoded.sub !== i.userId);
      this.broadcastOnlineUsers();
    } catch (e) { }
  }

  private async broadcastOnlineUsers() {
    const users = await this.getOnlineUsers();
    this.server.emit(ACTIONS.ONLINE_USERS, JSON.stringify(users));
  }

  broadcastMessage(room: number, payload: string) {
    this.messages[room] = [JSON.parse(payload), ...this.messages[room]];

    if (this.messages[room].length > this.limit)
      this.messages[room] = this.messages[room].slice(0, this.limit)

    this.server.to(room + '').emit(ACTIONS.MESSAGE, payload);
  }

  private async getOnlineUsers(): Promise<OnlineUser[]> {
    const users = await this.userService.find();
    return users.map(user => ({ username: user.username, userId: user.id, online: Boolean(this.users.find(x => x.userId == user.id)) }));
  }

  private handleCommand(client: Socket, command: string) {
    const [base, argument] = command.split('=');
    const room = this.getClientRoom(client);

    if (base in this.commands) {
      this.commands[base](argument, { room });
    }
  }
}
