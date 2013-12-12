class nv.SpriteMapRenderingComponent extends nv.RenderingComponent
  constructor: (scene, model, options) ->
    super scene, model, options

    @sprite = new gleam.SpriteMap @options
    @sprite.x = @model.get 'x'
    @sprite.y = @model.get 'y'

    @model.on 'change:x', (value) =>
      @sprite.x = value
    @model.on 'change:y', (value) =>
      @sprite.y = value

  getTileFromScreenXY: (x, y) ->
    @sprite.getTileFromScreenXY x, y

  loadData: (data, width, height) ->
    @sprite.data = data
    @sprite.width = width
    @sprite.height = height

  draw: (context, canvas) ->
    @sprite.x = @model.x
    @sprite.y = @model.y
    @sprite.draw context, canvas

