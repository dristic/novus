class scenes.Main extends nv.Scene
  constructor: (game) ->
    super game

    # Fire up engines associated with this scene
    @useEngine "TimingEngine"
    @useEngine "RenderingEngine"
    @useEngine "DebugEngine"
    @useEngine "GamepadEngine"
    @useEngine "PhysicsEngine"

    # Add all the entities in this scene
    @addEntities entities.Player,
      entities.Ball

    # Start the scene (we use send here because nothing is updating yet)
    @send "engine:timing:start"