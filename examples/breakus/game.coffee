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
    canvas.setSize 500, 500
    canvas.setStyle 'background', 'gray'
    canvas.setStyle 'margin', '30px auto 0 auto'
    canvas.setStyle 'display', 'block'

    document.body.appendChild canvas.element

    @registerEngine nv.DebugEngine
    @registerEngine nv.RenderingEngine
    @registerEngine nv.GamepadEngine

    @registerScene 'Main', scenes.Main

    @openScene 'Main', canvas

nv.ready ->
  new Game