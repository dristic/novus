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
  constructor: (pt, @angle) ->
    @x = pt.x
    @y = pt.y
    @id = null
    @speed = 400
    @radius = 3
    @alive = true
    @life = 100

class Ship
  constructor: () ->
    @id = null
    @x = 0
    @y = 30
    @width = 12
    @height = 18
    @rotation = 0
    @speed = 5
    @_path = []
    @_wireframe = []
    @initPath()

  initPath: () ->
    @_wireframe = [ new nv.Point(0, -@height/2), new nv.Point(@width/2, @height/2), new nv.Point(-@width/2, @height/2) ]
    @_updatePath()

  _updatePath: () ->
    cosine = Math.cos(@rotation)
    sine = Math.sin(@rotation)
    newPath = []
    ship = this
    $.each @_wireframe, () ->
      newPath.push new nv.Point(this.x * cosine - this.y * sine + ship.x, this.x * sine + this.y * cosine + ship.y)
    console.log newPath[0].x,newPath[0].y, newPath[1].x, newPath[1].y, newPath[2].x, newPath[2].y
    @_path = newPath

  nose: () ->
    @_path[0]

  path: () ->
    @_path

  rotate: (r) ->
    @rotation += r
    @_updatePath()

  translate: (dx,dy) ->
    @x += dx
    @y += dy
    @_updatePath()


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