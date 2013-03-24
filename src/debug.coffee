class nv.DebugEngine extends nv.Engine
  constructor: (scene) ->
    @messageLog = []

    fire = scene.fire
    scene.fire = () =>
      args = Array.prototype.slice.call arguments, 0
      @log "[EVENT] - #{args[0]}" + if args[1] isnt undefined then " - #{args[1].constructor.name}" else ""

      fire.call scene, arguments...

  log: () ->
    messages = Array.prototype.slice.call arguments, 0
    message = ""
    message += part.toString() for part in messages
    @messageLog.push message
    console.log message