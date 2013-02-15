class Background
  constructor: () ->
    @x = 0
    @y = 0


class GameObject
  constructor: (options) ->
    @id = null
    @x = 0
    @y = 0
    @width = 0
    @height = 0
    @rotation = 0

    for key,value of options
      this[key] = value

    @_path = []
    @_wireframe = []
    @initPath()

  initPath: () ->
    @_wireframe = @buildWireframe()
    @_updatePath()

  _updatePath: () ->
    cosine = Math.cos(@rotation)
    sine = Math.sin(@rotation)
    newPath = []
    gameObject = this
    $.each @_wireframe, () ->
      newPath.push new nv.Point(this.x * cosine - this.y * sine + gameObject.x, this.x * sine + this.y * cosine + gameObject.y)
    #console.log newPath[0].x,newPath[0].y, newPath[1].x, newPath[1].y, newPath[2].x, newPath[2].y
    @_path = newPath

  path: () ->
    @_path

  rotate: (r) ->
    @rotation += r
    @_updatePath()

  translate: (dx,dy) ->
    @x += dx
    @y += dy
    @_updatePath()


class Bullet
  constructor: (pt, @angle) ->
    @x = pt.x
    @y = pt.y
    @id = null
    @speed = 400
    @radius = 3
    @alive = true
    @life = 100


class Ship extends GameObject
  constructor: () ->
    super 
      x: 0
      y: 30
      width: 16
      height: 24
      speed: 5
      rotation: 0
      thrusters: false

  buildWireframe: () ->
    [ new nv.Point(0, -@height/2), new nv.Point(@width/2, @height/2), new nv.Point(0, @height*0.4), new nv.Point(-@width/2, @height/2) ]

  nose: () ->
    @_path[0]

class Asteroids extends nv.Collection
  constructor: (@initialSpawnCount) ->
    super

    for i in [1..@initialSpawnCount]
      @items.push new nv.models.Asteroid 500, 500

class Asteroid extends GameObject
  constructor: (cw,ch,scale = 1) ->
    super 
      x: cw * Math.random()
      y: ch * Math.random()
      width: 24 * scale
      height: 24 * scale
      speed: Math.random() + 0.3
      rotation: 0
      rotationSpeed: 0.01
      direction: (Math.random() * Math.PI) - (Math.PI / 2)

  buildWireframe: () ->
    pt = new nv.Point(0, -@height)
    points = []

    points.push pt.clone()
    points.push pt.translate(30,20).clone()
    points.push pt.translate(5,30).clone()
    points.push pt.translate(-12, 10).clone()
    points.push pt.translate(-33, -10).clone()
    points.push pt.translate(-10, -35).clone()
    points


class Hud extends nv.Model
  constructor: (@glcanvas) ->
    @x = 0
    @y = 0
    @width = @glcanvas.size().width
    @height = @glcanvas.size().height
    @color = "#FFF"
    @lives = 3
    @score = 100000

class Global extends nv.Model
  constructor: () ->
    @title = "Asteroids"
    @actionText = "Press <Space> to Start."
    @options =
      difficulty: "easy"

$(() ->
  nv.models =
    Background: Background
    Ship: Ship
    Bullet: Bullet
    Asteroid: Asteroid
    Asteroids: Asteroids
    Hud: Hud
    Global: Global
)