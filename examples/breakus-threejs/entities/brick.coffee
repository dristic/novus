class entities.Brick extends nv.Entity
  constructor: (scene, x, y) ->
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
      offsetY: -10
      type: "passive"
      width: 150
      height: 20
      x: x
      y: y

    @scene.on "engine:collision:Ball:Brick", (data) =>
      @destroy() unless data.target isnt this