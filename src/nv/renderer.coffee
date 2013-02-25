class nv.RenderingEngine extends nv.Engine
  constructor: (scene) ->
    super scene

    @canvas = scene.options.canvas
    @context = @canvas.context
    @drawables = []

    scene.on "engine:rendering:create", (drawable) =>
      @drawables.push drawable

      @canvas.addDrawable drawable

    scene.on "engine:rendering:delete", (drawable) =>
      @drawables.splice @drawables.indexOf(drawable), 1

      @canvas.removeDrawable drawable

  destroy: () ->
    i = @drawables.length
    while i--
      @drawables[i].destroy()

class nv.RenderingPlugin extends nv.Plugin
  constructor: (scene, entity) ->
    super scene, entity

    @scene.fire "engine:rendering:create", this

  draw: (context, canvas) ->
    # Do nothing

  destroy: () ->
    @scene.fire "engine:rendering:delete", this

    super

class nv.DrawableRenderingPlugin extends nv.RenderingPlugin
  constructor: (scene, entity) ->
    super scene, entity

    @drawable = entity.model.drawable

  draw: (context, canvas) ->
    @drawable.draw context, canvas

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
      context.strokeColor shape.strokeColor if shape.strokeColor
      context.strokeWidth shape.strokeWidth if shape.strokeWidth
      context.color shape.fillStyle if shape.fillStyle

      context.beginPath()
      context.moveTo shape.points[0].x, shape.points[0].y

      $.each shape.points.slice(1), () ->
        context.lineTo this.x, this.y

      context.lineTo shape.points[0].x, shape.points[0].y

      context.fill() if shape.fillStyle
      context.stroke()
      context.closePath()

# zIndex = 0

# class nv.ObjectRenderer
#   constructor: (@glcanvas, @asset) ->
#     @glcanvas.addDrawable this

#   draw: (dt) ->

#   destroy: () ->
#     @glcanvas.removeDrawable this

#   nextZIndex: () ->
#     zIndex++

# class nv.ObjectListRenderer
#   constructor: (glcanvas, @assets) ->
#     @classname = this.constructor.toString()
#     @assetCounter = 0

#     glcanvas.addDrawable this

#     $.each @assets, (asset) =>
#       @acquireAsset asset

#   acquireAsset: (asset) ->
#     asset.id = @classname + @assetCounter++
#     asset

#   add: (asset) ->
#     @assets.push @acquireAsset(asset)
#     asset

#   remove: (target) ->
#     @assets = @assets.filter (asset) ->
#       asset.id isnt target.id

#   draw: (dt) ->

#   nextZIndex: () ->
#     zIndex++