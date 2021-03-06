window.models = models = {}

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

  bounds: () ->
    x1 = x2 = y1 = y2 = null
    for point in @points()
      x1 = point.x if x1 == null || point.x < x1
      x2 = point.x if x2 == null || point.x > x2
      y1 = point.y if y1 == null || point.y < y1
      y2 = point.y if y2 == null || point.y > y2
    new nv.Rect x1, y1, x2, y2


class models.Ship extends models.PathObject
  constructor: (options) ->
    super options, "ship"

    @resetProps =
      x: @x
      y: @y
      thrusters: @thrusters
      health: @health
      rotation: @rotation
      thrustVector: new nv.Point(0,0)

  reset: () ->
    @setMany @resetProps

  shouldDrawShape: (shapeName) ->
    switch shapeName
      when "ship" then true
      when "thrusters" then @thrusters
      else false

  prepareShape: (object) ->
    shape = nv.extend({},object)
    model = this

    cosine = Math.cos(@rotation)
    sine = Math.sin(@rotation)

    path = []
    for point in shape.points
      path.push new nv.Point(point.x * cosine - point.y * sine + model.x, point.x * sine + point.y * cosine + model.y)
    shape.points = path
    shape


class models.Asteroid extends models.PathObject
  constructor: (options) ->
    super options
    @wireframe = @buildWireframe(@scale * .5)

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
      fillStyle: @fillStyle
    ]

  points: () ->
    cosine = Math.cos(@rotation)
    sine = Math.sin(@rotation)
    path = []
    model = this
    for point in @wireframe
      path.push new nv.Point(point.x * cosine - point.y * sine + model.x, point.x * sine + point.y * cosine + model.y)
    path

  translate: (dx,dy) ->
    @x += dx
    @y += dy

  rotate: (dr) ->
    @rotation += dr

class models.Bullet extends nv.Model
  constructor: (options) ->
    super options

    @wireframe = @buildWireframe()

  points: () ->
    path = []
    model = this
    for point in @wireframe
      path.push new nv.Point(model.x, model.y)
    path

  buildWireframe: () ->
    [ new nv.Point(0, 0) ]

  translate: (dx,dy) ->
    @x += dx
    @y += dy