class gleam.Text
  constructor: (options) ->
    defaults =
      color: '#CCC'
      x: 10
      y: 10
      font: 'bold 20px sans-serif'
      textBaseline: 'bottom'
      text: 'Lorem Ipsum'
    gleam.extend defaults, options unless not options
    gleam.extend this, defaults

  draw: (context, canvas) ->
    context.setFillStyle @color
    context.setFont @font
    context.setTextBaseline @textBaseline

    context.fillText @text, @x, @y