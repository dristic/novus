class nv.GleamRenderingComponent extends nv.RenderingComponent
  constructor: (scene, model, options) ->
    super scene, model, options

    @options.drawable.x = @model.get 'x'
    @options.drawable.y = @model.get 'y'

    @model.on 'change:x', (value) =>
      @options.drawable.x = value
    @model.on 'change:y', (value) =>
      @options.drawable.y = value

  draw: (context, canvas) ->
    @options.drawable.draw context, canvas

