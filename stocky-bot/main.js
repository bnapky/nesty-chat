const CSV = require('csv-string');
const amqp = require('amqplib/callback_api');
const axios = require('axios');
const queue = 'stocky';
const commandQueue = 'stocky-command';

amqp.connect('amqp://localhost', (error0, connection) => {
    if (error0) {
        throw error0;
    }

    connection.createChannel((error1, channel) => {
        if (error1) {
            throw error1;
        }

        const msg = 'howdy mowdy!';

        channel.assertQueue(commandQueue, {
            durable: false
        });

        channel.assertQueue(queue, {
            durable: false
        });

        channel.consume(commandQueue, async (data) => {
            const { code, args } = JSON.parse(data.content.toString());
            const url = `https://stooq.com/q/l/?s=${code}&f=sd2t2ohlcv&h&e=csv`;

            console.log('Fetching: ' + url);
            
            const response = await axios.get(url);
            const arr = CSV.parse(response.data);
            const quote = arr[1][6];
            
            channel.sendToQueue(queue, Buffer.from(JSON.stringify({...args, quote, code})));
        }, { noAck: true });

        console.log('Stocky Bot: Awaiting messages.');
    });
});
