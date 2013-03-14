class nv.Game
  constructor: () ->
    @rootModel = new nv.Model
    @scenes = []
    @sceneClasses = {}
    @engines = {}

    canvas = new gleam.Canvas
    canvas.setSize nv.gameConfig.canvas.width, nv.gameConfig.canvas.height
    canvas.setStyle property, value for property, value of nv.gameConfig.canvas.css
    document.body.appendChild canvas.source
    
    for engine in nv.gameConfig.enginesToLoad
      #klass = "nv." + engine[0].toUpperCase() + engine.slice(1) + "Engine"
      #@registerEngine getClass(klass) 
      @registerEngine engine

    for name of nv.gameConfig.scenes
      klass = "scenes." + name[0].toUpperCase() + name.slice(1)
      @registerScene klass, getClass(klass)

    @rootModel.setMany
      canvas: canvas
      gamepad: nv.gamepad()

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
    @scenes.push new @sceneClasses['scenes.' + name] name, this, @rootModel, args...

  closeScene: (name) ->
    name = name ? @scenes[@scenes.length - 1].constructor.name
    for scene, index in @scenes
      if scene instanceof @sceneClasses[name]
        scene.destroy()
        @scenes.splice index, 1
    
  start: (scene) ->
    @openScene scene
