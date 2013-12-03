class nv.Scene extends nv.EventDispatcher
  constructor: (name, @game, @options = {}) ->
    super

    @engines = []
    @entities = []
    @factory = nv.factory
    @deletedEntities = []

    @on "entity:remove", (entity) =>
      @removeEntity entity

    @on "entity:add", (entity) =>
      @addEntity entity

    @on "entity:create", (options) =>
      @createEntity options

    @on "scene:destroy", (options) =>
      @destruct()

    # If any functions are defined using the prefix "event()"
    # then we auto add it as an event listener
    for key of this
      if /event\(.*\)/.test(key)
        @on key[6..-2], nv.bind(this, this[key])

    @fire "scene:initialized"

  get: (key) ->
    @options[key]

  set: (key, value) ->
    @options[key] = value

  loadEngine: (engine, options = {}) ->
    @engines.push new engine this, options

  loadMap: (mapData) ->
    map = new nv.Map mapData
    entities = map.parse()

    for entity in entities
      @createEntity entity.name, entity.options

  createEntity: (name, options = {}) ->
    @addEntity @factory.create name, this, options

  addEntity: (entity) ->
    @entities.push entity
    entity

  getEntitiesByType: (type) ->
    entities = []
    for entity in @entities
      if entity instanceof type
        entities.push entity
    entities

  getEntityById: (id) ->
    for entity in @entities
      if entity.model? and entity.model.id? and entity.model.id is id
        return entity
    null

  removeEntity: (entity) ->
    unless @entities.indexOf(entity) is -1
      entity.destroy() unless not entity.destroy
      @entities.splice @entities.indexOf(entity), 1
    else
      nv.log "Could not find entity", entity

  onRemoveEntity: (entity) ->
    @deletedEntities.push entity

  getEnginesByType: (type) ->
    engines = []
    for engine in @engines
      if engine instanceof type
        engines.push engine
    engines

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
    
