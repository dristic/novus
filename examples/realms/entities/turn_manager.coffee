class entities.TurnManager extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model

    @model.players = @model.players ? 2
    @model.turn = @model.turn ? 1

  "event(engine:ui:clicked)": (element) ->
    if element.id is "next-turn-button"
      turn = @model.turn + 1
      if turn > @model.players
        turn = 1
      @model.set 'turn', turn
