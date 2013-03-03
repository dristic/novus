class scenes.Main extends nv.Scene
  constructor: (game) ->
    super game

    # Fire up engines associated with this scene
    @useEngine "RenderingEngine"
    @useEngine "DebugEngine"
    @useEngine "GamepadEngine", (config, rootModel) ->
      nv.extend config,
        keys:
          left: nv.Key.D

    # Add all the entities in this scene
    @addEntities entities.Player