nv.gameConfig =
  canvas:
    height: 500
    width: 500
    backgroundColor: '#000'
    fullscreen: true

  engines: ['rendering','gamepad','physics','sound','particle']

  scenes:
    main:
      sequence: 1
      config:
        gamepad:
          keys:
            start: nv.Key.Spacebar
          trackMouse: true

      entities:
        background_layer1:
          entity: "nv.Entity"
          plugins: [ "renderers.Background" ]
          model:
            x: 0
            y: 0
            width: 500
            height: 500
        background_layer2:
          entity: "nv.Entity"
          plugins: [ "renderers.Background" ]
          model:
            x: 0
            y: 0
            width: 500
            height: 500
        title:
          entity: "nv.Entity"
          plugins: [ "renderers.StrokeText" ]
          later: "effects.ShadowBlurAnimator"
          model:
            color: "#000"
            strokeColor: "#0F0"
            x: 200
            y: 320
            font: "bold italic 50px sans-serif"
            text: "Asteroids"
            strokeWidth: 2
            shadowBlur: 20
            shadowBlurIncrement: 0.2
        action_text:
          entity: "nv.Entity"
          plugins: [ "renderers.StrokeText" ]
          later: "effects.GlobalAlphaAnimator"
          model:
            color: "#0F0"
            x: 200
            y: 400
            font: "bold 20px sans-serif"
            text: "Press <Space> to Start"
            strokeWidth: 0
            shadowBlur: 0
            fade: true
            fadeSpeed: 0.02
        asteroids:
          entity: "entities.Asteroid"
          plugins: [ "nv.PathRenderingPlugin", "nv.PathPhysicsPlugin" ]
          models:
            count: 4
            model:
              scale: () -> Math.ceil(Math.random() * 4)






