#<< key

requestFrame = window.requestAnimationFrame ? window.webkitRequestAnimationFrame ? window.mozRequestAnimationFrame ? window.oRequestAnimationFrame ? window.msRequestAnimationFrame ? (callback) -> return setTimeout(callback, 17)
cancelFrame = window.cancelRequestAnimationFrame ? window.webkitCancelAnimationFrame ? window.webkitCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame ? window.oCancelRequestAnimationFrame ? window.msCancelRequestAnimationFrame ? clearTimeout

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

  animationUpdate: (fps, func) ->
    lastTime = Date.now()

    update = () ->
      now = Date.now()
      delta = now - lastTime

      func delta

      requestFrame update

    requestFrame update