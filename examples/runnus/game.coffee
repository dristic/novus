#= Require the novus version you are using here.
#= require ../../src/novus

#= Require any other libraries you need here.

#= require ./config/application
#= require_tree renderers
#= require_tree models
#= require_tree entities
#= require_tree scenes
#= require_tree config

nv.ready ->
  @app = new @Application