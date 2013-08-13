
breakout.entities =
    background_layer1:
      entity: nv.Entity
      plugins: [ renderers.Background ]
      model:
        options:
          x: 0
          y: 0
          width: 500
          height: 500
    background_layer2:
      entity: nv.Entity
      plugins: [ renderers.Background ]
      model:
        options:
          x: 0
          y: 0
          width: 500
          height: 500
    asteroid:
      entity: entities.Asteroid
      plugins: [ nv.PathRenderingPlugin, nv.PathPhysicsPlugin ]
      model:
        klass: models.Asteroid
        initializers:
          scale: () -> Math.ceil(Math.random() * 4)
          x: (scene) -> scene.rootModel.get('canvas').getSize().width * Math.random()
          y: (scene) -> scene.rootModel.get('canvas').getSize().width * Math.random()
          size: () -> @scale
          width: () -> @scale * 12
          height: () -> @scale * 12
          direction: () -> (Math.random() * Math.PI) - (Math.PI / 2)
          speed: () -> Math.random() + 0.3
          rotationSpeed: () -> ((Math.random() / 10) - 0.05) / 8
        options:
          rotation: 0
          physicsObjectType: 'passive'
          strokeColor: '#FFF'
          strokeWidth: 3
          fillStyle: 'rgba(0,0,0,0.8)'
    ship:
      entity: entities.Ship
      plugins: [ renderers.Ship, nv.PathPhysicsPlugin, nv.GravityPhysicsPlugin ]
      model:
        klass: models.Ship
        initializers:
          thrustVector: () -> new nv.Point(0,0)
          x: (scene) -> scene.rootModel.get('canvas').getSize().width / 2
          y: (scene) -> scene.rootModel.get('canvas').getSize().height / 2
        options:
          velocity: 0
          health: 100
          shootDelay: 10
          width: 16
          height: 24
          rotation: 0
          thrusters: false
          physicsObjectType: 'both'
          shapes:
            ship:
              strokeColor: '#FFF'
              strokeWidth: 2
              fillStyle: '#000'
              points: [ new nv.Point(0, -12), new nv.Point(8,12), new nv.Point(0, 9.6), new nv.Point(-8,12) ]
            thrusters:
              strokeColor: 'orange'
              strokeWidth: 2
              fillStyle: 'yellow'
              points: [ new nv.Point(0,13.6), new nv.Point(4,16), new nv.Point(0,31.2), new nv.Point(-4,16) ]
    bullet:
      entity: entities.Bullet
      plugins: [ renderers.Bullet, nv.PathPhysicsPlugin ]
      model:
        klass: models.Bullet
        options:
          x: 0
          y: 0
          color: "#FF7600"
          speed: 400
          radius: 3
          alive: true
          life: 100
          angle: 0
          physicsObjectType: "active"
