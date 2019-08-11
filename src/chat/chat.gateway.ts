import { SubscribeMessage, WebSocketGateway, WsResponse, OnGatewayConnection } from '@nestjs/websockets';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection {
  handleConnection(client: any, ...args: any[]) {
    console.log('hello world', client);
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): WsResponse<string> {

    return { event: 'message', data: payload };
  }
}
  