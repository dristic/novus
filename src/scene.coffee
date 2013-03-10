class nv.Scene extends nv.EventDispatcher
  constructor: (@game, @options) ->
    super

    @entities = []
    @deletedEntities = []
    @options = @options ? {}
    @engines = []

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

  useEngine: (name, initializer) ->
    engineObj = @game.engines[name]
    config = {}

    if engineObj.initializer?
      engineObj.initializer config, @game.model()

    if initializer?
      initializer config, @game.model()

    @engines.push new engineObj.klass this, config

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

  getEngine: (type) ->
    for engine in @engines
      if engine instanceof type
        return engine
    null

  fire: (event, data) ->
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
    
