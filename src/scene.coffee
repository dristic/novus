class nv.Scene extends nv.EventDispatcher
  constructor: (@name, @game, @canvas, @options) ->
    super
    @name = @name.toLowerCase()
    @gamepad = nv.gamepad()
    @controllers = []
    @models = {}
    @renderers = []
    @entities = []
    @deletedEntities = []
    @options = @options ? {}
    @options = $.extend @options, nv.gameConfig.scenes[@name].config

    @engines = []
    @engines.push new klass this for klass in @game.engines

    @createEntities()

    @on "entity:remove", () =>
      @removeEntity.call this, arguments...

    @on "entity:add", (options) =>
      @addEntity options.entity, options

    @on "scene:destroy", (options) =>
      @destruct()

  get: (key) ->
    @options[key]

  set: (key, value) ->
    @options[key] = value

  createEntities: () ->
    for entity, config of nv.gameConfig.scenes[@name].entities
      @createEntity config

  createEntity: (config) ->
    models = []
    if config.model?
      models.push config.model
    else if config.models?
      index = config.models.count + 1
      while index -= 1
        model = $.extend {}, config.models.model
        for property, value of model
          if $.isFunction value
            model[property] = value()
        models.push model

    klass = getClass(config.entity)

    plugins = $.map config.plugins, (name) ->
      getClass name

    @addEntity klass, plugins, model for model in models

  addEntities: (entities...) ->
    @addEntity entity for entity in entities

  addEntity: (entity, args...) ->
    entity = new entity this, args...
    @entities.push entity
    entity

  removeEntity: (entity) ->
    unless @entities.indexOf(entity) is -1
      entity.destroy() unless not entity.destroy
      @entities.splice @entities.indexOf(entity), 1

  onRemoveEntity: (entity) ->
    @deletedEntities.push entity

  addController: (controller) ->
    @controllers.push controller

  removeController: (controller) ->
    @controllers.splice @controllers.indexOf(controller), 1

  addModel: (name, model) ->
    @models[name] = model

  getModel: (name) ->
    @models[name]

  removeModel: (name) ->
    delete @models[name]

  addRenderer: (renderer) ->
    @renderers.push renderer

  removeRenderer: (renderer) ->
    @renderers.splice @renderers.indexOf(renderer), 1

  getEngine: (type) ->
    for engine in @engines
      if engine instanceof type
        return engine
    null

  fire: (event, data) ->
    console.log "[EVENT] - #{event}"
    super event, data

  update: (dt) ->
    engine.update dt for engine in @engines
    entity.update dt for entity in @entities

    super dt

  destroy: () ->
    @fire "scene:destroy"

  destruct: () ->
    entity.destroy() for entity in @entities
    engine.destroy() for engine in @engines
    
    delete @entities
    delete @engines
    
