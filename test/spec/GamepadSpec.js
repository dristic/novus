describe("nv.Gamepad", function () {
  var gamepad;

  beforeEach(function () {
    gamepad = nv.gamepad()
    gamepad.aliasKey('trigger', nv.Key.Space);
  });

  it("should be able to alias keys.", function () {
    expect(gamepad.trackers['trigger']).toNotEqual(null);
  });

  it("should be able to listen to buttons.", function () {
    var pass = false;
    gamepad.onButtonPress('trigger', function () {
      pass = true;
    });

    gamepad.fireButton('trigger');

    expect(pass).toEqual(true);
  });

  it('should be able to unlisten to buttons.', function () {
    var pass = true,
        trigger = function () {
          pass = false;
        };

      gamepad.onButtonPress('trigger', trigger);
      gamepad.offButtonPress('trigger', trigger);
      gamepad.fireButton('trigger');

      expect(pass).toEqual(true);
  });
});