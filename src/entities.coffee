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

class WrappingEntity extends nv.Entity
  constructor: (args...) ->
    super args...

  wrap: () ->
    # Boundary Wrapping
    dimensions = @scene.get('canvas').size()

    if @model.x < 0 then @model.x = dimensions.width
    else if @model.x > dimensions.width then @model.x = 0

    if @model.y < 0 then @model.y = dimensions.height
    else if @model.y > dimensions.height then @model.y = 0

class entities.Ship extends WrappingEntity
  constructor: (scene) ->
    super scene, [nv.PathRenderingPlugin], new models.Ship

    @scene.on 'collision:Ship:Asteroid', (data) =>
      console.log "ship hit asteroid"
      @scene.dispatcher.fire 'delete:Ship',
        asset: data.actor

    @scene.on 'physics:collision:Ship:Asteroid', (data) ->
      console.log 'ship hit asteroid'

    @scene.on 'gamepad:left', () ->
      console.log 'gamepad left'

    # Rest of gamepad hooks....

  update: (dt) ->
    state = @scene.gamepad.getState()
    if state.left then @model.rotate -0.1
    if state.right then @model.rotate 0.1
    if state.up
      @model.translate @speed * Math.sin(@model.rotation), -@speed * Math.cos(@model.rotation)
    if state.down
      @model.translate -@speed/2 * Math.sin(@model.rotation), @speed/2 * Math.cos(@model.rotation)
    @model.thrusters = state.up

    @wrap()

    # state = @scene.gamepad.getState()
    # if state.left then @asset.rotate -0.1
    # if state.right then @asset.rotate 0.1
    # if state.up
    #   @asset.translate @speed * Math.sin(@asset.rotation), -@speed * Math.cos(@asset.rotation)
    # if state.down
    #   @asset.translate -@speed/2 * Math.sin(@asset.rotation), @speed/2 * Math.cos(@asset.rotation)
    # @asset.thrusters = state.up

    # wrap @asset, @scene.glcanvas