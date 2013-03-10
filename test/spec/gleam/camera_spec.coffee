describe "gleam.Camera", () ->
  camera = null
  canvas = null

  beforeEach () ->
    camera = new gleam.Camera
    canvas = new gleam.Canvas

    spyOn canvas.context, 'translate'
    spyOn canvas.context, 'scale'

  it "should allow for following an object", () ->
    expect(camera.follow).toBeDefined()

  it "should allow for zooming over time", () ->
    camera.zoom 1, 1000
    expect(camera.onUpdate).toBeDefined()

  it "should allow for zooming", () ->
    camera.zoom 1
    expect(camera.onUpdate).toBe(undefined)
    expect(camera.zoomValue).toBe(1)

  it "should translate and scale on update", () ->
    camera.update 0.5, canvas.context, canvas

    expect(canvas.context.translate).toHaveBeenCalled()
    expect(canvas.context.scale).toHaveBeenCalled()