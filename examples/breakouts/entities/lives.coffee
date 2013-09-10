class entities.Lives extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model
    @updateText()

  "event(game:ball:destroyed)": (data) ->
    @model.lives--
    @updateText()
    @scene.fire "game:over" if @model.lives is 0

  updateText: () ->
    @model.drawable.text = [ "\u25CF", "\u25CF", "\u25CF" ].slice(0, @model.lives - 1).join("")
