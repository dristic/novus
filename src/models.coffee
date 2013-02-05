class Background
  constructor: () ->
    @canvas = gl().size 700, 700
    @x = 0
    @y = 0
    @width = @canvas.width
    @height = @canvas.height

    i = 0
    until i > 100
      i++
      x = Math.random() * 700
      y = Math.random() * 700
      radius = (Math.random() * 2) + 0.5
      @canvas.context.fillPath (context) ->
        context.color '#FFFFFF'
        context.arc x, y, radius, 0, Math.PI * 2, true

class Bullet
  constructor: (@x, @y, @angle) ->
    @id = null
    @speed = 400
    @radius = 3
    @alive = true

class Ship
  constructor: () ->
    @id = null
    @x = 0
    @y = 30
    @width = 12
    @height = 18
    @rotation = 0
    @speed = 5

class Asteroid
  constructor: (cw,ch) ->
    @id = null
    @x = cw * Math.random()
    @y = ch * Math.random()
    @width = 12
    @height = 12
    @rotation = 0
    @speed = Math.random() + 0.3
    @direction = (Math.random() * Math.PI) - (Math.PI / 2)

class Hud
  constructor: (@glcanvas) ->
    @x = 0
    @y = 0
    @width = @glcanvas.size().width
    @height = @glcanvas.size().height
    @color = "#FFF"
    @lives = 3
    @score = 100000

$(() ->
  nv.models =
    Background: Background
    Ship: Ship
    Bullet: Bullet
    Asteroid: Asteroid
    Hud: Hud
)