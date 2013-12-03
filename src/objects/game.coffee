class nv.Game
  constructor: (@config) ->
    @scenes = []
    @factory = new nv.Factory()

    if @config.scenes?
      for scene in @config.scenes
        @factory.class scene.name, scene

  openScene: (name, args...) ->
    @scenes.push @factory.create name, this, args...
    @scenes[@scenes.length - 1].on "scene:close", () =>
      @closeScene name

  getScenes: () ->
    @scenes

  closeScene: (name) ->
    unless name?
      if @scenes.length > 0
        name = @scenes[@scenes.length - 1].constructor.name
      else
        nv.log "Unable to find scene to close: ", name
        return false

    for scene, index in @scenes
      if scene instanceof @factory.getClass(name)
        scene.destroy()
        @scenes.splice index, 1

  destroy: () ->
    for scene in @scenes
      @closeScene()

    @factory.destroy()

    delete @scenes
    delete @factory
    delete @config

