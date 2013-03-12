class nv.Engine
  constructor: (@scene, @config) ->
    @config = @config ? {}

  update: (dt) ->

  destroy: () ->
    delete @scene
    delete @config