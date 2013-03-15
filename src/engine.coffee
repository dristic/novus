class nv.Engine
  initializer: () ->

  constructor: (@scene, @config) ->
    @config = @config ? {}

  prepare: () ->

  update: (dt) ->

  destroy: () ->
    delete @scene
    delete @config