class nv.RenderingEngine extends nv.Engine
  initializer: (config, rootModel) ->
    unless rootModel.get 'canvas'
      rootConfig = rootModel.config
      canvas = new gleam.Canvas rootConfig.canvas.id
      canvas.setSize rootConfig.canvas.width, rootConfig.canvas.height
      canvas.setMaxSize rootConfig.canvas.maxWidth, rootConfig.canvas.maxHeight
      canvas.setStyle property, value for property, value of rootConfig.canvas.css
      canvas.setFullscreen rootConfig.canvas.fullscreen
      canvas.setResponsive rootConfig.canvas.responsive

      # Do not re-add the canvas if it is already on the screen
      unless document.contains and document.contains(canvas.source)
        document.body.appendChild canvas.source

      rootModel.set 'canvas', canvas
      rootModel.set 'origin', canvas.source

    nv.extend config,
      canvas: rootModel.canvas
      width: rootModel.canvas.width
      height: rootModel.canvas.height
      autoRendering: true

    if rootModel.config.preload
      for src in rootModel.config.preload
        gleam.image.get src

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

  "event(engine:rendering:draw)": () ->
    @_render 0

  prepare: () ->
    @scene.fire "engine:timing:register:after", nv.bind(this, @draw)
    @scene.on "engine:gamepad:mouse:down", nv.bind(this, @onMouseDown)

  update: (dt) ->
    for drawable in @drawables
      drawable.update dt unless not drawable.update
    
  draw: (dt) ->
    return unless @config.autoRendering
    @_render dt

  _render: (dt) ->
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

class nv.SpriteRenderingPlugin extends nv.RenderingPlugin
  constructor: (scene, entity) ->
    super scene, entity

    @sprite = new gleam.Sprite entity.model

  draw: (context, canvas) ->
    @sprite.x = @entity.model.x
    @sprite.y = @entity.model.y
    @sprite.draw context, canvas

class nv.AnimatedSpriteRenderingPlugin extends nv.RenderingPlugin
  constructor: (scene, entity) ->
    super scene, entity

    @sprite = new gleam.AnimatedSprite entity.model
    if entity.model.currentAnimation
      @sprite.play entity.model.currentAnimation

  play: (animation) ->
    @sprite.play animation

  update: (dt) ->
    @sprite.update dt

  draw: (context, canvas) ->
    @sprite.x = @entity.model.x
    @sprite.y = @entity.model.y
    @sprite.draw context, canvas

class nv.SpriteMapRenderingPlugin extends nv.RenderingPlugin
  constructor: (scene, entity) ->
    super scene, entity

    @sprite = new gleam.SpriteMap entity.model

  draw: (context, canvas) ->
    @sprite.x = @entity.model.x
    @sprite.y = @entity.model.y
    @sprite.draw context, canvas

class nv.TextRenderingPlugin extends nv.RenderingPlugin
  constructor: (scene, entity) ->
    super scene, entity

    @text = new gleam.Text entity.model

  draw: (context, canvas) ->
    @text.draw context, canvas

class nv.PathRenderingPlugin extends nv.RenderingPlugin
  constructor: (scene, entity) ->
    super scene, entity

  draw: (context, canvas) ->
    for shape in @entity.model.shapes()
      context.setStrokeStyle shape.strokeColor if shape.strokeColor
      context.setStrokeWidth shape.strokeWidth if shape.strokeWidth
      context.setFillStyle shape.fillStyle if shape.fillStyle

      context.beginPath()
      context.moveTo shape.points[0].x, shape.points[0].y

      for point in shape.points.slice(1)
        context.lineTo point.x, point.y

      context.lineTo shape.points[0].x, shape.points[0].y

      context.fill() if shape.fillStyle
      context.stroke()
      context.closePath()
