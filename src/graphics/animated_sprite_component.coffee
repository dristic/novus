class nv.AnimatedSpriteRenderingComponent extends nv.SpriteRenderingComponent
  constructor: (scene, model, options) ->
    super scene, model, options

    @sprite = new gleam.AnimatedSprite @options
    @sprite.x = @model.get 'x'
    @sprite.y = @model.get 'y'
    if @model.get 'currentAnimation'
      @sprite.play @model.get 'currentAnimation'
    if @model.get('playing') is false
      @sprite.stop()

    @model.on 'change:x', (value) =>
      @sprite.x = value
    @model.on 'change:y', (value) =>
      @sprite.y = value
    @model.on 'change:currentAnimation', (value) =>
      @play value

  play: (animation) ->
    @sprite.play animation

  stop: () ->
    @sprite.stop()

  update: (dt) ->
    @sprite.update dt

  draw: (context, canvas) ->
    @sprite.x = @model.x
    @sprite.y = @model.y
    @sprite.draw context, canvas

