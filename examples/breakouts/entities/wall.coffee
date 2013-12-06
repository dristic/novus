class entities.Wall extends nv.Entity
  constructor: (scene, options = {}) ->
    super scene, options

    @model.set 'width', options.width ? 20
    @model.set 'height', options.height ? 30 * 22
    @model.set 'physicsObjectType', 'passive'

    @addComponent nv.RectanglePhysicsComponent,
      width: options.width ? 48
      height: options.height ? 16
      name: 'Wall'
    
  "event(engine:collision:Ball:Wall)": (data) ->
    return if data.target isnt this.model

  update: (dt) ->
    # Do nothing

nv.factory.register 'Wall', (scene, options = {}) ->
  wall = new entities.Wall scene, options

  if breakout.config.debug is true
    wall.addComponent nv.GleamRenderingComponent,
      drawable: new gleam.Square
        width: options.width ? 20
        height: options.height ? 30 * 22
        x: options.x
        y: options.y
        color: "darkBlue"

  wall

