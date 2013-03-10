# describe "gl.Canvas", () ->
#   it "should create a canvas if none is provided", () ->
#     canvas = new gleam.Canvas
#     expect(canvas.element).toBeDefined()

#   it "should accept a canvas element", () ->
#     element = document.createElement 'canvas'
#     canvas = new gleam.Canvas element
#     expect(canvas.element).toBe(element)

#   describe "with a created canvas", () ->
#     canvas = undefined

#     beforeEach () ->
#       canvas = new gleam.Canvas

#     it "should allow you to set the size", () ->
#       canvas.setSize 500, 400
#       expect(canvas.get('width')).toBe(500)
#       expect(canvas.get('height')).toBe(400)
#       expect(canvas.get('halfWidth')).toBe(500 / 2)
#       expect(canvas.get('halfHeight')).toBe(400 / 2)

#     it "should allow you to set styles", () ->
#       canvas.setStyle 'background', 'black'
#       expect(canvas.element.style.background).toBe('black')

#     it "should allow you set opacity", () ->
#       canvas.set 'opacity', 0.5
#       expect(canvas.get('opacity')).toBe(0.5)
#       expect(canvas.context.globalAlpha).toBe(0.5)

#     it "should allow to fullscreen the canvas", () ->
#       canvas.fullscreen()
#       expect(canvas.get('width')).toBe(document.width)
#       expect(canvas.get('height')).toBe(document.height)
#       expect(document.body.style.overflow).toBe("hidden")

#     it "should allow for setting the clear color", () ->
#       canvas.setClearColor "#FF0000", 0.5
#       canvas.clear()
#       expect(canvas.get('clearColor')).toBe("#FF0000")
#       expect(canvas.get('clearOpacity')).toBe(0.5)
