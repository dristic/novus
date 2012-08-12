(function() {
  var Debug;

  Debug = (function() {

    Debug.prototype.html = "<div id=\"debug\"></div>";

    function Debug() {}

    Debug.prototype.log = function() {
      var messages;
      messages = arguments;
      return console.log(arguments);
    };

    return Debug;

  })();

  $(function() {
    nv.Debug = new Debug;
    return nv.log = nv.Debug.log;
  });

}).call(this);
