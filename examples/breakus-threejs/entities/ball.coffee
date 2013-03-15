class entities.Ball extends nv.Entity
  constructor: (scene) ->
    # Create ball object
    radius = 50
    segments = 16
    rings = 16
    sphereMaterial = new THREE.MeshLambertMaterial
      color: 0xCC0000

    sphere = new THREE.Mesh(new THREE.SphereGeometry(radius, segments, rings), sphereMaterial)

    super scene, [nv.ThreejsObjectPlugin, nv.RectanglePhysicsPlugin],
      object3d: sphere
      type: 'active'
      width: 20
      height: 20
      x: 150
      y: 250
      speed: 2
      speedIncrement: 0.2
      direction: new nv.Point(1, 1)

    @startDelay = 5
    @started = false

    # Get dependencies
    @renderer = @scene.getEngine(nv.ThreejsRenderingEngine)

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

      dimensions = @renderer.getSize()
      if @model.x < 0 then @model.direction.x = -@model.direction.x
      else if @model.x > dimensions.width - @model.width then @model.direction.x = -@model.direction.x

      if @model.y < 0 then @model.direction.y = -@model.direction.y

      else if @model.y > dimensions.height
        # Add in for god mode
        # @model.direction.y = -@model.direction.y
        @restart()
