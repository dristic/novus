class nv.RenderingEngine extends nv.Engine
  constructor: (scene, config) ->
    super scene, config

    @canvas = config.canvas
    @context = @canvas.context
    @drawables = []

    @camera = new gleam.Camera

    scene.on "engine:rendering:create", (drawable) =>
      @drawables.push drawable

    scene.on "engine:rendering:destroy", (drawable) =>
      @drawables.splice @drawables.indexOf(drawable), 1

    scene.fire "engine:timing:register:after", nv.bind(this, @draw)
    
  draw: (dt) ->
    @context.save()
    @context.clearRect()

    @camera.update dt, @context, @canvas

    drawable.draw @context, @canvas for drawable in @drawables

    @context.restore()

  destroy: () ->
    #i = @drawables.length
    #while i--
    #  @drawables[i].destroy()

class nv.RenderingPlugin extends nv.Plugin
  constructor: (scene, entity) ->
    super scene, entity

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
