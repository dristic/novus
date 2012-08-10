#<< key

nv.extend = (other) ->
  this[key] = other[key] for key of other

nv.extend
  log: () ->
    console.log message for message in arguments

  keydown: (key, callback) ->
    $(document).on 'keydown', (event) ->
      if event.keyCode is key then callback()

  keyup: (key, callback) ->
    $(document).on 'keyup', (event) ->
      if event.keyCode is key then callback()

class Gamepad
  constructor: () ->
    @gamepad = navigator.webkitGamepad
    @state = {}

  aliasKey: (button, key) ->
    nv.keydown key, () =>
      @state[button] = true
    nv.keyup key, () =>
      @state[button] = false

  getState: () ->
    @state

nv.gamepad = () ->
  new Gamepad