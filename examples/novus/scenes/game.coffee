class scenes.Game extends nv.Scene
  constructor: (name, game, rootModel) ->
    super name, game, rootModel

    hud = @getEntity(entities.Hud)

    @on "entity:destroyed:Ship", (ship) =>
      remaining = hud.shipDestroyed()
      if remaining > 0
        @fire "entity:create",
          entity: "ship"
      else if remaining is 0
        @game.closeScene "Game"
        @game.openScene 'Gameover', @canvas

    # Start the scene
    @send "engine:timing:start"

  destroy: () ->
    super