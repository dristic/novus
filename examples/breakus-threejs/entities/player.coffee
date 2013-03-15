class entities.Player extends nv.Entity
  constructor: (scene) ->
    # Create ball object
    width = 150
    height = 20
    depth = 20
    segments = 16
    squareMaterial = new THREE.MeshLambertMaterial
      color: 0xFFFFFF

    square = new THREE.Mesh(new THREE.CubeGeometry(width, height, depth, segments, segments, segments), squareMaterial)

    super scene, [nv.ThreejsObjectPlugin, nv.RectanglePhysicsPlugin],
      object3d: square
      offsetX: 75
      offsetY: 10
      type: 'passive'
      width: 150
      height: 20
      x: 250
      y: 450
      speed: 3

    scene.on "engine:gamepad:press:left", () =>
      @left = true
    scene.on "engine:gamepad:release:left", () =>
      @left = false
    scene.on "engine:gamepad:press:right", () =>
      @right = true
    scene.on "engine:gamepad:release:right", () =>
      @right = false

  update: (dt) ->
    @model.x += @model.speed unless not @right
    @model.x -= @model.speed unless not @left

    @model.x = 0 unless @model.x > 0
    @model.x = 350 unless @model.x < 350