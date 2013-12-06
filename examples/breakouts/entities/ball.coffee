class entities.Ball extends nv.Entity
  constructor: (scene, options = {}) ->
    super scene, options

    @model.set 'startDelay', 3
    @model.set 'speed', 2
    @model.set 'speedIncrement', 0.2
    @model.set 'direction', new nv.Point(1, 1)
    @model.set 'width', 16
    @model.set 'height', 16
    @model.set 'physicsObjectType', 'active'
    @model.set 'type', 'active'

    @addComponent nv.AnimatedSpriteRenderingComponent,
      src: 'assets/tiles.png'
      frameWidth: 16
      frameHeight: 16
      animations:
        move:
          frames: [51, 52, 53, 54, 55]
      currentAnimation: 'move'
      framesPerSecond: 10
      width: 16
      height: 16

    @addComponent nv.RectanglePhysicsComponent,
      width: 16
      height: 16
      name: 'Ball'

    @startDelay = @model.startDelay
    @started = false
    @pendingCollision = false

    # Get dependencies
    @canvas = @scene.getEngineByType(nv.RenderingEngine).canvas

  "event(engine:collision:queued)": (data) ->
    return unless data.actor is this
    @pendingCollision = true

  "event(engine:collision:Ball:Player)": (data) ->
    ball = data.actor
    paddle = data.target
    impactVector = data.impactVector

    if data.impactVector.x isnt 0
      @model.x -= data.impactVector.x
      @model.direction.x = -@model.direction.x
    else if data.impactVector.y isnt 0
      @model.y -= data.impactVector.y
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
    if data.impactVector.x isnt 0
      @model.x -= data.impactVector.x + @model.direction.x
      @model.direction.x = -@model.direction.x
    else if data.impactVector.y isnt 0
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

nv.factory.register 'Ball', (scene, options = {}) ->
  new entities.Ball scene, options

