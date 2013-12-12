class nv.PathRenderingComponent extends nv.RenderingComponent
  constructor: (scene, model, options) ->
    super scene, model, options

  draw: (context, canvas) ->
    for shape in @model.shapes()
      context.setStrokeStyle shape.strokeColor if shape.strokeColor
      context.setStrokeWidth shape.strokeWidth if shape.strokeWidth
      context.setFillStyle shape.fillStyle if shape.fillStyle

      context.beginPath()
      context.moveTo shape.points[0].x, shape.points[0].y

      for point in shape.points.slice(1)
        context.lineTo point.x, point.y

      context.lineTo shape.points[0].x, shape.points[0].y

      context.fill() if shape.fillStyle
      context.stroke()
      context.closePath()

