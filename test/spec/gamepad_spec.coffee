describe "nv.Gamepad", () ->
  gamepad = null

  beforeEach () ->
    gamepad = nv.gamepad()
    gamepad.aliasKey 'trigger', nv.Key.Space

  it "should be able to alias keys.", () ->
    expect(gamepad.trackers['trigger']).toNotEqual null

  it "should be able to listen to buttons.", () ->
    pass = false
    gamepad.onButtonPress 'trigger', () ->
      pass = true

    gamepad.fireButton 'trigger'

    expect(pass).toEqual true

  it "should be able to unlisten to buttons.", () ->
    pass = true
    trigger = () ->
      pass = false

    gamepad.onButtonPress 'trigger', trigger
    gamepad.offButtonPress 'trigger', trigger
    gamepad.fireButton 'trigger'

    expect(pass).toEqual true
