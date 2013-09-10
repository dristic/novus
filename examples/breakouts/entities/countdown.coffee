class entities.Countdown extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model

    @delay = model.delay

  update: (dt) ->
    super dt

    @delay -= dt
    unless @delay > 0
      @destroy()
