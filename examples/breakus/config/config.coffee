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
    canvas.setStyle 'background', '#444'
    canvas.setStyle 'margin', '30px auto 0 auto'
    canvas.setStyle 'display', 'block'
    document.body.appendChild canvas.source
    @rootModel.canvas = canvas

    # Setup the global gamepad
    @rootModel.gamepad = nv.gamepad()

    # Create initializers and register engines
    @registerEngine nv.DebugEngine
    @registerEngine nv.TimingEngine
    @registerEngine nv.PhysicsEngine
    @registerEngine nv.RenderingEngine, (config, rootModel) ->
      nv.extend config,
        canvas: rootModel.canvas
        width: 500
        height: 500
    
    @registerEngine nv.GamepadEngine, (config, rootModel) ->
      nv.extend config,
        gamepad: rootModel.gamepad
        keys:
          up: nv.Key.W
          down: nv.Key.S
          left: nv.Key.A
          right: nv.Key.D
          shoot: nv.Key.Spacebar
        controller:
          left: nv.Controller.Left
          right: nv.Controller.Right

    # Register all the game scenes off of an object
    @registerScenes scenes

    # Start the game on a new thread
    start = () =>
      @start('Main')
    setTimeout start, 0