class nv.TextRenderingComponent extends nv.RenderingComponent
  constructor: (scene, model, options) ->
    super scene, model, options

    @text = new gleam.Text @options
    @text.x = @model.get 'x'
    @text.y = @model.get 'y'

    @model.on 'change:x', (value) =>
      @text.x = value
    @model.on 'change:y', (value) =>
      @text.y = value

  draw: (context, canvas) ->
    @text.draw context, canvas

