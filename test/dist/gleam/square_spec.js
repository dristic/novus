(function() {
  describe("gleam.Square", function() {
    var canvas, square;
    square = null;
    canvas = null;
    beforeEach(function() {
      square = new gleam.Square;
      canvas = new gleam.Canvas;
      spyOn(canvas.context, 'setFillStyle');
      return spyOn(canvas.context, 'fillRect');
    });
    it("should have a draw function", function() {
      return expect(square.draw).toBeDefined();
    });
    return it("should fill rect on the canvas", function() {
      canvas.draw([square]);
      expect(canvas.context.setFillStyle).toHaveBeenCalled();
      return expect(canvas.context.fillRect).toHaveBeenCalled();
    });
  });

}).call(this);
