
// ˜˜˜˜∆˚¬√√∂∆∫ß∂ß∫µ ≤µçß˚∆ˆ¬∑∆˜˚≤µ´ ç˜ µ˜˜≥≤   ≤˜∑¨†ƒ©ˆ¨œ˙˚≥≤˜≤ µ≤µß∫


const amqp = require('amqplib/callback_api');
const config = require('./config');

amqp.connect(config.rabbit_mq, function(err, conn) {
  conn.createChannel(function(err, ch) {
    let Q = 'Hello';

    ch.assertQueue(Q, {durable: false});

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", Q);
    ch.consume(Q, function(msg) {
      console.log(" [x] Received %s", msg.content.toString());
    }, {noAck: true});

  });
});
