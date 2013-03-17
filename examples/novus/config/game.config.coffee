nv.gameConfig =
  canvas:
    height: 500
    width: 500
    fullscreen: true
    css:
      background: '#000'
      margin: '30px auto 0 auto'
      display: 'block'

  enginesToLoad: [ nv.RenderingEngine, nv.GamepadEngine, nv.PhysicsEngine, nv.TimingEngine, nv.DebugEngine, nv.SoundEngine, nv.ParticleEngine ]

  scenes:
    main:
      config:
        gamepad:
          keys:
            shoot: nv.Key.Spacebar
          trackMouse: false
      enginesUsed: [ nv.RenderingEngine, nv.GamepadEngine, nv.SoundEngine, nv.TimingEngine, nv.DebugEngine, nv.ParticleEngine ]
      entities:
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
        title:
          entity: nv.Entity
          plugins: [ renderers.StrokeText ]
          later: "effects.ShadowBlurAnimator"
          model:
            options:
              color: "#000"
              strokeColor: "#0F0"
              x: "center"
              y: 320
              font: "bold italic 50px sans-serif"
              text: "Asteroids"
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
              y: 400
              font: "bold 20px sans-serif"
              text: "Press <Space> to Start"
              strokeWidth: 0
              shadowBlur: 0
              fade: true
              fadeSpeed: 0.02
        asteroids:
          entity: entities.Asteroid
          plugins: [ nv.PathRenderingPlugin, nv.PathPhysicsPlugin ]
          models:
            count: 9
            model:
              options:
                scale: () -> Math.ceil(Math.random() * 4)

    game:
      config:
        gamepad:
          keys:
            left: nv.Key.A
            right: nv.Key.D
            up: nv.Key.W
            down: nv.Key.S
            shoot: nv.Key.Spacebar
          trackMouse: false
      enginesUsed: [ nv.RenderingEngine, nv.GamepadEngine, nv.PhysicsEngine, nv.TimingEngine, nv.DebugEngine, nv.SoundEngine, nv.ParticleEngine ]
      entities:
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
        ship:
          entity: entities.Ship
          plugins: [ renderers.Ship, nv.PathPhysicsPlugin, nv.GravityPhysicsPlugin ]
          model:
            klass: models.Ship
            options:
              thrustVector: new nv.Point(0,0)
              velocity: 0
              health: 100
              shootDelay: 10
              x: 30
              y: 30
              width: 16
              height: 24
              rotation: 0
              thrusters: false
              type: 'both'
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






