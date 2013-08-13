class nv.Scene extends nv.EventDispatcher
  constructor: (name, @game, @rootModel, @options) ->
    super

    @sceneName = name.toLowerCase()
    @engines = []
    @entities = []
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
      entityName = options.entity
      # Ensure we only create one this time
      config = @rootModel.config.scenes[@sceneName].entities[entityName]
      if config.include?
        config = @rootModel.config.entities[entityName]
      unless not config
        @createEntity config, options

    @on "scene:destroy", (options) =>
      @destruct()

    # If any functions are defined using the prefix "event()"
    # then we auto add it as an event listener
    for key of this
      if /event\(.*\)/.test(key)
        @on key[6..-2], nv.bind(this, this[key])

    @prepareEngines()
    @createEntities @rootModel.config.scenes[@sceneName].entities
    @createSoundFxs()


  get: (key) ->
    @options[key]

  set: (key, value) ->
    @options[key] = value

  prepareEngines: () ->
    @useEngine klass.name for klass in @rootModel.config.scenes[@sceneName].enginesUsed
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

  createEntities: (entities) ->
    for entity, config of entities
      if config.count?
        index = config.count
        while (index -= 1) >= 0
          @createEntity config, {}, index
      else
        @createEntity config

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

  addEntities: (entities...) ->
    @addEntity entity for entity in entities

  addEntity: (entity) ->
    @entities.push entity
    entity

  createSoundFxs: () ->
    return if @rootModel.config.scenes[@sceneName].soundfx is undefined
    new nv.SoundFactory().wire this, @rootModel.config.scenes[@sceneName].soundfx

  getEntity: (type) ->
    for entity in @entities
      if entity instanceof type
        return entity
    null

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
    
