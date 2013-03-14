class scenes.Main extends nv.Scene
  constructor: (name, game, rootModel) ->
    super name, game, rootModel

    # Fire up engines associated with this scene
    #@useEngine "TimingEngine"
    #@useEngine "RenderingEngine"
    #@useEngine "DebugEngine"
    #@useEngine "GamepadEngine"
    #@useEngine "PhysicsEngine"

    # Add all the entities in this scene
    #@addEntities entities.Player,
    #  entities.Ball

    # Add bricks to the level
    #@addEntity entities.Brick, 10, 10
    #@addEntity entities.Brick, 170, 10
    #@addEntity entities.Brick, 330, 10
    #@addEntity entities.Brick, 10, 40
    #@addEntity entities.Brick, 170, 40
    #@addEntity entities.Brick, 330, 40
    #@addEntity entities.Brick, 10, 70
    #@addEntity entities.Brick, 170, 70
    #@addEntity entities.Brick, 330, 70

    # Start the scene (we use send here because nothing is updating yet)
    @send "engine:timing:start"