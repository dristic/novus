describe "gleam.Square", () ->
  square = null
  canvas = null

  beforeEach () ->
    square = new gleam.Square
    canvas = new gleam.Canvas

    spyOn canvas.context, 'setFillStyle'
    spyOn canvas.context, 'fillRect'

  it "should have a draw function", () ->
    expect(square.draw).toBeDefined()

  it "should fill rect on the canvas", () ->
    canvas.draw [square]

    expect(canvas.context.setFillStyle).toHaveBeenCalled()
    expect(canvas.context.fillRect).toHaveBeenCalled()