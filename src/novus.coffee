#= require_tree nv
#= require common
#= require nub
#= require gleam
#= require debug
#= require models
#= require controllers
#= require renderers

class Main extends nv.Scene
  constructor: (@glcanvas, @gamepad, @callback) ->
    super

    @addModel 'Global', window.global ? new nv.models.Global
    @addModel 'Bg', new nv.models.Background
    @addModel 'Bg2', new nv.models.Background

    @addRenderer new nv.renderers.MainRenderer @glcanvas, @getModel('Global')
    @addRenderer new nv.renderers.BackgroundRenderer @glcanvas, @getModel('Bg')
    @addRenderer new nv.renderers.BackgroundRenderer @glcanvas, @getModel('Bg2')

    @square = new gl.square
    @glcanvas.addDrawable @square

    @glcanvas.camera = nv.camera()

    @glcanvas.startDrawUpdate 10, nv.bind(this, @update)

  update: (dt) ->
    state = @gamepad.getState()

    @square.x = state.mouse.x
    @square.y = state.mouse.y

    if state.shoot
      @destroy()

  destroy: () ->
    renderer.destroy() for renderer in @renderers
    @glcanvas.stopDrawUpdate()
    @callback() unless not @callback

class Game extends nv.Scene
  constructor: (glcanvas, @gamepad) ->
    @bg = new nv.models.Background
    @bg2 = new nv.models.Background
    @ship = new nv.models.Ship
    
    asteroid = new nv.models.Asteroid(500,500)
    asteroid2 = new nv.models.Asteroid(500, 500)
    asteroid3 = new nv.models.Asteroid(500, 500)
    hud = new nv.models.Hud glcanvas

    asteroidController = new nv.controllers.AsteroidController [asteroid, asteroid2, asteroid3], glcanvas
    shipController = new nv.controllers.ShipController @ship, glcanvas
    bulletController = new nv.controllers.BulletController @ship, glcanvas

    @controllers = [bulletController, asteroidController, shipController]

    bgRenderer = new nv.renderers.BackgroundRenderer(glcanvas, @bg, @ship)
    bg2Renderer = new nv.renderers.BackgroundRenderer(glcanvas, @bg2, @ship)
    shipRenderer = new nv.renderers.ShipRenderer(glcanvas, @ship)
    asteroidRenderer = new nv.renderers.AsteroidRenderer(glcanvas, [asteroid, asteroid2, asteroid3])
    hudRenderer = new nv.renderers.HudRenderer glcanvas, hud
    bulletRenderer = new nv.renderers.BulletRenderer glcanvas, []

    @renderers = [bgRenderer, bg2Renderer, shipRenderer, asteroidRenderer, hudRenderer, bulletRenderer]

    glcanvas.camera = nv.camera()
    glcanvas.camera.follow @ship, 250, 250
    glcanvas.camera.zoom 0.5
    glcanvas.camera.zoom 1, 2000  

    glcanvas.startDrawUpdate 60, (dt) =>
      @update.call this, dt

  update: (dt) ->
    controller.update(dt, @gamepad) for controller in @controllers

    @bg.x = -@ship.x * 0.05
    @bg.y = -@ship.y * 0.05

    @bg2.x = -@ship.x * 0.01
    @bg2.y = -@ship.y * 0.01

$(() ->
  canvasEl = document.querySelector('canvas')
  glcanvas = gl canvasEl

  document.body.appendChild glcanvas.canvas unless canvasEl isnt undefined

  glcanvas.size 500, 500
  glcanvas.background '#000'

  glcanvas.fullscreen()

  gamepad = nv.gamepad()
  gamepad.aliasKey 'left', nv.Key.A
  gamepad.aliasKey 'right', nv.Key.D
  gamepad.aliasKey 'up', nv.Key.W
  gamepad.aliasKey 'down', nv.Key.S
  gamepad.aliasKey 'shoot', nv.Key.Spacebar

  gamepad.trackMouse()

  new Main glcanvas, gamepad, () ->
    new Game glcanvas, gamepad
)