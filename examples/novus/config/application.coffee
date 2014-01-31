# Do any preliminary setup before everything else loads
@scenes = {}
@entities = {}
@models = {}
@renderers = {}
@config = {}

nv.configure
  debug: true

class @Application extends nv.Game
  constructor: () ->
    super
      scenes: [ scenes.Main ]

    # Start the game on a new thread
    start = () =>
      @openScene 'Main'
    setTimeout start, 0
