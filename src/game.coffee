class nv.Game
  constructor: () ->
    @rootModel = new nv.Model
    @scenes = []
    @sceneClasses = {}
    @engines = {}

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
    @sceneClasses[name] = klass

  openScene: (name, args...) ->
    @scenes.push new @sceneClasses[name] this, args...
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
