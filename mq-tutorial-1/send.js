

const amqp = require('amqplib/callback_api');
const config = require('./config');

amqp.connect(config.rabbit_mq, function(err, conn){

  if(err){
 	console.log('err',err);
   }
  
  conn.createChannel(function(err, ch){

  	let Q = 'Hello';
  	let message = "Hello World!";
  	ch.assertQueue(Q,{durable:false});
  	ch.sendToQueue(Q, Buffer.from(message));
  	console.log('Message Sent!!');
  });

  setTimeout(function() { conn.close(); process.exit(0) }, 500);

});

// idempotent, clients can make that same call repeatedly while producing the same result.

// To send, we must declare a queue for us to send to; then we can publish a message to the queue:

// Declaring a queue is idempotent - it will only be created if it doesn't exist already. The message content is a byte array, so you can encode whatever you like there.


