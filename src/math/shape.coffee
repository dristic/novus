class nv.Point
  constructor: (@x,@y) ->

  clone: () ->
    new nv.Point(@x,@y)

  translate: (dx, dy) ->
    @x += dx
    @y += dy
    this

  add: (point) ->
    @x += point.x
    @y += point.y
    this

  times: (num) ->
    new nv.Point @x * num, @y * num
    this

  fromPolar: (ang, rad) ->
    @x = Math.cos(ang) * rad
    @y = Math.sin(ang) * rad
    this

  constrain: (rect) ->
    unless rect.contains this
      @x = 0 if @x < rect.x
      @x = rect.x2 if @x > rect.x2
      @y = 0 if @y < rect.y
      @y = rect.y2 if @y > rect.y2
    this

  eq: (pt) ->
    this.x is pt.x and this.y is pt.y

class nv.Rect
  constructor: (@x,@y,@x2,@y2) ->

  clone: () ->
    new nv.Rect(@x,@y,@x2,@y2)

  reset: (@x,@y,@x2,@y2) ->

  _checkPt: (tx,ty) ->
    (tx >= @x and tx <= @x2) and (ty >= @y and ty <= @y2)

  contains: (pt) ->
    @_checkPt pt.x, pt.y

  intersects: (rect) ->
    return false if @x2 < rect.x || @y2 < rect.y || @x > rect.x2 || @y > rect.y2
    true

    # //@_checkPt(rect.x, rect.y) || @_checkPt(rect.x, rect.y2) || @_checkPt(rect.x2, rect.y2) || @_checkPt(rect.x2, rect.y)

  translate: (dx,dy) ->
    @x += dx
    @y += dy
    this

  width: () ->
    @x2 - @x

  height: () ->
    @y2 - @y

  outset: (dx, dy) ->
    @x -= dx
    @x2 += dx
    @y -= dy
    @y2 += dy
    this

  inset: (dx, dy) ->
    @outset -dx, -dy
    this