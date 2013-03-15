#= Require the novus version you are using here.
#= require ../../src/novus

#= Require any other libraries you need here.
#= require ../../vendor/three

#= require_tree config
#= require_tree renderers
#= require_tree models
#= require_tree entities
#= require_tree scenes

nv.ready ->
  @app = new @Application