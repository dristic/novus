#= require entities.config

breakout.gameConfig =
  canvas:
    width: 320
    height: 416
    responsive: true
    css:
      background: '000'
      margin: '0 auto 0 auto'
      display: 'block'

  engines: [ nv.RenderingEngine, nv.GamepadEngine, nv.PhysicsEngine, nv.TimingEngine, nv.DebugEngine, nv.SoundEngine, nv.ParticleEngine ]

  scenes:
    main:
      config:
        gamepad:
          keys:
            shoot: nv.Key.Spacebar
          trackMouse: false
      enginesUsed: [ nv.RenderingEngine, nv.GamepadEngine, nv.SoundEngine, nv.TimingEngine, nv.DebugEngine, nv.ParticleEngine ]
      entities:
        background:
          include: "background"
        title:
          entity: nv.Entity
          plugins: [ renderers.StrokeText ]
          later: "effects.ShadowBlurAnimator"
          model:
            options:
              color: "#000"
              strokeColor: "#0F0"
              x: "center"
              y: 200
              font: "bold italic 50px sans-serif"
              text: "Breakout"
              strokeWidth: 2
              shadowBlur: 20
              shadowBlurIncrement: 0.2
        action_text:
          entity: nv.Entity
          plugins: [ renderers.StrokeText ]
          later: "effects.GlobalAlphaAnimator"
          model:
            options:
              color: "#0F0"
              x: "center"
              y: 250
              font: "20px sans-serif"
              text: "Press <Space> to Start"
              strokeWidth: 0
              shadowBlur: 0
              fade: true
              fadeSpeed: 0.02
        start_button:
          entity: nv.Entity
          plugins: [ nv.TouchTargetPlugin ]
          model:
            initializers:
              bounds: () -> new nv.Rect 10, 10, 100, 100
            options:
              action: "shoot"

    game:
      config:
        gamepad:
          keys:
            left: nv.Key.A
            right: nv.Key.D

      enginesUsed: [ nv.RenderingEngine, nv.GamepadEngine, nv.PhysicsEngine, nv.TimingEngine, nv.DebugEngine]

      soundfx:
        brick_collision:
          asset: "/assets/sounds/brickDeath.wav"
          event: "engine:collision:Ball:Brick"
          action: "play"

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
        # brick:
        #   include: "brick"
        #   count: 20
        scoreboard:
          include: "scoreboard"
        lives:
          include: "lives"

  levels:
      level1:
        entities:
          brick:
            count: 20
            entity: entities.Brick
            plugins: [ nv.DrawableRenderingPlugin, nv.RectanglePhysicsPlugin ]
            model:
              klass: nv.Model
              initializers:
                x: (scene, index) -> [40, 145, 250, 355, 460][index % 5] + 1
                y: (scene, index) -> [60, 90, 120, 150][Math.floor(index / 5)]
              options:
                drawable: new gleam.Rectangle
                  width: 98
                  height: 20
                  fillStyle: "darkOrange"
                  strokeStyle: "darkRed"
                  strokeWidth: 5
                  cornerRadius: 8            
                width: 98
                height: 20
                physicsObjectType: "passive"
                value: 50

  entities: breakout.entities
