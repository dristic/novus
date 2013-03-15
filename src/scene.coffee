class nv.Scene extends nv.EventDispatcher
  constructor: (name, @game, @rootModel, @options) ->
    super

    @sceneName = name.toLowerCase()
    @engines = []
    @entities = []
    @deletedEntities = []
 
    @options = @options ? {}
    if nv.gameConfig.scenes[@sceneName].config.scene?
      @options = $.extend @options, nv.gameConfig.scenes[@sceneName].config.scene
    @options = $.extend @options, @rootModel

    @prepareEngines()
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

  prepareEngines: () ->
    @useEngine klass.name for klass in nv.gameConfig.scenes[@sceneName].enginesUsed
    engine.prepare() for engine in @engines

  useEngine: (engineName, initializer) ->
    engineObj = @game.engines[engineName]
    configKey = engineName.replace("nv.","").replace("Engine","").toLowerCase()
    config = nv.gameConfig.scenes[@sceneName].config[configKey] ? {}

    if engineObj.klass.prototype.initializer?
      engineObj.klass.prototype.initializer config, @game.model()

    if initializer?
      initializer config, @game.model()

    @engines.push new engineObj.klass this, config    

  createEntities: () ->
    for entity, config of nv.gameConfig.scenes[@sceneName].entities
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
            model[property] = value(index-1)
        models.push model

    #klass = getClass(config.entity)

    #plugins = $.map config.plugins, (name) ->
    #  getClass name

    @addEntity config.entity, config.plugins, model for model in models

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
    
