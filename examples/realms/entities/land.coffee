class entities.Land extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model

    @renderer = @getPlugin nv.AnimatedSpriteRenderingPlugin

  changeType: (type) ->
    if type is 'grain'
      @renderer.play 'grain'
    else if type is 'field'
      @renderer.play 'field'
    else if type is 'cows'
      @renderer.play 'cows'
    @renderer.stop()

  "event(game:turn:resourceproduction)": () ->
    @scene.fire "game:resource:produce", 20

  update: (dt) ->
    # Nothing yet
