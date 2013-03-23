nv.gameConfig =
  canvas:
    height: 500
    width: 500
    fullscreen: true
    css:
      background: '#000'
      margin: '0 auto 0 auto'
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
              font: "20px sans-serif"
              text: "Press <Space> to Start"
              strokeWidth: 0
              shadowBlur: 0
              fade: true
              fadeSpeed: 0.02
        asteroids:
          entity: entities.Asteroid
          plugins: [ nv.PathRenderingPlugin ]
          count: 9
          model:
            klass: models.Asteroid
            initializers:
              scale: () -> Math.ceil(Math.random() * 4)
              x: (scene) -> scene.get('canvas').getSize().width * Math.random()
              y: (scene) -> scene.get('canvas').getSize().width * Math.random()
              size: (scene, idx) -> @scale
              width: (scene, idx) -> @scale * 12
              height: (scene, idx) -> @scale * 12
              direction: () -> (Math.random() * Math.PI) - (Math.PI / 2)
              speed: () -> Math.random() + 0.3
              rotationSpeed: () -> ((Math.random() / 10) - 0.05) / 8
            options:
              rotation: 0
              physicsObjectType: 'passive'
              strokeColor: '#FFF'
              strokeWidth: 2

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
        hud:
          entity: entities.Hud
          plugins: [ renderers.Hud ]
          model:
            initializers:
              ship: () -> new models.Ship
                x: 20
                y: 20
                rotation: 0
                strokeColor: '#FFF'
                strokeWidth: 2
                shapes:
                  ship:
                    points: [ new nv.Point(0, -12), new nv.Point(8,12), new nv.Point(0, 9.6), new nv.Point(-8,12) ]
              ships: () -> [ ($.extend({},@ship)), ($.extend({},@ship)).translate(20,0), ($.extend({},@ship)).translate(40,0) ]
              width: (scene) -> scene.get('canvas').width
              height: (scene) -> scene.get('canvas').height
            options:
              color: '#FFF'
              font: "40px sans-serif"
              x: 0
              y: 0
              lives: 4
              score: 0
        ship:
          entity: entities.Ship
          plugins: [ renderers.Ship, nv.PathPhysicsPlugin, nv.GravityPhysicsPlugin ]
          model:
            klass: models.Ship
            initializers:
              thrustVector: () -> new nv.Point(0,0)
              x: (scene) -> scene.get('canvas').getSize().width / 2
              y: (scene) -> scene.get('canvas').getSize().height / 2
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
        asteroid:
          entity: entities.Asteroid
          plugins: [ nv.PathRenderingPlugin, nv.PathPhysicsPlugin ]
          count: 20
          model:
            klass: models.Asteroid
            initializers:
              scale: () -> Math.ceil(Math.random() * 4)
              x: (scene) -> scene.get('canvas').getSize().width * Math.random()
              y: (scene) -> scene.get('canvas').getSize().width * Math.random()
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
              strokeWidth: 2
        bullet:
          entity: entities.Bullet
          plugins: [ renderers.Bullet, nv.PathPhysicsPlugin ]
          count: 0
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

    gameover:
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
              text: "High Scores"
              strokeWidth: 2
              shadowBlur: 20
              shadowBlurIncrement: 0.2
        highscores:
          entity: nv.Entity
          plugins: [ renderers.StrokeText ]
          later: "effects.ShadowBlurAnimator"
          model:
            options:
              color: "#000"
              strokeColor: "#0F0"
              x: "center"
              y: 420
              font: "30px sans-serif"
              text: ["STV        10,000\n", 
                    "DAN         7,400\n",
                    "ARN         5,000\n",
                    "BEN         3,200\n",
                    "DAN         3,000\n",
                    "DKO         2,550"]
              lineHeight: 40
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
              y: 800
              font: "20px sans-serif"
              text: "Press <Space> to Play Again"
              strokeWidth: 0
              shadowBlur: 0
              fade: true
              fadeSpeed: 0.02
        asteroids:
          entity: entities.Asteroid
          plugins: [ nv.PathRenderingPlugin ]
          count: 9
          model:
            klass: models.Asteroid
            initializers:
              scale: () -> Math.ceil(Math.random() * 4)
              x: (scene) -> scene.get('canvas').getSize().width * Math.random()
              y: (scene) -> scene.get('canvas').getSize().width * Math.random()
              size: (scene, idx) -> @scale
              width: (scene, idx) -> @scale * 12
              height: (scene, idx) -> @scale * 12
              direction: () -> (Math.random() * Math.PI) - (Math.PI / 2)
              speed: () -> Math.random() + 0.3
              rotationSpeed: () -> ((Math.random() / 10) - 0.05) / 8
            options:
              rotation: 0
              physicsObjectType: 'passive'
              strokeColor: '#FFF'
              strokeWidth: 2