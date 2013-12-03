(function() {
  describe("gleam.Sprite", function() {
    var canvas, sprite;
    sprite = null;
    canvas = null;
    beforeEach(function() {
      sprite = new gleam.Sprite;
      canvas = new gleam.Canvas;
      return spyOn(canvas.context, 'drawImage');
    });
    it("should have a draw function", function() {
      return expect(sprite.draw).toBeDefined();
    });
    it("should create an image", function() {
      return expect(sprite.image).toBeDefined();
    });
    return it("should call draw image on the canvas", function() {
      sprite.loaded = true;
      canvas.draw([sprite]);
      return expect(canvas.context.drawImage).toHaveBeenCalled();
    });
  });

}).call(this);
