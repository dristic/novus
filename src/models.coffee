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

__gameObjectCounter = 0

class GameObject
  constructor: (options) ->
    @id = "#{this.constructor.name}#{__gameObjectCounter++}"
    @x = 0
    @y = 0
    @width = 0
    @height = 0
    @rotation = 0
    @type = 'passive'

    for key,value of options
      this[key] = value

    @_path = []
    @_wireframe = []
    @_bounds = new nv.Rect 0,0,0,0
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
    @_updateBounds()

  _updateBounds: () ->
    x1 = x2 = y1 = y2 = null
    $.each @_path, () ->
      x1 = this.x if x1 == null || this.x < x1
      x2 = this.x if x2 == null || this.x > x2
      y1 = this.y if y1 == null || this.y < y1
      y2 = this.y if y2 == null || this.y > y2
    @_bounds.reset x1, y1, x2, y2

  path: () ->
    @_path

  bounds: () ->
    @_bounds

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
      type: 'both'

  buildWireframe: () ->
    [ new nv.Point(0, -@height/2), new nv.Point(@width/2, @height/2), new nv.Point(0, @height*0.4), new nv.Point(-@width/2, @height/2) ]

  nose: () ->
    @_path[0]


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
      type: 'passive'

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