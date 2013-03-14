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

    # Create initializers and register engines
    #@registerEngine nv.DebugEngine
    #@registerEngine nv.TimingEngine
    #@registerEngine nv.PhysicsEngine
    #@registerEngine nv.RenderingEngine
    #@registerEngine nv.GamepadEngine

    # Register all the game scenes off of an object
    #@registerScenes scenes

    # Start the game on a new thread
    start = () =>
      @start('Main')
    setTimeout start, 0