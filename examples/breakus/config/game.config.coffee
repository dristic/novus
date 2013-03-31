nv.gameConfig =
  canvas:
    height: 750
    width: 540
    fullscreen: false
    css:
      background: '#444'
      margin: '30px auto 0 auto'
      display: 'block'

  enginesToLoad: [ nv.RenderingEngine, nv.GamepadEngine, nv.PhysicsEngine, nv.TimingEngine, nv.DebugEngine]

  entities:
    barrier:
      entity: nv.entity
      plugins: [ nv.PathRenderingPlugin, nv.PathPhysicsPlugin ]
      model:
        klass: nv.PathShapeModel
        initializers:
          shapes: (scene) ->
            
          

    player:
      plugins: [ nv.DrawableRenderingPlugin, nv.RectanglePhysicsPlugin ]
      entity: entities.Player
      model:
        options:
          drawable: new gleam.Square
            width: 150
            height: 20
            color: "#FFF"
          type: 'passive'
          width: 150
          height: 20
          x: 250
          y: 450
          speed: 3
          physicsObjectType: "passive"
    ball:
      entity: entities.Ball
      plugins: [ nv.DrawableRenderingPlugin, nv.RectanglePhysicsPlugin ]
      model:
        options:
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
          speedIncrement: 0.2
          direction: new nv.Point(1, 1)
          physicsObjectType: "active"
    brick:
      entity: entities.Brick
      plugins: [ nv.DrawableRenderingPlugin, nv.RectanglePhysicsPlugin ]
      model:
        klass: nv.Model
        initializers:
          x: (scene, index) -> [10, 170, 330, 10, 170, 330, 10, 170, 330][index]
          y: (scene, index) -> [10, 10, 10, 40, 40, 40, 70, 70, 70][index]
        options:
          drawable: new gleam.Square
            width: 150
            height: 20
            color: "#FFF"
          type: "passive" 
          width: 150
          height: 20
          physicsObjectType: "passive"

  scenes:
    main:
      config:
        gamepad:
          keys:
            shoot: nv.Key.Spacebar
          trackMouse: false
      enginesUsed: [ nv.RenderingEngine, nv.GamepadEngine, nv.SoundEngine, nv.TimingEngine, nv.DebugEngine, nv.ParticleEngine ]

      entities: ""


    main:
      config:
        gamepad:
          keys:
            left: nv.Key.A
            right: nv.Key.D

      enginesUsed: [ nv.RenderingEngine, nv.GamepadEngine, nv.PhysicsEngine, nv.TimingEngine, nv.DebugEngine]

      entities:
        player:
          include: "player"
        ball:
          include: "ball"
        brick:
          include: "brick"
          count: 9


