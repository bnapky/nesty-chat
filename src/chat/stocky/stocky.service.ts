import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { ChatGateway } from '../chat.gateway';
import * as amqp from 'amqplib/callback_api';
import { Channel, Connection } from 'amqplib/callback_api';
import { MessagePayload } from '../message-payload';

let channel: Channel;

@Injectable()
export class StockyService {

    private readonly queue = 'stocky';
    private readonly commandQueue = 'stocky-command';

    constructor(
        @Inject(forwardRef(() => ChatGateway))
        private gateway: ChatGateway) {

        const service = this;
        amqp.connect('amqp://localhost', (error0, connection: Connection) => {
            if (error0) {
                throw error0;
            }

            connection.createChannel((error1, ch: Channel) => {
                if (error1) {
                    throw error1;
                }

                channel = ch;
                ch.assertQueue(service.queue, { durable: false });
                ch.assertQueue(service.commandQueue, { durable: false });

                ch.consume(service.queue, (msg) => {
                    const { quote, room, code } = JSON.parse(msg.content.toString());
                    const text = quote == 'N/D' ? `Invalid stock quote: ${code}.` : `${code} quote is $${quote} per share`;
                    const messagePayload: MessagePayload = {
                        text,
                        timestamp: new Date(),
                        user: { userId: -1, username: 'stocky-bot' }
                    }

                    gateway.broadcastMessage(room, JSON.stringify(messagePayload));
                }, { noAck: true });
            });
        });
    }

    public send(code: string, args: any): void {
        if (!channel)
            return;

        channel.sendToQueue(this.commandQueue, Buffer.from(JSON.stringify({ code, args })));
    }
}
