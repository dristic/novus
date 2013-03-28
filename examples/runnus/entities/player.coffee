class entities.Player extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model

    @sprite = @getPlugin nv.AnimatedSpriteRenderingPlugin

  "event(engine:gamepad:press:attack)": () ->
    @sprite.play 'attack'

  "event(engine:gamepad:press:left)": () ->
    @left = true

  "event(engine:gamepad:release:left)": () ->
    @left = false

  "event(engine:gamepad:press:right)": () ->
    @right = true

  "event(engine:gamepad:release:right)": () ->
    @right = false

  update: (dt) ->
    @model.x += @model.speed unless not @right
    @model.x -= @model.speed unless not @left

    if (@right or @left) and @sprite.sprite.currentAnimationName isnt "attack"
      @sprite.play 'run'
    else if @sprite.sprite.currentAnimationName isnt 'attack'
      @sprite.play 'idle'

    @model.x = 0 unless @model.x > 0
    @model.x = 350 unless @model.x < 350
