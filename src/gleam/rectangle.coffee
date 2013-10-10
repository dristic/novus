class gleam.Rectangle
  constructor: (options) ->
    defaults =
      width: 10
      height: 10
      cornerRadius: 0
      x: 0
      y: 0
      alpha: 1
    gleam.extend defaults, options unless not options
    gleam.extend this, defaults

  draw: (context, canvas) ->
    context.source.globalAlpha = @alpha
    context.setStrokeStyle @strokeStyle if @strokeStyle
    context.setStrokeWidth @strokeWidth if @strokeWidth
    context.setFillStyle @fillStyle if @fillStyle

    context.beginPath()
    context.moveTo @x + @cornerRadius, @y
    context.lineTo @x + @width - @cornerRadius * 2, @y
    context.arcTo @x + @width, @y, @x + @width, @y + @cornerRadius, @cornerRadius if @cornerRadius
    context.lineTo @x + @width, @y + @height - @cornerRadius
    context.arcTo @x + @width, @y + @height, @x + @width - @cornerRadius, @y + @height, @cornerRadius if @cornerRadius
    context.lineTo @x + @cornerRadius, @y + @height
    context.arcTo @x, @y + @height, @x, @y + @height - @cornerRadius, @cornerRadius if @cornerRadius
    context.lineTo @x, @y + @cornerRadius
    context.arcTo @x, @y, @x + @cornerRadius, @y, @cornerRadius if @cornerRadius 

    context.stroke()
    context.fill() if @fillStyle
    context.closePath()

  destroy: () ->
    delete @fillStyle
