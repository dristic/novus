class nv.UIEngine extends nv.Engine
  initializer: (config, rootModel) ->
    nv.extend config,
      canvas: rootModel.canvas
      width: rootModel.canvas.width
      height: rootModel.canvas.height

  constructor: (scene, config) ->
    super scene, config

    @canvas = config.canvas
    @context = @canvas.context
    @elements = []

  prepare: () ->
    @scene.fire "engine:timing:register:after", nv.bind(this, @draw)

  "event(engine:ui:create)": (element) ->
    @elements.push element

  "event(engine:ui:destroy)": (element) ->
    @elements.splice @elements.indexOf(element), 1

  update: (dt) ->
    for element in @elements
      element.update dt unless not element.update

  draw: (dt) ->
    @context.save()
    element.draw @context, @canvas for element in @elements
    @context.restore()

  destroy: () ->
    delete @elements
    super

class nv.UIPlugin extends nv.Plugin
  constructor: (scene, entity) ->
    super scene, entity

    @scene.fire "engine:ui:create", this

  draw: (context, canvas) ->
    # Do nothing

  destroy: () ->
    @scene.fire "engine:ui:destroy", this
    super
