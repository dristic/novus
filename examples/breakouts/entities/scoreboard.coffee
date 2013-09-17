class entities.Scoreboard extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model
    @updateText()

  "event(game:score)": (data) ->
    @model.score += data.score
    @updateText()

  updateText: () ->
    @model.drawable.text = "SCORE: #{@model.score}"