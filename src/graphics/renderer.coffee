class nv.RenderingEngine extends nv.Engine
  initialized: false
  canvas: null
  camera: null

  init: (config) ->
    if config.id
      canvas = new gleam.Canvas config.id
      canvas.setSize config.width, config.height
      canvas.setMaxSize config.maxWidth, config.maxHeight
      canvas.setStyle property, value for property, value of config.css
      canvas.setFullscreen config.fullscreen
      canvas.setResponsive config.responsive

      # Do not re-add the canvas if it is already on the screen
      unless document.contains and document.contains(canvas.source)
        document.body.appendChild canvas.source

      nv.RenderingEngine.prototype.canvas = canvas
      nv.RenderingEngine.prototype.camera = new gleam.Camera

    if config.preload
      for src in config.preload
        gleam.image.get src

  constructor: (scene, config) ->
    super scene, config

    if nv.RenderingEngine.prototype.initialized is false
      @init config
      nv.RenderingEngine.prototype.initialized = true

    @canvas = nv.RenderingEngine.prototype.canvas
    @context = @canvas.context
    @drawables = []

    @camera = nv.RenderingEngine.prototype.camera

    @scene.fire "engine:timing:register:after", nv.bind(this, @draw)
    @scene.on "engine:gamepad:mouse:down", nv.bind(this, @onMouseDown)

  "event(engine:rendering:create)": (drawable) ->
    @drawables.push drawable

  "event(engine:rendering:destroy)": (drawable) ->
    @drawables.splice @drawables.indexOf(drawable), 1

  "event(engine:rendering:draw)": () ->
    @_render 0

  update: (dt) ->
    for drawable in @drawables
      drawable.update dt unless not drawable.update
    
  draw: (dt) ->
    @_render dt

  _render: (dt) ->
    @context.save()
    @context.clearRect()

    @camera.update dt, @context, @canvas

    drawable.draw @context, @canvas for drawable in @drawables

    @context.restore()

  onMouseDown: (data) ->
    # Use the camera to convert to "in-game" coordinates
    coords = nv.clone data
    coords.x -= @camera.x
    coords.y -= @camera.y

    for drawable in @drawables
      if drawable.clickable is true
        if drawable.bounds
          bounds = drawable.bounds()
          if bounds.contains new nv.Point(coords.x, coords.y)
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
    @cached = new gleam.Canvas()
    @cached.setSize width, height
    @draw @cached.context, @cached
    @_draw = @draw
    @entity.model.x = oldX
    @entity.model.y = oldY
    @draw = (context, canvas) ->
      context.drawImage @cached.source, @entity.model.x, @entity.model.y

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

  bounds: () ->
    new nv.Rect @sprite.x, @sprite.y, @sprite.x + @sprite.width, @sprite.y + @sprite.height

  draw: (context, canvas) ->
    @sprite.x = @entity.model.x
    @sprite.y = @entity.model.y
    @sprite.draw context, canvas

class nv.AnimatedSpriteRenderingPlugin extends nv.SpriteRenderingPlugin
  constructor: (scene, entity) ->
    super scene, entity

    @sprite = new gleam.AnimatedSprite entity.model
    if entity.model.currentAnimation
      @sprite.play entity.model.currentAnimation
    if entity.model.playing is false
      @sprite.stop()

  play: (animation) ->
    @sprite.play animation

  stop: () ->
    @sprite.stop()

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

  getTileFromScreenXY: (x, y) ->
    @sprite.getTileFromScreenXY(x, y)

  loadData: (data, width, height) ->
    @sprite.data = data
    @sprite.width = width
    @sprite.height = height

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
