class scenes.Main extends nv.Scene
  constructor: (game) ->
    super game

    # Fire up engines associated with this scene
    @useEngine "RenderingEngine"
    @useEngine "GamepadEngine", (rootModel) ->
      return {
        left: nv.Key.D
      }

    # Add all the entities in this scene
    @addEntities entities.Player