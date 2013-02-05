class nv.Point
  constructor: (@x,@y) ->

  clone: () ->
    new nv.Point(@x,@y)

  translate: (dx, dy) ->
    @x += dx
    @y += dy
    this




class nv.Rect
  constructor: (@x,@y,@width,@height) ->

  clone: () ->
    new nv.Rect(@x,@y,@width,@height)

  contains: (pt) ->
    (pt.x >= @x and pt.x <= @x + @width) and  (pt.y >= @y and pt.y <= @y + @height)

  translate: (dx,dy) ->
    @x += dx
    @y += dy