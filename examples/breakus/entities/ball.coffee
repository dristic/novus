class entities.Ball extends nv.Entity
  constructor: (scene) ->
    super scene, [nv.DrawableRenderingPlugin],
      drawable: new gleam.Square
        width: 20
        height: 20
        color: "#FFF"
      width: 20
      height: 20
      x: 150
      y: 250
      speed: 2
      direction: new nv.Point(1, 1)

    @startDelay = 5
    @started = false

    # Get dependencies
    @canvas = @scene.getEngine(nv.RenderingEngine).canvas

  update: (dt) ->
    if @started is false
      @startDelay -= dt
      @started = true unless @startDelay > 0
    else
      @model.x += @model.speed * @model.direction.x
      @model.y += @model.speed * @model.direction.y

      dimensions = @canvas.getSize()
      if @model.x < @model.width then @model.direction.x = -@model.direction.x
      else if @model.x > dimensions.width - @model.width then @model.direction.x = -@model.direction.x

      if @model.y < @model.height then @model.direction.y = -@model.direction.y
      else if @model.y > dimensions.height - @model.height then @model.direction.y = -@model.direction.y
