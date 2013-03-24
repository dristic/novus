class entities.Ball extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model

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

    @scene.on "engine:collision:Ball:Brick", (data) =>
      @model.direction.y = -@model.direction.y
      @model.speed += @model.speedIncrement

  restart: () ->
    @started = false
    @startDelay = 5
    @model.x = 150
    @model.y = 250

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

      else if @model.y > dimensions.height
        # Add in for god mode
        # @model.direction.y = -@model.direction.y
        @restart()
