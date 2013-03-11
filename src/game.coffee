class nv.Game
  constructor: (config) ->
    @currentScene = null
    @sceneClasses = {}
    @engines = []

    glcanvas = gl()
    glcanvas.size config.canvas.width, config.canvas.height
    glcanvas.background config.canvas.backgroundColor
    glcanvas.fullscreen() if config.canvas.fullscreen

    document.body.appendChild glcanvas

    for engine in config.engines
      klass = "nv." + engine[0].toUpperCase() + engine.slice(1) + "Engine"
      @registerEngine getClass(klass) 

    for name of config.scenes
      klass = "scenes." + name[0].toUpperCase() + name.slice(1)
      @registerScene klass, getClass(klass)

    return glcanvas

  registerEngine: (klass) ->
    @engines.push klass

  registerScene: (name, klass) ->
    @sceneClasses[name] = klass

  openScene: (name, args...) ->
    @closeScene()
    @currentScene = new @sceneClasses['scenes.' + name] name, this, args...

  closeScene: () ->
    @currentScene.destroy() unless not @currentScene
    