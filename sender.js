const exchange = 'delay_exchange';
const queue = 'delay_queue';
const queueBinding = 'delay_exchange_queue_binding';

require('amqplib/callback_api')
    .connect('amqp://localhost', function (err, conn) {
        if (err != null) miscue(err);
        conn.createChannel( function(err,ch){
            if (err != null) bail(err);
            const headers = { 'x-delay': 10000 }; ///10 second delay
            ch.publish(exchange, queueBinding, new Buffer('hello 10sn from past'), { headers });
        });
    });

function miscue(err) {
    console.error(err);
    process.exit(1);
}
