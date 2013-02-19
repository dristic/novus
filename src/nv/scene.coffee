class nv.Scene extends nv.EventDispatcher
  constructor: (@game, @options) ->
    super
    @gamepad = nv.gamepad()
    @controllers = []
    @models = {}
    @renderers = []
    @entities = []

    @engines = []
    @engines.push new klass this for klass in @game.engines

  addEntity: (entity) ->
    @entities.push entity

  removeEntity: (entity) ->
    @entities.splice @entities.indexOf(entity), 1

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