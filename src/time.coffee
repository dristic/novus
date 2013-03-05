requestFrame = window.requestAnimationFrame ? window.webkitRequestAnimationFrame ? window.mozRequestAnimationFrame ? window.oRequestAnimationFrame ? window.msRequestAnimationFrame ? (callback) -> return setTimeout(callback, 17)
cancelFrame = window.cancelRequestAnimationFrame ? window.webkitCancelAnimationFrame ? window.webkitCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame ? window.oCancelRequestAnimationFrame ? window.msCancelRequestAnimationFrame ? clearTimeout

class nv.TimingEngine extends nv.Engine
  constructor: (scene, config) ->
    super scene, config

    @updating = false

    scene.on "engine:timing:start", nv.bind(this, @start)
    scene.on "engine:timing:stop", nv.bind(this, @stop)

  start: () ->
    lastTime = Date.now()

    update = () =>
      now = Date.now()
      delta = now - lastTime
      delta /= 1000

      @scene.update delta

      requestFrame update

    requestFrame update