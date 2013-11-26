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

  "event(engine:gamepad:mouse:down)": (data, event) ->
    for element in @elements
      unless element.hidden is true
        if element.bounds? and element.bounds().contains new nv.Point(data.x, data.y)
          @scene.fire "engine:ui:mouse:down", data
          event.stopPropagation()

  "event(engine:gamepad:mouse:up)": (data, event) ->
    for element in @elements
      unless element.hidden is true
        if element.bounds? and element.bounds().contains new nv.Point(data.x, data.y)
          @scene.fire "engine:ui:mouse:up", data

  update: (dt) ->
    for element in @elements
      element.update dt unless not element.update

  draw: (dt) ->
    @context.save()
    element.draw @context, @canvas for element in @elements
    @context.restore()

  drawBounds: () ->
    for element in @elements
      if element.bounds
        bounds = element.bounds()
        @context.beginPath()
        @context.rect bounds.x, bounds.y, bounds.x2 - bounds.x, bounds.y2 - bounds.y
        @context.setLineWidth 1
        @context.setStrokeStyle 'red'
        @context.stroke()

  destroy: () ->
    delete @elements
    super

class nv.UIPlugin extends nv.Plugin
  constructor: (scene, entity) ->
    super scene, entity

    @hidden = entity.model.hidden
    @scene.fire "engine:ui:create", this

    @xFunc = switch typeof entity.model.x
      when "number" then () => 
        unless @entity.model.anchor?
          @entity.model.x
        else
          switch @entity.model.anchor
            when "topLeft", "bottomLeft" then @entity.model.x
            else window.innerWidth + @entity.model.x
      when "string" then (width) => 
        window.innerWidth * (parseFloat(@entity.model.x) / 100) - ( (width || @entity.model.width) / 2)

    @yFunc = switch typeof entity.model.y
      when "number" then () => 
        unless @entity.model.anchor?
          @entity.model.y
        else
          switch @entity.model.anchor
            when "topLeft", "topRight" then @entity.model.y
            else window.innerHeight + @entity.model.y
      when "string" then () =>
        window.innerHeight * (parseFloat(@entity.model.y) / 100) - (@entity.model.height / 2)    

  hide: () ->
    @hidden = true

  show: () ->
    @hidden = false

  draw: (context, canvas) ->
    # Nothing

  destroy: () ->
    @scene.fire "engine:ui:destroy", this
    super
