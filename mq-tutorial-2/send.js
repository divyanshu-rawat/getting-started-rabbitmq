

// The main idea behind Work Queues (aka: Task Queues) is to avoid doing a resource-intensive task immediately,
// and having to wait for it to complete

// Instead we schedule the task to be done later. We encapsulate a task as a message and send it to a queue. 
// A worker process running in the background will pop the tasks and eventually execute the job.
// When you run many workers the tasks will be shared between them.


// We don't have a real-world task, like images to be resized or pdf files to be rendered,
// so let's fake it by just pretending we're busy - by using the setTimeout method. 

// Work Queue that will be used to distribute time-consuming tasks among multiple workers.

const amqp = require('amqplib/callback_api');
const config = require('./config');

amqp.connect(config.rabbit_mq, function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'task_queue';
    var msg = process.argv.slice(2).join(' ') || "Hello World!";

    ch.assertQueue(q, {durable: true});
    ch.sendToQueue(q, new Buffer(msg), {persistent: true});
    console.log(" [x] Sent '%s'", msg);
  });
  setTimeout(function() { conn.close(); process.exit(0) }, 500);
});


// idempotent, clients can make that same call repeatedly while producing the same result.

// To send, we must declare a queue for us to send to; then we can publish a message to the queue:

// Declaring a queue is idempotent - it will only be created if it doesn't exist already. The message content is a byte array, so you can encode whatever you like there.


