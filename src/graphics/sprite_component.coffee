class nv.SpriteRenderingComponent extends nv.RenderingComponent
  constructor: (scene, model, options) ->
    super scene, model, options

    @sprite = new gleam.Sprite @options
    @sprite.x = @model.get 'x'
    @sprite.y = @model.get 'y'

    @model.on 'change:x', (value) =>
      @sprite.x = value
    @model.on 'change:y', (value) =>
      @sprite.y = value

  draw: (context, canvas) ->
    @sprite.draw context, canvas

