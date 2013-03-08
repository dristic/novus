# Do any preliminary setup before everything else loads
@scenes = {}
@entities = {}
@models = {}
@renderers = {}

class @Application extends nv.Game
  constructor: () ->
    super

    # Configure global novus settings
    nv.configure
      debug: true

    # Setup the global canvas
    canvas = new gleam.Canvas
    canvas.setSize 500, 500
    canvas.setStyle 'background', '#000'
    canvas.setStyle 'margin', '30px auto 0 auto'
    canvas.setStyle 'display', 'block'
    canvas.setFullscreen true
    document.body.appendChild canvas.source
    @rootModel.canvas = canvas

    # Setup the global gamepad
    @rootModel.gamepad = nv.gamepad()

    # Create initializers and register engines
    @registerEngine nv.TimingEngine, (config, rootModel) ->
      # Do nothing

    @registerEngine nv.RenderingEngine, (config, rootModel) ->
      nv.extend config,
        canvas: rootModel.canvas
        width: rootModel.canvas.width
        height: rootModel.canvas.height

    @registerEngine nv.DebugEngine
    
    @registerEngine nv.GamepadEngine, (config, rootModel) ->
      nv.extend config,
        gamepad: rootModel.gamepad
        trackMouse: true
        keys:
          up: nv.Key.W
          down: nv.Key.S
          left: nv.Key.A
          right: nv.Key.D
          shoot: nv.Key.Spacebar

    @registerEngine nv.PhysicsEngine, (config, rootModel) ->
      # Nothing
    @registerEngine nv.SoundEngine, (config, rootModel) ->
      # Nothing
    @registerEngine nv.ParticleEngine, (config, rootModel) ->
      config.canvas = rootModel.canvas

    # Register all the game scenes off of an object
    @registerScenes scenes

    # Start the game on a new thread
    start = () =>
      @start('Main')
    setTimeout start, 0