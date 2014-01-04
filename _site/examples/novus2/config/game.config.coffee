nv.gameConfig =
  canvas:
    height: 745
    width: 500
    responsive: true
    css:
      background: '000'
      margin: '0 auto 0 auto'
      display: 'block'

  enginesToLoad: [ nv.RenderingEngine, nv.GamepadEngine, nv.PhysicsEngine, nv.TimingEngine, nv.DebugEngine, nv.SoundEngine, nv.ParticleEngine ]

  scenes:
    main:
      config:
        gamepad:
          keys:
            shoot: nv.Key.Spacebar
          trackMouse: true
      enginesUsed: [ nv.RenderingEngine, nv.GamepadEngine, nv.SoundEngine, nv.TimingEngine, nv.DebugEngine, nv.ParticleEngine ]

      entities:
        background_layer1: 
          include: "background_layer1"
        background_layer2:
          include: "background_layer2"
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
              text: "Novus"
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
        asteroid:
          include: "asteroid"
          count: 9
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
            up: nv.Key.W
            down: nv.Key.S
            shoot: nv.Key.Spacebar
          trackMouse: false
      enginesUsed: [ nv.RenderingEngine, nv.GamepadEngine, nv.PhysicsEngine, nv.TimingEngine, nv.DebugEngine, nv.SoundEngine, nv.ParticleEngine ]
      soundfx:
        shoot:
          asset: "/assets/sounds/pew_pew.wav"
          event: "engine:gamepad:press:shoot"
          action: "play"
        collision:
          asset: "/assets/sounds/depth_charge.wav"
          event: "engine:collision:Bullet:Asteroid"
          action: "play"
        thrusters:
          asset: "/assets/sounds/bullet_whizzing.wav"
          event: "entity:thrust:Ship"
          action: "play"
          maxPlayTime: 350
          startTime: 0.15
      entities:
        background_layer1:
          include: "background_layer1"
        background_layer2:
          include: "background_layer2"
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
              ships: () -> [ (nv.extend({},@ship)), (nv.extend({},@ship)).translate(20,0), (nv.extend({},@ship)).translate(40,0) ]
              width: (scene) -> scene.rootModel.get('canvas').width
              height: (scene) -> scene.rootModel.get('canvas').height
            options:
              color: '#FFF'
              font: "40px sans-serif"
              x: 0
              y: 0
              lives: 4
              score: 0
        ship:
          include: "ship"
        asteroid:
          include: "asteroid"
          count: 2
        bullet:
          include: "bullet"
          count: 0 # dont create any at init time

    gameover:
      config:
        gamepad:
          keys:
            shoot: nv.Key.Spacebar
          trackMouse: false
      enginesUsed: [ nv.RenderingEngine, nv.GamepadEngine, nv.SoundEngine, nv.TimingEngine, nv.DebugEngine, nv.ParticleEngine ]
      entities:
        background_layer1:
          include: "background_layer1"
        background_layer2:
          include: "background_layer2"
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
              y: 700
              font: "20px sans-serif"
              text: "Press <Space> to Play Again"
              strokeWidth: 0
              shadowBlur: 0
              fade: true
              fadeSpeed: 0.02
        asteroid:
          include: "asteroid"
          count: 9

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
