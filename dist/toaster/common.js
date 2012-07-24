(function() {

  nv.extend = function(other) {
    var key, _results;
    _results = [];
    for (key in other) {
      _results.push(this[key] = other[key]);
    }
    return _results;
  };

  nv.extend({
    log: function() {
      var message, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = arguments.length; _i < _len; _i++) {
        message = arguments[_i];
        _results.push(console.log(message));
      }
      return _results;
    },
    keydown: function(key, callback) {
      return $(document).on('keydown', function(event) {
        if (event.keyCode === key) {
          return callback();
        }
      });
    },
    keyup: function(key, callback) {
      return $(document).on('keyup', function(event) {
        if (event.keyCode === key) {
          return callback();
        }
      });
    }
  });

}).call(this);
