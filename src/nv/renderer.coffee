class nv.ObjectRenderer
  constructor: (glcanvas, @asset) ->
    glcanvas.addDrawable this

  draw: (dt) ->


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
    @assets.push @decorateAsset(asset)
    asset

  remove: (target) ->
    @assets = @assets.filter (asset) ->
      asset.id isnt target.id

  draw: (dt) ->
