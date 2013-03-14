nv.gameConfig =
  canvas:
    height: 500
    width: 500
    fullscreen: false
    css:
      background: '#444'
      margin: '30px auto 0 auto'
      display: 'block'

  enginesToLoad: [ nv.RenderingEngine, nv.GamepadEngine, nv.PhysicsEngine, nv.TimingEngine, nv.DebugEngine]
  enginez: ['rendering','gamepad','physics','timing','debug']

  scenes:
    main:
      config:
        gamepad:
          keys:
            up: nv.Key.W
            down: nv.Key.S
            left: nv.Key.A
            right: nv.Key.D
            shoot: nv.Key.Spacebar
      enginesUsed: [ nv.RenderingEngine, nv.GamepadEngine, nv.PhysicsEngine, nv.TimingEngine, nv.DebugEngine]
      entities:
        player:
          entity: "entities.Player"
          plugins: [ nv.DrawableRenderingPlugin, nv.RectanglePhysicsPlugin ]
          model:
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
        ball:
          entity: "entities.Ball"
          plugins: [ nv.DrawableRenderingPlugin, nv.RectanglePhysicsPlugin ]
          model:
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
        bricks:
          entity: "entities.Brick"
          plugins: [ nv.DrawableRenderingPlugin, nv.RectanglePhysicsPlugin ]
          models:
            count: 9
            model:
              drawable: new gleam.Square
                width: 150
                height: 20
                color: "#FFF"
              type: "passive"
              width: 150
              height: 20
              x: (index) -> [10, 170, 330, 10, 170, 330, 10, 170, 330]
              y: (index) -> [10, 10, 10, 40, 40, 40, 70, 70, 70]


