requestFrame = window.requestAnimationFrame ? window.webkitRequestAnimationFrame ? window.mozRequestAnimationFrame ? window.oRequestAnimationFrame ? window.msRequestAnimationFrame ? (callback) -> return setTimeout(callback, 17)
cancelFrame = window.cancelRequestAnimationFrame ? window.webkitCancelAnimationFrame ? window.webkitCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame ? window.oCancelRequestAnimationFrame ? window.msCancelRequestAnimationFrame ? clearTimeout

class nv.TimingEngine extends nv.Engine
  constructor: (scene, config) ->
    super scene, config

    @updating = false
    @config.afters = @config.afters ? []
    @config.befores = @config.befores ? []

    scene.on "engine:timing:start", nv.bind(this, @start)
    scene.on "engine:timing:stop", nv.bind(this, @stop)

    scene.on "engine:timing:register:after", (func) =>
      @config.afters.push func
    scene.on "engine:timing:register:before", (func) =>
      @config.befores.push func

  start: () ->
    lastTime = Date.now()
    @updating = true

    update = () =>
      now = Date.now()
      delta = now - lastTime
      delta /= 1000

      before delta for before in @config.befores

      @scene.update delta

      after delta for after in @config.afters

      if @updating
        requestFrame update

    requestFrame update

  stop: () ->
    @updating = false
