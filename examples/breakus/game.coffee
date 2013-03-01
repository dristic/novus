#= Require the novus version you are using here.
#= require ../../src/novus

#= Require any other libraries you need here.

#= require_tree config
#= require_tree renderers
#= require_tree models
#= require_tree entities
#= require_tree scenes

class Game extends nv.Game
  constructor: () ->
    super

    canvas = new gleam.Canvas
    console.log canvas
    canvas.setSize 500, 500
    canvas.setBackground '#000'
    canvas.setStyle 'margin', '30px auto 0 auto'

    document.body.appendChild canvas.element

    @registerEngine nv.RenderingEngine

    @registerScene 'Main', scenes.Main

    @openScene 'Main', canvas

nv.ready ->
  new Game