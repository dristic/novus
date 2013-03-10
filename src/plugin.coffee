class nv.Plugin
  constructor: (@scene, @entity) ->
    # Do nothing

  destroy: () ->
    delete @scene
    delete @entity