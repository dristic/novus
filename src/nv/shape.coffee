class nv.Point
  constructor: (@x,@y) ->

  clone: () ->
    new nv.Point(@x,@y)

  translate: (dx, dy) ->
    @x += dx
    @y += dy
    this




class nv.Rect
  constructor: (@x,@y,@x2,@y2) ->

  clone: () ->
    new nv.Rect(@x,@y,@x2,@y2)

  reset: (@x,@y,@x2,@y2) ->

  _checkPt: (tx,ty) ->
    (tx >= @x and tx <= @x2) and  (ty >= @y and ty <= @y2)

  contains: (pt) ->
    @_checkPt pt.x, pt.y

  intersects: (rect) ->
    @_checkPt(rect.x, rect.y) || @_checkPt(rect.x, rect.y2) || @_checkPt(rect.x2, rect.y2) || @_checkPt(rect.x2, rect.y)

  translate: (dx,dy) ->
    @x += dx
    @y += dy