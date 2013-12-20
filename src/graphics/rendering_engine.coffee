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

    # Get reference to the gamepad engine for eventing
    @gamepadEngine = scene.getEngineByType nv.GamepadEngine

    # Calculate screen ratio for mouse coordinates
    @calculateScreenDimensions()
    @resizeListener = nv.bind(this, @calculateScreenDimensions)
    window.addEventListener 'resize', @resizeListener

    # Add event listeners for mouse and keyboard events
    @mouseDownListener = nv.mousedown document, nv.bind(this, @onMouseDown)
    @mouseUpListener = nv.mouseup document, nv.bind(this, @onMouseUp)
    @keyDownListener = nv.keydown document, nv.bind(this, @onKeyDown)
    @keyUpListener = nv.keyup document, nv.bind(this, @onKeyUp)

    # This is expensive so only turn on if needed
    if config.mouseMove is true
      @mouseMoveListener = nv.mousemove document, nv.bind(this, @onMouseMove)

    @scene.fire "engine:timing:register:after", nv.bind(this, @draw)

  "event(entity:component:new)": (component) ->
    if component instanceof nv.RenderingComponent
      @drawables.push component

  "event(entity:component:destroy)": (component) ->
    if component instanceof nv.RenderingComponent
      @drawables.splice @drawables.indexOf(component), 1

  onKeyDown: (event) ->
    if event.target.type is 'text'
      return
    @gamepadEngine.onKeyDown event.keyCode, event

  onKeyUp: (event) ->
    if event.target.type is 'text'
      return
    @gamepadEngine.onKeyUp event.keyCode, event

  onMouseDown: (event) ->
    coords = @toGameCoords event.pageX, event.pageY
    @gamepadEngine.onMouseDown event.button, coords.x, coords.y, event

  onMouseUp: (event) ->
    coords = @toGameCoords event.pageX, event.pageY
    @gamepadEngine.onMouseUp event.button, coords.x, coords.y, event

  onMouseMove: (event) ->
    coords = @toGameCoords event.pageX, event.pageY
    @gamepadEngine.onMouseMove coords.x, coords.y, event

  calculateScreenDimensions: () ->
    width = document.body.clientWidth
    height = document.body.clientHeight
    ratio = Math.min(width / @canvas.width, height / @canvas.height)
    @ratio = ratio
    @bounds = @canvas.source.getBoundingClientRect()

  toGameCoords: (x, y) ->
    x -= @bounds.left
    y -= @bounds.top

    #x /= @ratio
    #y /= @ratio

    {
      x: x
      y: y
    }

  "event(engine:rendering:draw)": () ->
    @render 0

  update: (dt) ->
    for drawable in @drawables
      drawable.update dt unless not drawable.update
    
  draw: (dt) ->
    @render dt

  render: (dt) ->
    @context.save()
    @context.clearRect()

    @camera.update dt, @context, @canvas

    drawable.draw @context, @canvas for drawable in @drawables

    @context.restore()

  # Deprecated
  onMouseDown_old: (data) ->
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

    window.removeEventListener 'resize', @resizeListener

    # Remove event listeners
    document.removeEventListener 'mousedown', @mouseDownListener
    document.removeEventListener 'mouseup', @mouseUpListener
    document.removeEventListener 'keydown', @keyDownListener
    document.removeEventListener 'keyup', @keyUpListener

    if @mouseMoveListener?
      document.removeEventListener 'mousemove', @mouseMoveListener

    super

# Class to determine if a component is renderable
class nv.RenderingComponent extends nv.Component
  constructor: (scene, model, options) ->
    super scene, model, options

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

