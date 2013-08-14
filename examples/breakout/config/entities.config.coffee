breakout.entities =
  leftwall:
    plugins: [ nv.DrawableRenderingPlugin, nv.RectanglePhysicsPlugin ]
    entity: entities.Wall
    model:
      options:
        drawable: new gleam.Square
          width: 30
          height: 30 * 22
          color: "darkBlue"
        width: 30
        height: 30 * 22
        x: 0
        y: 0
        physicsObjectType: "passive"
  topwall:
    plugins: [ nv.DrawableRenderingPlugin, nv.RectanglePhysicsPlugin ]
    entity: entities.Wall
    model:
      options:
        drawable: new gleam.Square
          width: 30 * 18
          height: 30
          color: "darkBlue"
        width: 30 * 18
        height: 30
        x: 30
        y: 0
        physicsObjectType: "passive"
  rightwall:
    plugins: [ nv.DrawableRenderingPlugin, nv.RectanglePhysicsPlugin ]
    entity: entities.Wall
    model:
      options:
        drawable: new gleam.Square
          width: 30
          height: 30 * 22
          color: "darkBlue"
        width: 30
        height: 30 * 22
        x: 30 * 19
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
        y: 665
        speed: 5
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
        speed: 5
        speedIncrement: 0.2
        direction: new nv.Point(1, 1)
        physicsObjectType: "active"
  brick:
    entity: entities.Brick
    plugins: [ nv.DrawableRenderingPlugin, nv.RectanglePhysicsPlugin ]
    model:
      klass: nv.Model
      initializers:
        x: (scene, index) -> [40, 145, 250, 355, 460][index % 5]
        y: (scene, index) -> [60, 90, 120, 150][Math.floor(index / 5)]
      options:
        drawable: new gleam.Rectangle
          width: 100
          height: 20
          fillStyle: "darkOrange"
          strokeStyle: "darkRed"
          strokeWidth: 5
          cornerRadius: 8            
        width: 100
        height: 20
        physicsObjectType: "passive"

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
          color: '#CCC'
          font: 'bold 60px courier'
          textBaseline: 'bottom'
          text: '***'
        x: 450
        y: 773
        width: 400
        height: 40
        lives: 4
