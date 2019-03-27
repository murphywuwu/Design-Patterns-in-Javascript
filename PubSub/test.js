const EventEmitter = require('events');
let ee = new EventEmitter();

ee.once('test', () => console.log('test'));

ee.on('removeListener', (eventName, listener) => {
  console.log(`eventName： ${eventName}`);
  listener.call(ee);
  listener.call(ee);
  listener.call(ee);
});

ee.emit('test');