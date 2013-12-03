(function() {
  describe("gleam.Canvas", function() {
    describe("without a canvas", function() {
      var canvas;
      canvas = null;
      beforeEach(function() {
        return canvas = new gleam.Canvas;
      });
      it("should create a new canvas object", function() {
        expect(canvas.source).toBeDefined();
        return expect(canvas.context).toBeDefined();
      });
      it("should allow setting of style", function() {
        canvas.setStyle('background', '#000');
        return expect(canvas.source.style.background).toBe('rgb(0, 0, 0)');
      });
      it("should allow setting of size", function() {
        canvas.setSize(300, 400);
        expect(canvas.source.width).toBe(300);
        return expect(canvas.source.height).toBe(400);
      });
      it("should allow getting of size", function() {
        var dimensions;
        canvas.setSize(300, 400);
        dimensions = canvas.getSize();
        expect(dimensions.width).toBe(300);
        return expect(dimensions.height).toBe(400);
      });
      it("should allow setting of full screen", function() {
        canvas.setFullscreen(true);
        expect(canvas.width).toBe(document.width);
        return expect(canvas.height).toBe(document.height);
      });
      it("should allow you to switch contexts", function() {
        canvas.getContext('3d');
        return expect(canvas.context).toBeDefined();
      });
      return it("should allow drawing of a list of objects", function() {
        var object;
        object = {
          draw: function() {}
        };
        spyOn(object, 'draw');
        canvas.draw([object]);
        return expect(object.draw).toHaveBeenCalled();
      });
    });
    return describe("with a canvas", function() {
      var canvas, source;
      canvas = null;
      source = null;
      beforeEach(function() {
        source = document.createElement('canvas');
        return canvas = new gleam.Canvas(source);
      });
      return it("should use the canvas passed in", function() {
        expect(canvas.source).toBeDefined();
        expect(canvas.context).toBeDefined();
        return expect(canvas.source).toBe(source);
      });
    });
  });

}).call(this);
