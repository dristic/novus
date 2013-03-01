window.models = models = {}

class models.Background extends nv.Model
  constructor: () ->
    super 
      x: 0
      y: 0
      width: 500
      height: 500

class models.Ship extends nv.Model
  constructor: () ->
    super
      thrustVector: new nv.Point(0,0)
      velocity: 0
      health: 100
      shootDelay: 10
      x: 30
      y: 30
      width: 16
      height: 24
      rotation: 0
      thrusters: false
      type: 'both'
      color: '#FFF'
      strokeColor: '#FFF'
      strokeWidth: 2
      thrustersColor: 'orange'
      thrustersWidth: 2
      thrustersFill: 'yellow'

    @buildWireframes()

  reset: () ->
    @x = 30
    @y = 30
    @thrusters = false
    @velocity = 0
    @health = 100
    @rotation = 0

  buildWireframes: () ->
    @shipWF =
      strokeColor: @strokeColor
      strokeWidth: @strokeWidth
      points: [ new nv.Point(0, -@height/2), new nv.Point(@width/2, @height/2), new nv.Point(0, @height*0.4), new nv.Point(-@width/2, @height/2) ]
    @thrustersWF =
      strokeColor: @thrustersColor
      strokeWidth: @thrustersWidth
      fillStyle: @thrustersFill
      points: [ new nv.Point(0, @height*0.4+4), new nv.Point((@width/2)-4, (@height/2)+4), new nv.Point(0, @height*1.3), new nv.Point((-@width/2)+4, (@height/2)+4) ]

  shapes: () ->
    shapes = []
    shapes.push @prepareShape(@shipWF)
    shapes.push @prepareShape(@thrustersWF) if @thrusters
    shapes

  path: (which = "ship") ->
    shape = @prepareShape @[which + "WF"]
    shape.points

  prepareShape: (wf) ->
    shape = $.extend({},wf)
    model = this

    cosine = Math.cos(@rotation)
    sine = Math.sin(@rotation)

    path = []
    $.each shape.points, () ->
      path.push new nv.Point(this.x * cosine - this.y * sine + model.x, this.x * sine + this.y * cosine + model.y)
    shape.points = path
    shape

  translate: (dx,dy) ->
    @x += dx
    @y += dy
    this

  rotate: (r) ->
    @rotation += r
    this

class models.Asteroid extends nv.Model
  constructor: (x, y, scale = 1, direction = null) ->
    super 
      x: x
      y: y
      width: 12 * scale
      height: 12 * scale
      speed: Math.random() + 0.3
      rotation: 0
      rotationSpeed: ((Math.random() / 10) - 0.05) / 8
      direction: direction || (Math.random() * Math.PI) - (Math.PI / 2)
      type: 'passive'
      strokeColor: '#FFF'
      strokeWidth: 2
      size: scale

    @points = @buildWireframe(scale * .5)

  buildWireframe: (scalar) ->
    pt = new nv.Point(0, -@height)
    points = []

    points.push pt.clone()
    points.push pt.translate(30 * scalar, 20 * scalar).clone()
    points.push pt.translate(5 * scalar, 30 * scalar).clone()
    points.push pt.translate(-12 * scalar, 10 * scalar).clone()
    points.push pt.translate(-33 * scalar, -10 * scalar).clone()
    points.push pt.translate(-10 * scalar, -35 * scalar).clone()
    points

  shapes: () ->
    [ 
      points: @path()
      strokeColor: @strokeColor
      strokeWidth: @strokeWidth
    ]

  path: () ->
    cosine = Math.cos(@rotation)
    sine = Math.sin(@rotation)
    path = []
    model = this
    $.each @points, () ->
      path.push new nv.Point(this.x * cosine - this.y * sine + model.x, this.x * sine + this.y * cosine + model.y)
    path

  translate: (dx,dy) ->
    @x += dx
    @y += dy

  rotate: (dr) ->
    @rotation += dr

class models.Bullet extends nv.Model
  constructor: (pt, angle) ->
    super
      x: pt.x
      y: pt.y
      color: "#ff7600"
      speed: 400
      radius: 3
      alive: true
      life: 100
      angle: angle
      type: 'active'

    @points = @buildWireframe()

  path: () ->
    path = []
    model = this
    $.each @points, () ->
      path.push new nv.Point(model.x, model.y)
    path

  buildWireframe: () ->
    [ new nv.Point(0, 0) ]

  translate: (dx,dy) ->
    @x += dx
    @y += dy