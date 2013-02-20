class nv.Scene extends nv.EventDispatcher
  constructor: (@game, @options) ->
    super
    @gamepad = nv.gamepad()
    @controllers = []
    @models = {}
    @renderers = []
    @entities = []
    @deletedEntities = []
    @options = @options ? {}

    @engines = []
    @engines.push new klass this for klass in @game.engines

    @on "entity:remove", () =>
      @onRemoveEntity.call this, arguments...

  get: (key) ->
    @options[key]

  set: (key, value) ->
    @options[key] = value

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

  update: (dt) ->
    controller.update dt for controller in @controllers
    engine.update dt for engine in @engines
    entity.update dt for entity in @entities

    @removeEntity entity for entity in @deletedEntities
    @deletedEntities = []