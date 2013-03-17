window.models = models = {}

class models.Background extends nv.Model
  constructor: () ->
    super 
      x: 0
      y: 0
      width: 500
      height: 500

class models.PathObject extends nv.Model
  constructor: (options, @defaultShape = "") ->
    @modelShapes = options.shapes if options.shapes?
    delete options.shapes
    super options

  preparePath: () ->
    points: []

  shouldDrawShape: (shapeName) ->
    false

  points: (shapeName = @defaultShape) ->
    shape = @prepareShape @modelShapes[shapeName]
    shape.points

  shapes: () ->
    shapes = []
    for shapeName of @modelShapes
      shapes.push @prepareShape(@modelShapes[shapeName]) if @shouldDrawShape shapeName
    shapes

  translate: (dx,dy) ->
    @x += dx
    @y += dy
    this

  rotate: (dr) ->
    @rotation += dr
    this

class models.Ship extends models.PathObject
  constructor: (options) ->
    super options, "ship"

  reset: () ->
    @x = 30
    @y = 30
    @thrusters = false
    @velocity = 0
    @health = 100
    @rotation = 0

  shouldDrawShape: (shapeName) ->
    switch shapeName
      when "ship" then true
      when "thrusters" then @thrusters
      else false

  prepareShape: (object) ->
    shape = $.extend({},object)
    model = this

    cosine = Math.cos(@rotation)
    sine = Math.sin(@rotation)

    path = []
    $.each shape.points, () ->
      path.push new nv.Point(this.x * cosine - this.y * sine + model.x, this.x * sine + this.y * cosine + model.y)
    shape.points = path
    shape


class models.Asteroid extends models.PathObject
  constructor: (options) ->
    super options
    ###
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
    ###

    @wireframe = @buildWireframe(scale * .5)

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
      points: @points()
      strokeColor: @strokeColor
      strokeWidth: @strokeWidth
    ]

  points: () ->
    cosine = Math.cos(@rotation)
    sine = Math.sin(@rotation)
    path = []
    model = this
    $.each @wireframe, () ->
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

    @wireframe = @buildWireframe()

  points: () ->
    path = []
    model = this
    $.each @wireframe, () ->
      path.push new nv.Point(model.x, model.y)
    path

  buildWireframe: () ->
    [ new nv.Point(0, 0) ]

  translate: (dx,dy) ->
    @x += dx
    @y += dy