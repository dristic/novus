
breakout.levels = 
  level1:
    entities:
      brick:
        count: 20
        entity: entities.Brick
        plugins: [ nv.SpriteRenderingPlugin, nv.RectanglePhysicsPlugin ]
        model:
          klass: nv.Model
          initializers:
            x: (scene, index) -> [40, 145, 250, 355, 460][index % 5] + 1
            y: (scene, index) -> [60, 90, 120, 150][Math.floor(index / 5)]
          options:
            src: 'assets/tiles.png'
            width: 32
            height: 16
            origin:
              x: 0
              y: 0
              width: 32
              height: 16
            physicsObjectType: "passive"
            value: 50