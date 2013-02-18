class nv.Scene
  constructor: () ->
    @dispatcher = new nv.EventDispatcher()
    @gamepad = nv.gamepad()
    @controllers = []
    @models = {}
    @renderers = []

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