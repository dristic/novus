class nv.Engine
  constructor: (@scene, @config) ->

  update: (dt) ->

  destroy: () ->
    delete @scene
    delete @config