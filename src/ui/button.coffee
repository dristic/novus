class nv.ButtonUIPlugin extends nv.UIPlugin
  constructor: (scene, entity) ->
    super scene, entity

    # Used for telling what is interacted with
    @id = @entity.model.id

    @drawable = new gleam.Square
      color: @entity.model.fillColor ? "#FFF"
      width: @entity.model.width ? 150
      height: @entity.model.height ? 50
      x: 10
      y: 10

    @text = new gleam.Text
      color: @entity.model.textColor ? "#000"
      text: @entity.model.text
      textAlign: 'center'
      textBaseline: 'middle'
      x: 10
      y: 10

    @down = false

  "event(engine:ui:mouse:down)": (data) ->
    unless @hidden is true
      if @bounds().contains new nv.Point(data.x, data.y)
        @down = true
  
  "event(engine:ui:mouse:up)": (data) ->
    if @down is true
      if @bounds().contains new nv.Point(data.x, data.y)
        @down = false
        @scene.fire "engine:ui:clicked", this

  bounds: () ->
    new nv.Rect @drawable.x, @drawable.y, @drawable.x + @drawable.width, @drawable.y + @drawable.height

  draw: (context, canvas) ->
    return if @hidden is true
    @drawable.x = @entity.model.x
    @drawable.y = @entity.model.y

    # Calculate text position based on button
    @text.x = @drawable.x + (@drawable.width / 2)
    @text.y = @drawable.y + (@drawable.height / 2)

    @drawable.draw context, canvas
    @text.draw context, canvas
