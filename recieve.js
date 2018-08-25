
// ˜˜˜˜∆˚¬√√∂∆∫ß∂ß∫µ ≤µçß˚∆ˆ¬∑∆˜˚≤µ´ ç˜ µ˜˜≥≤   ≤˜∑¨†ƒ©ˆ¨œ˙˚≥≤˜≤ µ≤µß∫


var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost:5672', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var Q = 'Hello';

    ch.assertQueue(Q, {durable: false});

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", Q);
    ch.consume(Q, function(msg) {
      console.log(" [x] Received %s", msg.content.toString());
    }, {noAck: true});

  });
});
