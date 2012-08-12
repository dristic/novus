(function() {
  var EventDispatcher;

  EventDispatcher = (function() {

    function EventDispatcher() {
      this.listeners = [];
    }

    EventDispatcher.prototype.on = function(event, func) {
      var listeners;
      listeners = this.listeners[event];
      if (!(listeners instanceof Array)) {
        listeners = [];
      }
      listeners.push(func);
      this.listeners[event] = listeners;
      return this;
    };

    EventDispatcher.prototype.fire = function(event, data) {
      var listener, listeners, _i, _len, _results;
      data = data != null ? data : {};
      data.data = data;
      data.type = event;
      listeners = this.listeners[event];
      if (listeners instanceof Array) {
        _results = [];
        for (_i = 0, _len = listeners.length; _i < _len; _i++) {
          listener = listeners[_i];
          _results.push(listener(data));
        }
        return _results;
      }
    };

    EventDispatcher.prototype.off = function(event, func) {
      if (!this.listeners[event] instanceof Array) {

      } else {
        if (this.listeners[event].indexOf(func(!0))) {
          this.listeners[event].splice(this.listeners[event].indexOf(func), 1);
        }
      }
      return this;
    };

    return EventDispatcher;

  })();

  window.EventDispatcher = EventDispatcher;

}).call(this);
