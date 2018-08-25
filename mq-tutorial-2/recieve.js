
// ˜˜˜˜∆˚¬√√∂∆∫ß∂ß∫µ ≤µçß˚∆ˆ¬∑∆˜˚≤µ´ ç˜ µ˜˜≥≤   ≤˜∑¨†ƒ©ˆ¨œ˙˚≥≤˜≤ µ≤µß∫


const amqp = require('amqplib/callback_api');
const config = require('./config');


amqp.connect(config.rabbit_mq, function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'task_queue';

    ch.assertQueue(q, {durable: true});
    ch.prefetch(1);
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    ch.consume(q, function(msg) {
      var secs = msg.content.toString().split('.').length - 1;

      console.log(" [x] Received %s", msg.content.toString());
      setTimeout(function() {
        console.log(" [x] Done");
        ch.ack(msg);
      }, secs * 1000);
    }, {noAck: false});
  });
});


// But we don't want to lose any tasks. If a worker dies, we'd like the task to be delivered to another worker.

// We have learned how to make sure that even if the consumer dies, the task isn't lost. But our tasks will still be lost if RabbitMQ server stops.

