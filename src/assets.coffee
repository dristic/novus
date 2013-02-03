class Background
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

class Bullet
  constructor: () ->
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
  constructor: () ->
    @id = null
    @x = 0
    @y = 0
    @width = 12
    @height = 12
    @rotation = 0
    @speed = Math.random() + 0.2
    @direction = (Math.random() * Math.PI) - (Math.PI / 2)


$(() ->
  nv.assets =
    Background: Background
    Ship: Ship
    Bullet: Bullet
    Asteroid: Asteroid
)