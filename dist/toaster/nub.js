(function() {
  var Connection;

  Connection = (function() {

    function Connection() {
      var _this = this;
      this.connection = this.connectToChannel('novus');
      this.connection.on('connect', function() {
        return console.log('Connected!');
      });
      this.connection.on('join', function(user) {
        return console.log(user);
      });
      this.connection.on('message', function(message) {
        return _this.handleMessage(message);
      });
    }

    Connection.prototype.handleMessage = function(message) {
      return console.log(message);
    };

    Connection.prototype.connectToChannel = function(channel) {
      return io.connect('http://pubsub.pubnub.com', {
        channel: channel,
        publish_key: 'pub-c54880a5-ba99-4836-a084-08f57b4b5333',
        subscribe_key: 'sub-3129de73-8f26-11e1-94c8-1543525cae6d',
        ssl: false
      });
    };

    Connection.prototype.auth = function(user) {
      var _this = this;
      return $.post('http://localhost:3000', {
        user: user
      }, function(response) {
        var token;
        token = JSON.parse(response).token;
        _this.connection = _this.connectToChannel(token);
        return _this.connection.send('Hello server!');
      });
    };

    return Connection;

  })();

  window.nub = function() {
    return new Connection();
  };

}).call(this);
