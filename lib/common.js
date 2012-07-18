var nv;

nv = {
  extend: function(object, other) {
    var key, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = other.length; _i < _len; _i++) {
      key = other[_i];
      _results.push(object[key] = other[key]);
    }
    return _results;
  }
};
