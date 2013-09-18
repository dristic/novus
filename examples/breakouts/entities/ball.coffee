class entities.Ball extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model

    @startDelay = model.startDelay
    @started = false
    @pendingCollision = false

    # Get dependencies
    @canvas = @scene.getEngine(nv.RenderingEngine).canvas

  "event(engine:collision:queued)": (data) ->
    return unless data.actor is this
    @pendingCollision = true

  "event(engine:collision:Ball:Player)": (data) ->
    ball = data.actor.model
    paddle = data.target.model
    impactVector = data.impactVector

    if Math.abs(data.impactVector.y) > Math.abs(data.impactVector.x)
      @model.x -= data.impactVector.x + @model.direction.x
      @model.direction.x = -@model.direction.x
    else if Math.abs(data.impactVector.y) < Math.abs(data.impactVector.x)
      @model.y -= data.impactVector.y + @model.direction.y
      @model.direction.y = -@model.direction.y

      relativeX = (ball.x + (ball.width / 2)) - (paddle.x + (paddle.width / 2))
      normalizedRelativeX = relativeX / (paddle.width / 2)
      bounceAngle = normalizedRelativeX * (5 * Math.PI / 12)

      ballVx = Math.sin(bounceAngle)
      ballVy = -Math.cos(bounceAngle)

      @model.direction.x = ballVx
      @model.direction.y = ballVy
    @pendingCollision = false

  "event(engine:collision:Ball:Brick)": (data) ->
    if Math.abs(data.impactVector.y) > Math.abs(data.impactVector.x)
      @model.x -= data.impactVector.x + @model.direction.x
      @model.direction.x = -@model.direction.x
    else if Math.abs(data.impactVector.y) < Math.abs(data.impactVector.x)
      @model.y -= data.impactVector.y + @model.direction.y
      @model.direction.y = -@model.direction.y
    @pendingCollision = false

    @model.speed += @model.speedIncrement
    @pendingCollision = false

  "event(engine:collision:Ball:Wall)": (data) ->
    dimensions = @canvas.getSize()
    if Math.abs(data.impactVector.y) > Math.abs(data.impactVector.x)
      @model.x -= data.impactVector.x + @model.direction.x
      @model.direction.x = -@model.direction.x
    else if Math.abs(data.impactVector.y) < Math.abs(data.impactVector.x)
      @model.y -= data.impactVector.y + @model.direction.y
      @model.direction.y = -@model.direction.y
    @pendingCollision = false

  restart: () ->
    @started = false
    @startDelay = @model.startDelay
    @model.x = 150
    @model.y = 250
    @model.direction = new nv.Point(1, 1)

  update: (dt) ->
    if @started is false
      @startDelay -= dt
      @started = true unless @startDelay > 0
    else if @pendingCollision isnt true
      dimensions = @canvas.getSize()
      @model.x += @model.speed * @model.direction.x
      @model.y += @model.speed * @model.direction.y

      if @model.y > dimensions.height
        # Add in for god mode
        # @model.direction.y = -@model.direction.y
        @scene.fire "game:ball:destroyed"
        @restart()
