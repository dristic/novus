(function() {
  var AsteroidController, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AsteroidController = (function(_super) {

    __extends(AsteroidController, _super);

    function AsteroidController() {
      AsteroidController.__super__.constructor.apply(this, arguments);
      this.speed = 0.3;
      this.direction = (Math.random() * Math.PI) - (Math.PI / 2);
    }

    AsteroidController.prototype.update = function(dt) {
      this.asset.x += Math.sin(this.direction) * this.speed;
      return this.asset.y += Math.cos(this.direction) * this.speed;
    };

    return AsteroidController;

  })(nv.Controller);

  nv.controllers = (_ref = nv.controllers) != null ? _ref : {};

  nv.controllers.AsteroidController = AsteroidController;

}).call(this);
