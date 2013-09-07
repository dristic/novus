breakout.entities =
  background:
    entity: nv.Entity
    plugins: [ nv.SpriteRenderingPlugin ]
    model:
      options:
        src: '/assets/bg_prerendered.png'
        x: 0
        y: 0
  leftwall:
    plugins: [ nv.RectanglePhysicsPlugin ]
    entity: entities.Wall
    model:
      options:
        drawable: new gleam.Square
          width: 20
          height: 30 * 22
          color: "darkBlue"
        width: 20
        height: 30 * 22
        x: 0
        y: 0
        physicsObjectType: "passive"
  topwall:
    plugins: [ nv.RectanglePhysicsPlugin ]
    entity: entities.Wall
    model:
      options:
        drawable: new gleam.Square
          width: 30 * 18
          height: 20
          color: "darkBlue"
        width: 30 * 18
        height: 20
        x: 20
        y: 0
        physicsObjectType: "passive"
  rightwall:
    plugins: [ nv.RectanglePhysicsPlugin ]
    entity: entities.Wall
    model:
      options:
        drawable: new gleam.Square
          width: 20
          height: 30 * 22
          color: "darkBlue"
        width: 20
        height: 30 * 22
        x: 300
        y: 0
        physicsObjectType: "passive"

  player:
    plugins: [ nv.SpriteRenderingPlugin, nv.RectanglePhysicsPlugin ]
    entity: entities.Player
    model:
      options:
        src: 'assets/tiles.png'
        type: 'passive'
        width: 48
        height: 16
        origin:
          x: 0
          y: 64
          width: 48
          height: 16
        x: 100
        y: 368
        speed: 5
        physicsObjectType: "passive"
  ball:
    entity: entities.Ball
    plugins: [ nv.SpriteRenderingPlugin, nv.RectanglePhysicsPlugin ]
    model:
      options:
        startDelay: 3
        src: 'assets/tiles.png'
        origin:
          x: 48
          y: 64
          width: 16
          height: 16
        type: 'active'
        width: 16
        height: 16
        x: 150
        y: 250
        speed: 2
        speedIncrement: 0.2
        direction: new nv.Point(1, 1)
        physicsObjectType: "active"

  scoreboard:
    entity: entities.Scoreboard
    plugins: [ nv.DrawableRenderingPlugin ]
    model:
      klass: nv.Model
      options:
        drawable: new gleam.Text
          color: '#CCC'
          font: 'bold 40px courier'
          textBaseline: 'bottom'
          text: 'SCORE: 100'
        x: 36
        y: 760
        width: 400
        height: 40
        score: 0

  lives:
    entity: entities.Lives
    plugins: [ nv.DrawableRenderingPlugin ]
    model:
      klass: nv.Model
      options:
        drawable: new gleam.Text
          color: '#000'
          font: 'bold 60px courier'
          textBaseline: 'bottom'
          text: '***'
        x: 200
        y: 430
        width: 400
        height: 40
        lives: 4

  countdown:
    entity: entities.Countdown
    plugins: [ nv.AnimatedSpriteRenderingPlugin ]
    model:
      klass: nv.Model
      options:
        delay: 3
        src: 'assets/tiles.png'
        x: 144
        y: 176
        width: 32
        height: 48
        frameWidth: 32
        frameHeight: 48
        animations:
          count:
            frames: [12, 13, 14, "idle"]
          idle:
            frames: [14]
        currentAnimation: 'count'
        framesPerSecond: 1
        playing: true
