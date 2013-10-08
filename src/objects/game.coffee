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
      for name of config.scenes
        scene = name[0].toUpperCase() + name.toLowerCase().slice(1)
        klass = "scenes." + scene
        @registerScene scene, getClass(klass)

    @rootModel.setMany
      config: config

  model: () ->
    @rootModel

  registerEngine: (klass, initializer) ->
    name = klass.name
    @engines[name] =
      klass: klass
      initializer: initializer

  registerScenes: (object) ->
    for key of object
      @registerScene key, object[key]

  registerScene: (name, klass) ->
    console.log "Registering", name, klass
    @sceneClasses[name] = klass

  openScene: (name, args...) ->
    @scenes.push new @sceneClasses[name] name, this, @rootModel, args...
    @scenes[@scenes.length - 1].on "scene:close", () =>
      @closeScene name

  closeScene: (name) ->
    name = name ? @scenes[@scenes.length - 1].constructor.name
    for scene, index in @scenes
      if scene instanceof @sceneClasses[name]
        scene.destroy()
        @scenes.splice index, 1
    
  start: (scene) ->
    @openScene scene
