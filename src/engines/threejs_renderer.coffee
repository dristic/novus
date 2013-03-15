class nv.ThreejsRenderingEngine extends nv.Engine
  constructor: (scene, config) ->
    super scene, config

    @renderer = config.renderer
    @width = 400
    @height = 300

    WIDTH = 400
    HEIGHT = 300
    VIEW_ANGLE = 45
    ASPECT = WIDTH / HEIGHT
    NEAR = 0.1
    FAR = 10000

    @camera = new THREE.PerspectiveCamera VIEW_ANGLE, ASPECT, NEAR, FAR

    @threeScene = new THREE.Scene

    @threeScene.add @camera

    @camera.position.z = 300

    @renderer.setSize WIDTH, HEIGHT

    pointLight = new THREE.PointLight 0xFFFFFF
    pointLight.position.x = 10
    pointLight.position.y = 50
    pointLight.position.z = 130
    @threeScene.add pointLight

    scene.on "engine:rendering:create", (plugin) =>
      if plugin instanceof nv.ThreejsRenderingPlugin
        @threeScene.add plugin.object3d

    scene.on "engine:rendering:destroy", (plugin) =>
      if plugin instanceof nv.ThreejsRenderingPlugin
        @threeScene.remove plugin.object3d

    scene.fire "engine:timing:register:after", nv.bind(this, @draw)

    # scene.on "engine:gamepad:mouse:down", nv.bind(this, @onMouseDown)

  getSize: () ->
    {
      width: @width
      height: @height
    }
    
  draw: (dt) ->
    @renderer.render @threeScene, @camera

  onMouseDown: (data) ->
    for drawable in @drawables
      if drawable.clickable is true
        if drawable.bounds
          bounds = drawable.bounds()
          if bounds.contains new nv.Point(data.x, data.y)
            @scene.fire "engine:rendering:clicked:#{drawable.entity.constructor.name}", drawable.entity

  destroy: () ->
    #i = @drawables.length
    #while i--
    #  @drawables[i].destroy()

class nv.ThreejsRenderingPlugin extends nv.Plugin
  constructor: (scene, entity) ->
    super scene, entity

    @clickable = entity.model.clickable ? false

    @scene.fire "engine:rendering:create", this

  cache: (width, height) ->
    oldX = @entity.model.x
    oldY = @entity.model.y
    @entity.model.x = 0
    @entity.model.y = 0
    @cached = gl().size width, height
    @draw @cached.context, @cached
    @_draw = @draw
    @entity.model.x = oldX
    @entity.model.y = oldY
    @draw = (context, canvas) ->
      context.drawImage @cached, @entity.model.x, @entity.model.y

  draw: (context, canvas) ->
    # Do nothing

  destroy: () ->
    @scene.fire "engine:rendering:destroy", this

    super

class nv.ThreejsObjectPlugin extends nv.ThreejsRenderingPlugin
  constructor: (scene, entity) ->
    super scene, entity

    @object3d = @entity.model.object3d

  draw: (context, canvas) ->
    # Nothing

class nv.TextRenderingPlugin extends nv.RenderingPlugin
  constructor: (scene, entity) ->
    super scene, entity

    @text = new gl.text entity.model

  draw: (context, canvas) ->
    @text.draw context, canvas

class nv.PathRenderingPlugin extends nv.RenderingPlugin
  constructor: (scene, entity) ->
    super scene, entity

  draw: (context, canvas) ->
    for shape in @entity.model.shapes()
      context.setStrokeColor shape.strokeColor if shape.strokeColor
      context.setStrokeWidth shape.strokeWidth if shape.strokeWidth
      context.setFillStyle shape.fillStyle if shape.fillStyle

      context.beginPath()
      context.moveTo shape.points[0].x, shape.points[0].y

      $.each shape.points.slice(1), () ->
        context.lineTo this.x, this.y

      context.lineTo shape.points[0].x, shape.points[0].y

      context.fill() if shape.fillStyle
      context.stroke()
      context.closePath()
