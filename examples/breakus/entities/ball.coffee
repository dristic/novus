class entities.Ball extends nv.Entity
  constructor: (scene) ->
    super scene, [nv.DrawableRenderingPlugin, nv.RectanglePhysicsPlugin],
      drawable: new gleam.Square
        width: 20
        height: 20
        color: "#FFF"
      type: 'active'
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

    # Collision handler
    @scene.on "engine:collision:Ball:Player", (data) =>
      if data.target.model.y > @model.y
        @model.direction.y = -@model.direction.y
        @model.y -= @model.speed * 2
      else
        @model.direction.y = -@model.direction.y
        @model.y += @model.speed * 2

  update: (dt) ->
    if @started is false
      @startDelay -= dt
      @started = true unless @startDelay > 0
    else
      @model.x += @model.speed * @model.direction.x
      @model.y += @model.speed * @model.direction.y

      dimensions = @canvas.getSize()
      if @model.x < 0 then @model.direction.x = -@model.direction.x
      else if @model.x > dimensions.width - @model.width then @model.direction.x = -@model.direction.x

      if @model.y < 0 then @model.direction.y = -@model.direction.y

      # Add in for god mode
      else if @model.y > dimensions.height - @model.height then @model.direction.y = -@model.direction.y
