(function() {
  describe("gleam.Camera", function() {
    var camera, canvas;
    camera = null;
    canvas = null;
    beforeEach(function() {
      camera = new gleam.Camera;
      canvas = new gleam.Canvas;
      spyOn(canvas.context, 'translate');
      return spyOn(canvas.context, 'scale');
    });
    it("should allow for following an object", function() {
      return expect(camera.follow).toBeDefined();
    });
    it("should allow for zooming over time", function() {
      camera.zoom(1, 1000);
      return expect(camera.onUpdate).toBeDefined();
    });
    it("should allow for zooming", function() {
      camera.zoom(1);
      expect(camera.onUpdate).toBe(void 0);
      return expect(camera.zoomValue).toBe(1);
    });
    return it("should translate and scale on update", function() {
      camera.update(0.5, canvas.context, canvas);
      expect(canvas.context.translate).toHaveBeenCalled();
      return expect(canvas.context.scale).toHaveBeenCalled();
    });
  });

}).call(this);
