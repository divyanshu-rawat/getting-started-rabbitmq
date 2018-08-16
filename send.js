

const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, conn) => {
  conn.createChannel((err, ch) =>  {

  	let message = 'Divyanshu';

  	ch.assertQueue(message,{durable:false});

  	ch.sendToQueus(message, new Buffer('Hey!'));

  	console.log('Message Sent!!');

  });
});

// idempotent, clients can make that same call repeatedly while producing the same result.

// To send, we must declare a queue for us to send to; then we can publish a message to the queue: