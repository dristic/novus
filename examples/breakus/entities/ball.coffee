class entities.Ball extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model

    @startDelay = 5
    @started = false

    # Get dependencies
    @canvas = @scene.getEngine(nv.RenderingEngine).canvas

  "event(engine:collision:Ball:Player)": (data) =>
    if data.target.model.y > @model.y
      @model.direction.y = -@model.direction.y
      @model.y -= @model.speed * 2
    else
      @model.direction.y = -@model.direction.y
      @model.y += @model.speed * 2

  "event(engine:collision:Ball:Brick)": (data) =>
    @model.direction.y = -@model.direction.y
    @model.speed += @model.speedIncrement

  "event(engine:collision:Ball:Wall)": (data) =>
    dimensions = @canvas.getSize()
    if data.impactVector.x isnt 0
      @model.direction.x = -@model.direction.x
      @model.x += if data.impactVector.x < 0 then -@model.speed * 2 else @model.speed * 2
    else if data.impactVector.y isnt 0
      @model.direction.y = -@model.direction.y
      @model.y += if data.impactVector.y < 0 then -@model.speed * 2 else @model.speed * 2

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
      dimensions = @canvas.getSize()
      @model.x += @model.speed * @model.direction.x
      @model.y += @model.speed * @model.direction.y

      if @model.y > dimensions.height
        # Add in for god mode
        # @model.direction.y = -@model.direction.y
        @restart()
