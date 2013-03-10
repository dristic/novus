describe "gleam.Context", () ->
  canvas = null
  context = null

  beforeEach () ->
    canvas = new gleam.Canvas
    context = canvas.context

    spyOn context.source, 'clearRect'
    spyOn context.source, 'fillRect'

  it "should throw an exception when path arguments are not divisble by 2", () ->
    func = () ->
      context.path 1, 2, 3
    expect(func).toThrow()

  it "should not throw an error when path argument are divisble by 2", () ->
    func = () ->
      context.path 1, 2, 3, 4
    expect(func).not.toThrow()

  it "should clear rect when no clear color is defined", () ->
    context.clearRect()

    expect(context.source.clearRect).toHaveBeenCalled()
    expect(context.source.fillRect).not.toHaveBeenCalled()

  it "should fill rect when a clear color is defined", () ->
    context.setClearColor "#FFF"
    context.clearRect()

    expect(context.source.fillRect).toHaveBeenCalled()
    expect(context.source.clearRect).not.toHaveBeenCalled()

  it "should allow all the same functions as a regular context", () ->
    expect(context.save).toBeDefined()
    expect(context.restore).toBeDefined()
    expect(context.fillRect).toBeDefined()
    expect(context.strokeRect).toBeDefined()
    expect(context.translate).toBeDefined()