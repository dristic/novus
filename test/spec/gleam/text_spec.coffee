describe "gleam.Text", () ->
  text = null
  canvas = null

  beforeEach () ->
    text = new gleam.Text
    canvas = new gleam.Canvas

    spyOn canvas.context, "fillText"

  it "should have a draw function", () ->
    expect(text.draw).toBeDefined()

  it "should draw text on the canvas", () ->
    canvas.draw [text]

    expect(canvas.context.fillText).toHaveBeenCalled()
    expect(canvas.context.source.fillStyle).toBe("#cccccc")