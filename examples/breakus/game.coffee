#= Require the novus version you are using here.
#= require ../../src/novus

#= Require any other libraries you need here.

#= require_tree config
#= require_tree renderers
#= require_tree models
#= require_tree entities

class Game extends nv.Game
  constructor: () ->
    super

    # Start game logic here.

$(() ->
  new Game
)