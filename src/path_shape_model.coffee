
class nv.PathShapeModel extends nv.Model
  constructor: (options, @defaultShape = "") ->
    @modelShapes = options.shapes if options.shapes?
    delete options.shapes
    super options

  preparePath: () ->
    points: []

  shouldDrawShape: (shapeName) ->
    true

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
    $.each @points(), () ->
      x1 = this.x if x1 == null || this.x < x1
      x2 = this.x if x2 == null || this.x > x2
      y1 = this.y if y1 == null || this.y < y1
      y2 = this.y if y2 == null || this.y > y2
    new nv.Rect x1, y1, x2, y2
