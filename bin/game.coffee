#= Require the novus version you are using here.
#= require path/to/novus-1.0.0-min

#= Require any other libraries you need here.

#= require_tree config
#= require_tree renderers
#= require_tree models
#= require_tree entities
#= require_tree scenes

nv.ready ->
  @app = new @Application