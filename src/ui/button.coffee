class nv.ButtonUIPlugin extends nv.UIPlugin
  constructor: (scene, entity) ->
    super scene, entity

    @drawable = new gleam.Square
      color: "#FFF"
      width: 150
      height: 50
      x: 10
      y: 10

  "event(engine:gamepad:mouse:down)": (data) ->
    console.log data.x, data.y, @bounds()
    if @bounds().contains new nv.Point(data.x, data.y)
      console.log "The button was clicked!"

  bounds: () ->
    new nv.Rect @drawable.x, @drawable.y, @drawable.x + @drawable.width, @drawable.y + @drawable.height

  draw: (context, canvas) ->
    @drawable.x = @entity.model.x
    @drawable.y = @entity.model.y
    @drawable.draw context, canvas
