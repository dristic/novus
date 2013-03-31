nv.gameConfig =
  canvas:
    height: 20 * 26
    width: 20 * 20
    fullscreen: false
    css:
      background: '#444'
      margin: '30px auto 0 auto'
      display: 'block'

  enginesToLoad: [ nv.RenderingEngine, nv.GamepadEngine, nv.PhysicsEngine, nv.TimingEngine, nv.DebugEngine]

  entities:
    leftwall:
      plugins: [ nv.DrawableRenderingPlugin, nv.RectanglePhysicsPlugin ]
      entity: entities.Wall
      model:
        options:
          drawable: new gleam.Square
            width: 20
            height: 20 * 22
            color: "darkBlue"
          width: 20
          height: 20 * 22
          x: 0
          y: 0
          physicsObjectType: "passive"
    topwall:
      plugins: [ nv.DrawableRenderingPlugin, nv.RectanglePhysicsPlugin ]
      entity: entities.Wall
      model:
        options:
          drawable: new gleam.Square
            width: 20 * 18
            height: 20
            color: "darkBlue"
          width: 20 * 18
          height: 20
          x: 20
          y: 0
          physicsObjectType: "passive"
    rightwall:
      plugins: [ nv.DrawableRenderingPlugin, nv.RectanglePhysicsPlugin ]
      entity: entities.Wall
      model:
        options:
          drawable: new gleam.Square
            width: 20
            height: 20 * 22
            color: "darkBlue"
          width: 20
          height: 20 * 22
          x: 20 * 19
          y: 0
          physicsObjectType: "passive"

    player:
      plugins: [ nv.DrawableRenderingPlugin, nv.RectanglePhysicsPlugin ]
      entity: entities.Player
      model:
        options:
          drawable: new gleam.Square
            width: 100
            height: 15
            color: "#FFF"
          type: 'passive'
          width: 100
          height: 15
          x: 250
          y: 450
          speed: 3
          physicsObjectType: "passive"
    ball:
      entity: entities.Ball
      plugins: [ nv.DrawableRenderingPlugin, nv.RectanglePhysicsPlugin ]
      model:
        options:
          drawable: new gleam.Circle
            width: 20
            height: 20
            color: "gradient(radial, center center, 0px, center center, 100%, color-stop(0%,rgba(125,126,125,1)), color-stop(100%,rgba(14,14,14,1)))"
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
          x: (scene, index) -> [40, 150, 260, 40, 150, 260, 40, 150, 260][index]
          y: (scene, index) -> [40, 40, 40, 70, 70, 70, 100, 100, 100][index]
        options:
          drawable: new gleam.Rectangle
            width: 100
            height: 20
            fillStyle: "darkOrange"
            strokeStyle: "darkRed"
            strokeWidth: 5
            cornerRadius: 8            
          type: "passive" 
          width: 100
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
        leftwall:
          include: "leftwall"
        topwall:
          include: "topwall"
        rightwall:
          include: "rightwall"
        player:
          include: "player"
        ball:
          include: "ball"
        brick:
          include: "brick"
          count: 9


