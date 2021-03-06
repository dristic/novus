class nv.DebugEngine extends nv.Engine
  constructor: (scene) ->
    super scene
    
    @messageLog = []

    fire = scene.fire
    scene.fire = () =>
      args = Array.prototype.slice.call arguments, 0
      @log "[EVENT] - #{args[0]}" + if args[1] isnt undefined then " - #{args[1].constructor.name}" else ""

      fire.call scene, arguments...

    send = scene.send
    scene.send = () =>
      args = Array.prototype.slice.call arguments, 0
      @log "[EVENT (Immediate)] - #{args[0]}" + if args[1] isnt undefined then " - #{args[1].constructor.name}" else ""

      send.call scene, arguments...

  log: (args...) ->
    nv.log args...
