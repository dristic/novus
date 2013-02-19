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

class nv.RenderingPlugin extends nv.Plugin
  constructor: (scene, entity) ->
    super scene, entity

    @scene.fire "engine:rendering:create", this

  draw: (context, canvas) ->
    # Do nothing

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

zIndex = 0

class nv.ObjectRenderer
  constructor: (@glcanvas, @asset) ->
    @glcanvas.addDrawable this

  draw: (dt) ->

  destroy: () ->
    @glcanvas.removeDrawable this

  nextZIndex: () ->
    zIndex++

class nv.ObjectListRenderer
  constructor: (glcanvas, @assets) ->
    @classname = this.constructor.toString()
    @assetCounter = 0

    glcanvas.addDrawable this

    $.each @assets, (asset) =>
      @acquireAsset asset

  acquireAsset: (asset) ->
    asset.id = @classname + @assetCounter++
    asset

  add: (asset) ->
    @assets.push @acquireAsset(asset)
    asset

  remove: (target) ->
    @assets = @assets.filter (asset) ->
      asset.id isnt target.id

  draw: (dt) ->

  nextZIndex: () ->
    zIndex++