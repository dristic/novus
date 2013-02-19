#= require nv/novus
#= require gleam

#= require entities
#= require models
#= require controllers
#= require renderers

class Asteroids extends nv.Game
  constructor: () ->
    super

    canvasEl = document.querySelector('canvas')
    glcanvas = gl canvasEl
    glcanvas.size 500, 500
    glcanvas.background '#000'
    glcanvas.fullscreen()

    document.body.appendChild glcanvas.canvas unless canvasEl isnt undefined

    @registerScene 'Main', Main
    @registerScene 'Game', Game

    @openScene 'Main', glcanvas

class Main extends nv.Scene
  constructor: (game, @glcanvas, @callback) ->
    super game

    # @addModel 'Global', window.global ? new nv.models.Global

    @addEntity new entities.Background(this, @glcanvas)

    # @square = new gl.square
    # @glcanvas.addDrawable @square
    @glcanvas.camera = nv.camera()
    @glcanvas.startDrawUpdate 10, nv.bind(this, @update)
    # @gamepad.trackMouse()

    @gamepad.aliasKey 'start', nv.Key.Spacebar

  fire: (event, data) ->
    console.log "[EVENT] - #{event}"

    super event, data

  update: (dt) ->
    state = @gamepad.getState()

    # @square.x = state.mouse.x
    # @square.y = state.mouse.y

    if state.start
      @destroy()

  destroy: () ->
    renderer.destroy() for renderer in @renderers
    @glcanvas.stopDrawUpdate()
    @callback() unless not @callback

class Game extends nv.Scene
  constructor: (@glcanvas) ->
    super

    @gamepad.aliasKey 'left', nv.Key.A
    @gamepad.aliasKey 'right', nv.Key.D
    @gamepad.aliasKey 'up', nv.Key.W
    @gamepad.aliasKey 'down', nv.Key.S
    @gamepad.aliasKey 'shoot', nv.Key.Spacebar

    @addModel 'bg', new nv.models.Background
    @addModel 'bg2', new nv.models.Background
    @addModel 'ship', new nv.models.Ship
    @addModel 'asteroids', new nv.models.Asteroids 30
    @addModel 'hud', new nv.models.Hud @glcanvas

    @addController new nv.controllers.AsteroidController this
    @addController new nv.controllers.ShipController this
    @addController new nv.controllers.BulletController this

    physicsController = new nv.controllers.GamePhysicsController this
    physicsController.trackObjects @getModel('asteroids').items
    physicsController.trackObject @getModel('ship')
    @addController physicsController

    @addRenderer new nv.renderers.BackgroundRenderer(@glcanvas, @getModel('bg'), @getModel('ship'))
    @addRenderer new nv.renderers.BackgroundRenderer(@glcanvas, @getModel('bg2'), @getModel('ship'))
    @addRenderer new nv.renderers.ShipRenderer(@glcanvas, @getModel('ship'))
    @addRenderer new nv.renderers.AsteroidRenderer(this, @glcanvas)
    @addRenderer new nv.renderers.HudRenderer @glcanvas, @getModel('hud')
    @addRenderer new nv.renderers.BulletRenderer this, @glcanvas

    @glcanvas.camera = nv.camera()
    @glcanvas.camera.follow @getModel('ship'), 250, 250
    @glcanvas.camera.zoom 0.5
    @glcanvas.camera.zoom 1, 2000

    @glcanvas.startDrawUpdate 60, (dt) =>
      @update.call this, dt

  update: (dt) ->
    super dt

    bg = @getModel('bg')
    bg2 = @getModel('bg2')
    ship = @getModel('ship')

    bg.x = -ship.x * 0.05
    bg.y = -ship.y * 0.05

    bg2.x = -ship.x * 0.01
    bg2.y = -ship.y * 0.01

$(() ->
  new Asteroids
)