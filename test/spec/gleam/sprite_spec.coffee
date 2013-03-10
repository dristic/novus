describe "gleam.Sprite", () ->
  sprite = null
  canvas = null

  beforeEach () ->
    sprite = new gleam.Sprite
    canvas = new gleam.Canvas

    spyOn canvas.context, 'drawImage'

  it "should have a draw function", () ->
    expect(sprite.draw).toBeDefined()

  it "should create an image", () ->
    expect(sprite.image).toBeDefined()

  it "should call draw image on the canvas", () ->
    sprite.loaded = true
    canvas.draw [sprite]

    expect(canvas.context.drawImage).toHaveBeenCalled()