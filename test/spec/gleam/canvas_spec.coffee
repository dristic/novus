describe "gleam.Canvas", () ->
  describe "without a canvas", () ->
    canvas = null

    beforeEach () ->
      canvas = new gleam.Canvas

    it "should create a new canvas object", () ->
      expect(canvas.source).toBeDefined()
      expect(canvas.context).toBeDefined()

    it "should allow setting of style", () ->
      canvas.setStyle 'background', '#000'
      expect(canvas.source.style.background).toBe('rgb(0, 0, 0)')

    it "should allow setting of size", () ->
      canvas.setSize 300, 400
      expect(canvas.source.width).toBe(300)
      expect(canvas.source.height).toBe(400)

    it "should allow getting of size", () ->
      canvas.setSize 300, 400
      dimensions = canvas.getSize()
      expect(dimensions.width).toBe(300)
      expect(dimensions.height).toBe(400)

    it "should allow setting of full screen", () ->
      canvas.setFullscreen true
      expect(canvas.width).toBe(document.width)
      expect(canvas.height).toBe(document.height)

    it "should allow you to switch contexts", () ->
      canvas.getContext '3d'
      expect(canvas.context).toBeDefined()

    it "should allow drawing of a list of objects", () ->
      object =
        draw: () ->
          # Do nothing
      spyOn object, 'draw'
      canvas.draw [object]
      expect(object.draw).toHaveBeenCalled()

  describe "with a canvas", () ->
    canvas = null
    source = null

    beforeEach () ->
      source = document.createElement 'canvas'
      canvas = new gleam.Canvas source

    it "should use the canvas passed in", () ->
      expect(canvas.source).toBeDefined()
      expect(canvas.context).toBeDefined()
      expect(canvas.source).toBe(source)