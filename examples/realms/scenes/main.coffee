class scenes.Main extends nv.Scene
  constructor: (name, game, rootModel) ->
    super name, game, rootModel

    @on "engine:gamepad:mouse:down", () =>
      @fire "scene:close"
      @game.openScene 'Game'

    @send "engine:timing:start"

  destroy: () ->
    @send "engine:timing:stop"
    super