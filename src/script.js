window.onload = function () {
  console.log("Also, hello world!");

  var canvas = document.querySelector('canvas'),
      context = canvas.getContext('2d');

  context.fillStyle = '#000';
  context.fillRect(10, 10, 100, 150);

  // var conn = PUBNUB.init({
  //   publish_key: 'pub-c54880a5-ba99-4836-a084-08f57b4b5333',
  //   subscribe_key: 'sub-3129de73-8f26-11e1-94c8-1543525cae6d',
  //   ssl: false,
  //   cipher_key: null,
  //   origin: 'pubsub.pubnub.com'
  // });
  
  // // LISTEN FOR MESSAGES
  // conn.subscribe({
  //     channel    : "hello_world",      // CONNECT TO THIS CHANNEL.
 
  //       restore    : false,              // STAY CONNECTED, EVEN WHEN BROWSER IS CLOSED
  //                                      // OR WHEN PAGE CHANGES.
 
  //       callback   : handleMessage,
 
  //       disconnect : function() {        // LOST CONNECTION.
  //         console.log(
  //             "Connection Lost." +
  //             "Will auto-reconnect when Online."
  //           );
  //       },
 
  //       reconnect  : function() {        // CONNECTION RESTORED.
  //         console.log("And we're Back!");
  //       },
 
  //       connect    : function() {        // CONNECTION ESTABLISHED.
  //       console.log('connected');
  //     }
  // });
  
  // function handleMessage(message) {
  //   console.log(message.some_text);
  // };
  
  // conn.publish({
  //   channel: 'hello_world',
  //   message: {
  //     some_text: 'Hey there'
  //   }
  // });
};