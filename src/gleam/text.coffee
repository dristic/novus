class gleam.Text
  constructor: (options) ->
    defaults =
      color: '#CCC'
      x: 10
      y: 10
      font: 'bold 20px sans-serif'
      textBaseline: 'bottom'
      textAlign: 'start'
      text: 'Lorem Ipsum'
      alpha: 1
    gleam.extend defaults, options unless not options
    gleam.extend this, defaults

  measureText: (context, canvas) =>
    context.save()
    context.setFont @font
    width = context.measureText(@text).width
    context.restore()
    width

  draw: (context, canvas) ->
    context.source.globalAlpha = @alpha
    context.setFillStyle @color
    context.setFont @font
    context.setTextBaseline @textBaseline
    context.setTextAlign @textAlign

    context.fillText @text, @x, @y
