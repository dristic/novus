#= require_tree nv
#= require common
#= require nub
#= require gleam
#= require debug
#= require assets
#= require controllers

$(() ->
  # Setup network connection
  # connection = nub()

  # id = Math.random()
  # id = "Dan#{id}"
  # connection.auth id

  # connection.on 'asdf', (event) ->
  #   if event.userId isnt id
  #     glcanvas.addDrawable new nv.assets.Ship

  # connection.send 'asdf',
  #   userId: id
  #   something: 'herro'

  # Setup gl canvas
  glcanvas = gl 'canvas'

  glcanvas.size 500, 500
  glcanvas.background '#000'

  glcanvas.fullscreen()

  ship = new nv.assets.Ship
  bg = new nv.assets.Bg glcanvas
  bg2 = new nv.assets.Bg glcanvas
  asteroid = new nv.assets.Asteroid

  gamepad = nv.gamepad()
  gamepad.aliasKey 'left', nv.Key.A
  gamepad.aliasKey 'right', nv.Key.D
  gamepad.aliasKey 'up', nv.Key.W
  gamepad.aliasKey 'down', nv.Key.S
  gamepad.aliasKey 'shoot', nv.Key.Spacebar

  asteroidController = new nv.controllers.AsteroidController asteroid
  shipController = new nv.controllers.ShipController ship, gamepad, glcanvas

  controllers = [asteroidController, shipController]

  glcanvas.addDrawable ship
  glcanvas.addDrawable bg
  glcanvas.addDrawable bg2
  glcanvas.addDrawable asteroid

  square = new gl.square
  glcanvas.addDrawable square

  update = (dt) ->
    controller.update dt for controller in controllers

    for object in glcanvas.objects
      if object instanceof nv.assets.Bullet
        object.update dt
        if object.delete then glcanvas.removeDrawable object

    # Boundary Wrapping
    dimensions = glcanvas.size()
    if ship.x < 0 then ship.x = dimensions.height
    else if ship.x > dimensions.height then ship.x = 0

    if ship.y < 0 then ship.y = dimensions.height
    else if ship.y > dimensions.height then ship.y = 0

    bg.x = -ship.x * 0.05
    bg.y = -ship.y * 0.05

    bg2.x = -ship.x * 0.01
    bg2.y = -ship.y * 0.01

    square.x = -glcanvas.camera.x
    square.y = -glcanvas.camera.y
    #console.log glcanvas.camera.x, glcanvas.camera.y

  glcanvas.camera = nv.camera()
  glcanvas.camera.follow ship, 250, 250
  glcanvas.camera.zoom 0.5
  glcanvas.camera.zoom 1, 2000

  glcanvas.startDrawUpdate 60, update
)