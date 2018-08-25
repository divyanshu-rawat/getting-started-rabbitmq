

const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost:5672', function(err, conn){
  conn.createChannel((err, ch) =>  {

  	let Q = 'Hello';
  	let message = "Hello World!";

  	ch.assertQueue(Q,{durable:false});

  	ch.sendToQueue(Q, Buffer.from(message));

  	console.log('Message Sent!!');

  	setTimeout(function() { conn.close(); process.exit(0) }, 500);

  });



});

// idempotent, clients can make that same call repeatedly while producing the same result.

// To send, we must declare a queue for us to send to; then we can publish a message to the queue:

// Declaring a queue is idempotent - it will only be created if it doesn't exist already. The message content is a byte array, so you can encode whatever you like there.


