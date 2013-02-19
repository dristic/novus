window.entities = entities = {}

class entities.Background extends nv.Entity
  constructor: (scene) ->
    super scene, [renderers.Background], new models.Background

class entities.Title extends nv.Entity
  constructor: (scene) ->
    super scene, [nv.TextRenderingPlugin],
      color: "#0F0"
      x: 200
      y: 200
      font: "bold 20px sans-serif"
      text: "Asteroids"

class entities.ActionText extends nv.Entity
  constructor: (scene) ->
    super scene, [nv.TextRenderingPlugin],
      color: "#0F0"
      x: 200
      y: 400
      font: "bold 20px sans-serif"
      text: "Press <Space> to Start"

class entities.Cursor extends nv.Entity
  constructor: (scene) ->
    super scene, [nv.DrawableRenderingPlugin],
      drawable: new gl.square

    @gamepad = @scene.gamepad

  update: (dt) ->
    state = @gamepad.getState()

    @model.drawable.x = state.mouse.x
    @model.drawable.y = state.mouse.y

class ShipModel extends nv.Model
  constructor: () ->
    super
      speed: 5
      health: 100
      shootDelay: 10
      x: 0
      y: 30
      width: 16
      height: 24
      rotation: 0
      thrusters: false
      type: 'both'
      color: '#FFF'
      strokeWidth: 2
      points: @buildWireFrame()

  buildWireFrame: () ->
    [ new nv.Point(0, -@height/2), new nv.Point(@width/2, @height/2), new nv.Point(0, @height*0.4), new nv.Point(-@width/2, @height/2) ]

class Ship extends nv.Entity
  constructor: (@scene) ->
    super @scene, [new RectanglePhysicsPlugin, new PathRenderPlugin], new ShipModel

    @scene.on 'physics:collision:Ship:Asteroid', (data) ->
      console.log 'ship hit asteroid'

    @scene.on 'gamepad:left', () ->
      console.log 'gamepad left'

    # Rest of gamepad hooks....

  update: (dt) ->
    wrap @model, @scene.model

    # state = @scene.gamepad.getState()
    # if state.left then @asset.rotate -0.1
    # if state.right then @asset.rotate 0.1
    # if state.up
    #   @asset.translate @speed * Math.sin(@asset.rotation), -@speed * Math.cos(@asset.rotation)
    # if state.down
    #   @asset.translate -@speed/2 * Math.sin(@asset.rotation), @speed/2 * Math.cos(@asset.rotation)
    # @asset.thrusters = state.up

    # wrap @asset, @scene.glcanvas