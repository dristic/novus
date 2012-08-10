#<< common
#<< nub
#<< gleam

class Bg
  constructor: () ->
    @canvas = gl().size 700, 700
    @x = 0
    @y = 0

    i = 0
    until i > 100
      i++
      x = Math.random() * 700
      y = Math.random() * 700
      radius = (Math.random() * 2) + 0.5
      @canvas.context.fillPath (context) ->
        context.color '#FFFFFF'
        context.arc x, y, radius, 0, Math.PI * 2, true

  draw: (context, canvas) ->
    context.drawImage @canvas, @x, @y

class Bullet
  constructor: (x, y, angle) ->
    @drawable = new gl.drawable
    @x = x
    @y = y
    @angle = angle
    @speed = 400
    @radius = 3

  update: (dt) ->
    @x += @speed * Math.sin(@angle) * dt
    @y -= @speed * Math.cos(@angle) * dt

    if @x < -100 or @x > 900
      if @y < -100 or @y > 900
        @delete = true

  draw: (context) ->
    context.fillPath (context) =>
      context.color '#ff7600'
      context.arc @x, @y, @radius, 0, Math.PI * 2, true

class Ship
  constructor: () ->
    @drawable = new gl.square
    @color = '#0F0'
    @x = 0
    @y = 30
    @width = 12
    @height = 18
    @rotation = 0
    @strokeWidth = 2

  draw: (context) ->
    context.strokeColor '#FFF'
    context.strokeWidth @strokeWidth

    context.rotateAround @x + (@width / 2), @y + (@height / 2), @rotation, () =>
      context.line @x, @y + @height,
        @x + (@width / 2), @y,
        @x + @width, @y + @height,
        @x, @y + @height

window.onload = () ->
  # Setup network connection
  # connection = nub()

  # id = Math.random()
  # connection.auth 'Dan#{id}'

  # Setup gl canvas
  glcanvas = gl 'canvas'

  glcanvas.size 500, 500
  glcanvas.background '#000'

  ship = new Ship
  bg = new Bg
  bg2 = new Bg

  glcanvas.addDrawable ship
  glcanvas.addDrawable bg
  glcanvas.addDrawable bg2

  gamepad = nv.gamepad()
  gamepad.aliasKey 'left', nv.Key.A
  gamepad.aliasKey 'right', nv.Key.D
  gamepad.aliasKey 'up', nv.Key.W
  gamepad.aliasKey 'down', nv.Key.S

  gamepad.aliasKey 'shoot', nv.Key.Spacebar

  speed = 5
  shootDelay = 10

  update = (dt) ->
    state = gamepad.getState()
    if state.left then ship.rotation -= 0.1
    if state.right then ship.rotation += 0.1
    if state.up
      ship.y -= speed * Math.cos(ship.rotation)
      ship.x += speed * Math.sin(ship.rotation)
    if state.down
      ship.y += speed / 2 * Math.cos(ship.rotation)
      ship.x -= speed / 2 * Math.sin(ship.rotation)

    # Shooting
    if state.shoot and shootDelay is 0
      glcanvas.addDrawable new Bullet ship.x, ship.y, ship.rotation
      shootDelay = 10

    if shootDelay then shootDelay--

    for object in glcanvas.objects
      if object instanceof Bullet
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

  glcanvas.startDrawUpdate 60, update