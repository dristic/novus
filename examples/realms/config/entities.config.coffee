breakout.entities =
  background:
    entity: nv.Entity
    plugins: [ nv.SpriteRenderingPlugin ]
    model:
      options:
        src: '/assets/bg_prerendered.png'
        x: 0
        y: 0
  backgroundTiled:
    entity: nv.Entity
    plugins: [ nv.SpriteMapRenderingPlugin ]
    model:
      options:
        src: '/assets/tiles.png'
        x: 0
        y: 0
        tileWidth: 16
        tileHeight: 16
        # 11 = blank
        # 23 = gray
        # 35 = blank
        # 47 = top right
        # 59 = top left
        # 71 = vert wall
        # 83 = horiz wall
        # 95 = bottom cap
        # 107 = top cap
        data: [
          [59, 83, 83, 83, 83, 83, 83, 83, 83, 83, 83, 83, 83, 83, 83, 83, 83, 83, 83, 47],
          [71, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 71],
          [71, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 71],
          [71, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 71],
          [71, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 71],
          [71, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 71],
          [71, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 71],
          [71, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 71],
          [71, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 71],
          [71, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 71],
          [71, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 71],
          [71, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 71],
          [71, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 71],
          [71, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 71],
          [71, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 71],
          [71, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 71],
          [71, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 71],
          [71, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 71],
          [71, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 71],
          [71, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 71],
          [71, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 71],
          [71, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 71],
          [95, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 95],
          [23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23],
          [107, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 107],
          [95, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 95]
        ]
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
    plugins: [ nv.AnimatedSpriteRenderingPlugin, nv.RectanglePhysicsPlugin ]
    model:
      options:
        startDelay: 3
        src: 'assets/tiles.png'
        frameWidth: 16
        frameHeight: 16
        animations:
          move:
            frames: [51, 52, 53, 54, 55]
        currentAnimation: 'move'
        framesPerSecond: 10
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

  blueBrick:
    entity: entities.Brick
    plugins: [ nv.AnimatedSpriteRenderingPlugin, nv.RectanglePhysicsPlugin ]
    model:
      klass: nv.Model
      options:
        src: 'assets/tiles.png'
        width: 32
        height: 16
        frameWidth: 32
        frameHeight: 16
        animations:
          die:
            frames: [0, 1, 2, 3, 4, "dead"]
          dead:
            frames: [4]
          spawn:
            frames: [4, 3, 2, 1, 0, "idle"]
          idle:
            frames: [0]
        currentAnimation: 'spawn'
        framesPerSecond: 10
        playing: true
        physicsObjectType: "passive"
        value: 50

  orangeBrick:
    entity: entities.Brick
    plugins: [ nv.AnimatedSpriteRenderingPlugin, nv.RectanglePhysicsPlugin ]
    model:
      klass: nv.Model
      options:
        src: 'assets/tiles.png'
        width: 32
        height: 16
        frameWidth: 32
        frameHeight: 16
        animations:
          die:
            frames: [6, 7, 8, 9, 10, "dead"]
          dead:
            frames: [10]
          spawn:
            frames: [10, 9, 8, 7, 6, "idle"]
          idle:
            frames: [6]
        currentAnimation: 'spawn'
        framesPerSecond: 10
        playing: true
        physicsObjectType: "passive"
        value: 50

  redBrick:
    entity: entities.Brick
    plugins: [ nv.AnimatedSpriteRenderingPlugin, nv.RectanglePhysicsPlugin ]
    model:
      klass: nv.Model
      options:
        src: 'assets/tiles.png'
        width: 32
        height: 16
        frameWidth: 32
        frameHeight: 16
        animations:
          die:
            frames: [12, 13, 14, 15, 16, "dead"]
          dead:
            frames: [16]
          spawn:
            frames: [16, 15, 14, 13, 12, "idle"]
          idle:
            frames: [12]
        currentAnimation: 'spawn'
        framesPerSecond: 10
        playing: true
        physicsObjectType: "passive"
        value: 50

  greenBrick:
    entity: entities.Brick
    plugins: [ nv.AnimatedSpriteRenderingPlugin, nv.RectanglePhysicsPlugin ]
    model:
      klass: nv.Model
      options:
        src: 'assets/tiles.png'
        width: 32
        height: 16
        frameWidth: 32
        frameHeight: 16
        animations:
          die:
            frames: [18, 19, 20, 21, 22, "dead"]
          dead:
            frames: [22]
          spawn:
            frames: [22, 21, 20, 19, 18, "idle"]
          idle:
            frames: [18]
        currentAnimation: 'spawn'
        framesPerSecond: 10
        playing: true
        physicsObjectType: "passive"
        value: 50
