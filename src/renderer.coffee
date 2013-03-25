class nv.RenderingEngine extends nv.Engine
  initializer: (config, rootModel) ->
    nv.extend config,
      canvas: rootModel.canvas
      width: rootModel.canvas.width
      height: rootModel.canvas.height

  constructor: (scene, config) ->
    super scene, config

    @canvas = config.canvas
    @context = @canvas.context
    @drawables = []

    @camera = new gleam.Camera

  "event(engine:rendering:create)": (drawable) ->
    @drawables.push drawable

  "event(engine:rendering:destroy)": (drawable) ->
    @drawables.splice @drawables.indexOf(drawable), 1

  prepare: () ->
    @scene.fire "engine:timing:register:after", nv.bind(this, @draw)

    @scene.on "engine:gamepad:mouse:down", nv.bind(this, @onMouseDown)
    
  draw: (dt) ->
    @context.save()
    @context.clearRect()

    @camera.update dt, @context, @canvas

    drawable.draw @context, @canvas for drawable in @drawables

    @context.restore()

  onMouseDown: (data) ->
    for drawable in @drawables
      if drawable.clickable is true
        if drawable.bounds
          bounds = drawable.bounds()
          if bounds.contains new nv.Point(data.x, data.y)
            @scene.fire "engine:rendering:clicked:#{drawable.entity.constructor.name}", drawable.entity

  destroy: () ->
    delete @drawables

    super

class nv.RenderingPlugin extends nv.Plugin
  constructor: (scene, entity) ->
    super scene, entity

    @clickable = entity.model.clickable ? false

    @scene.fire "engine:rendering:create", this

  cache: (width, height) ->
    oldX = @entity.model.x
    oldY = @entity.model.y
    @entity.model.x = 0
    @entity.model.y = 0
    @cached = gl().size width, height
    @draw @cached.context, @cached
    @_draw = @draw
    @entity.model.x = oldX
    @entity.model.y = oldY
    @draw = (context, canvas) ->
      context.drawImage @cached, @entity.model.x, @entity.model.y

  draw: (context, canvas) ->
    # Do nothing

  destroy: () ->
    @scene.fire "engine:rendering:destroy", this

    super

class nv.DrawableRenderingPlugin extends nv.RenderingPlugin
  constructor: (scene, entity) ->
    super scene, entity

    @drawable = entity.model.drawable

  bounds: () ->
    new nv.Rect @drawable.x, @drawable.y, @drawable.x + @drawable.width, @drawable.y + @drawable.height

  draw: (context, canvas) ->
    @drawable.x = @entity.model.x
    @drawable.y = @entity.model.y
    @drawable.draw context, canvas

class nv.TextRenderingPlugin extends nv.RenderingPlugin
  constructor: (scene, entity) ->
    super scene, entity

    @text = new gl.text entity.model

  draw: (context, canvas) ->
    @text.draw context, canvas

class nv.PathRenderingPlugin extends nv.RenderingPlugin
  constructor: (scene, entity) ->
    super scene, entity

  draw: (context, canvas) ->
    for shape in @entity.model.shapes()
      context.setStrokeColor shape.strokeColor if shape.strokeColor
      context.setStrokeWidth shape.strokeWidth if shape.strokeWidth
      context.setFillStyle shape.fillStyle if shape.fillStyle

      context.beginPath()
      context.moveTo shape.points[0].x, shape.points[0].y

      $.each shape.points.slice(1), () ->
        context.lineTo this.x, this.y

      context.lineTo shape.points[0].x, shape.points[0].y

      context.fill() if shape.fillStyle
      context.stroke()
      context.closePath()
