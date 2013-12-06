class entities.Player extends nv.Entity
  constructor: (scene, options = {}) ->
    super scene, options

    @model.set 'width', 48
    @model.set 'height', 16
    @model.set 'physicsObjectType', 'passive'

    @addComponent nv.SpriteRenderingComponent,
      src: 'assets/tiles.png'
      width: 48
      height: 16
      origin:
        x: 0
        y: 64
        width: 48
        height: 16
    @addComponent nv.RectanglePhysicsComponent,
      width: 48
      height: 16
      name: 'Player'

    @gamepadEngine = @scene.getEngineByType nv.GamepadEngine
    @gameWidth = breakout.config.graphics.width

  update: (dt) ->
    mouseX = @gamepadEngine.getState().mouse.x - (@model.width / 2)
    @model.set 'x', mouseX

nv.factory.register 'Player', (scene, options = {}) ->
  options.x = options.x ? 100
  options.y = options.y ? 368

  new entities.Player scene, options

