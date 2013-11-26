class nv.Scene extends nv.EventDispatcher
  constructor: (name, @game, @rootModel, @options) ->
    super

    @engines = []
    @entities = []
    @factory = new nv.Factory()
    @deletedEntities = []
 
    @options = @options ? {}
    if @rootModel.config.scenes[@sceneName].config.scene?
      @options = nv.extend @options, @rootModel.config.scenes[@sceneName].config.scene
    @options = nv.extend @options, @rootModel

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

    @prepareEngines()

    @fire "scene:initialized"

  get: (key) ->
    @options[key]

  set: (key, value) ->
    @options[key] = value

  prepareEngines: () ->
    @useEngine klass.name for klass in @rootModel.config.scenes[@sceneName].engines
    engine.prepare() for engine in @engines

  useEngine: (engineName, initializer) ->
    engineObj = @game.engines[engineName]
    configKey = engineName.replace("nv.","").replace("Engine","").toLowerCase()
    config = @rootModel.config.scenes[@sceneName].config[configKey] ? {}

    if engineObj.klass.prototype.initializer?
      engineObj.klass.prototype.initializer config, @game.model()

    if initializer?
      initializer config, @game.model()

    @engines.push new engineObj.klass this, config  

  createEntity: (config, options = {}, index = 0) ->
    # If a reference to a common entity exists, get config from there
    if config.include?
      config = @rootModel.config.entities[config.include]
    if config.model?
      # Else just one instance from the entity config
      @addEntity new config.entity this, config.plugins, @loadModelFromConfig(config, options, index)
    else
      # If no model is passed in, instance the entity without a model
      @addEntity new config.entity this, config.plugins

  loadModelFromConfig: (config, options, index = 0) ->
    model = {}

    # Extend the initialized values onto the model
    model = nv.extend model, config.model.options

    # Extend the extra options onto the model
    model = nv.extend model, options

    # Load the initializers up in order and add their results
    # as properties on the model
    if config.model.initializers?
      for key of config.model.initializers
        initializer = config.model.initializers[key]
        model[key] = nv.bind(model, initializer)(this, index) unless model[key] isnt undefined

    # Load the model class if given
    if config.model.klass?
      model = new config.model.klass(model)
    else
      model = new nv.Model(model)

    model

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
    
