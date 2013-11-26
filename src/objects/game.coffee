class nv.Game
  constructor: (config) ->
    @rootModel = new nv.Model
    @scenes = []
    @sceneClasses = {}
    @engines = {}
    
    if config.engines?
      for engine in config.engines
        @registerEngine engine

    if config.scenes?
      for scene of config.scenes
        @registerScene scene

    @rootModel.setMany
      config: config

  model: () ->
    @rootModel

  registerEngine: (klass, initializer) ->
    name = klass.name
    @engines[name] =
      klass: klass
      initializer: initializer

  registerScene: (klass) ->
    name = klass.name
    @sceneClasses[name] = klass

  openScene: (name, args...) ->
    @scenes.push new @sceneClasses[name] name, this, @rootModel, args...
    @scenes[@scenes.length - 1].on "scene:close", () =>
      @closeScene name

  closeScene: (name) ->
    unless name?
      if @scenes.length > 0
        name = @scenes[@scenes.length - 1].constructor.name
      else
        nv.log "Unable to close scene: ", name
        return false

    for scene, index in @scenes
      if scene instanceof @sceneClasses[name]
        scene.destroy()
        @scenes.splice index, 1
    
  start: (scene) ->
    @openScene scene
