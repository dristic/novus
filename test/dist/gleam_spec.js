(function() {

  describe("gl.Canvas", function() {
    it("should create a canvas if none is provided", function() {
      var canvas;
      canvas = new gleam.Canvas;
      return expect(canvas.element).toBeDefined();
    });
    it("should accept a canvas element", function() {
      var canvas, element;
      element = document.createElement('canvas');
      canvas = new gleam.Canvas(element);
      return expect(canvas.element).toBe(element);
    });
    return describe("with a created canvas", function() {
      var canvas;
      canvas = void 0;
      beforeEach(function() {
        return canvas = new gleam.Canvas;
      });
      it("should allow you to set the size", function() {
        canvas.setSize(500, 400);
        expect(canvas.get('width')).toBe(500);
        expect(canvas.get('height')).toBe(400);
        expect(canvas.get('halfWidth')).toBe(500 / 2);
        return expect(canvas.get('halfHeight')).toBe(400 / 2);
      });
      it("should allow you to set styles", function() {
        canvas.setStyle('background', 'black');
        return expect(canvas.element.style.background).toBe('black');
      });
      it("should allow you set opacity", function() {
        canvas.set('opacity', 0.5);
        expect(canvas.get('opacity')).toBe(0.5);
        return expect(canvas.context.globalAlpha).toBe(0.5);
      });
      it("should allow to fullscreen the canvas", function() {
        canvas.fullscreen();
        expect(canvas.get('width')).toBe(document.width);
        expect(canvas.get('height')).toBe(document.height);
        return expect(document.body.style.overflow).toBe("hidden");
      });
      return it("should allow for setting the clear color", function() {
        canvas.setClearColor("#FF0000", 0.5);
        canvas.clear();
        expect(canvas.get('clearColor')).toBe("#FF0000");
        return expect(canvas.get('clearOpacity')).toBe(0.5);
      });
    });
  });

}).call(this);
