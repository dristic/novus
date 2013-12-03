(function() {
  describe("gleam.Text", function() {
    var canvas, text;
    text = null;
    canvas = null;
    beforeEach(function() {
      text = new gleam.Text;
      canvas = new gleam.Canvas;
      return spyOn(canvas.context, "fillText");
    });
    it("should have a draw function", function() {
      return expect(text.draw).toBeDefined();
    });
    return it("should draw text on the canvas", function() {
      canvas.draw([text]);
      expect(canvas.context.fillText).toHaveBeenCalled();
      return expect(canvas.context.source.fillStyle).toBe("#cccccc");
    });
  });

}).call(this);
