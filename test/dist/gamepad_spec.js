(function() {
  describe("nv.Gamepad", function() {
    var gamepad;
    gamepad = null;
    beforeEach(function() {
      gamepad = nv.gamepad();
      return gamepad.aliasKey('trigger', nv.Key.Space);
    });
    it("should be able to alias keys.", function() {
      return expect(gamepad.trackers['trigger']).toNotEqual(null);
    });
    it("should be able to listen to buttons.", function() {
      var pass;
      pass = false;
      gamepad.onButtonPress('trigger', function() {
        return pass = true;
      });
      gamepad.fireButton('trigger');
      return expect(pass).toEqual(true);
    });
    return it("should be able to unlisten to buttons.", function() {
      var pass, trigger;
      pass = true;
      trigger = function() {
        return pass = false;
      };
      gamepad.onButtonPress('trigger', trigger);
      gamepad.offButtonPress('trigger', trigger);
      gamepad.fireButton('trigger');
      return expect(pass).toEqual(true);
    });
  });

}).call(this);
