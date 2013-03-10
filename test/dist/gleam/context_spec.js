(function() {

  describe("gleam.Context", function() {
    var canvas, context;
    canvas = null;
    context = null;
    beforeEach(function() {
      canvas = new gleam.Canvas;
      context = canvas.context;
      spyOn(context.source, 'clearRect');
      return spyOn(context.source, 'fillRect');
    });
    it("should throw an exception when path arguments are not divisble by 2", function() {
      var func;
      func = function() {
        return context.path(1, 2, 3);
      };
      return expect(func).toThrow();
    });
    it("should not throw an error when path argument are divisble by 2", function() {
      var func;
      func = function() {
        return context.path(1, 2, 3, 4);
      };
      return expect(func).not.toThrow();
    });
    it("should clear rect when no clear color is defined", function() {
      context.clearRect();
      expect(context.source.clearRect).toHaveBeenCalled();
      return expect(context.source.fillRect).not.toHaveBeenCalled();
    });
    it("should fill rect when a clear color is defined", function() {
      context.setClearColor("#FFF");
      context.clearRect();
      expect(context.source.fillRect).toHaveBeenCalled();
      return expect(context.source.clearRect).not.toHaveBeenCalled();
    });
    return it("should allow all the same functions as a regular context", function() {
      expect(context.save).toBeDefined();
      expect(context.restore).toBeDefined();
      expect(context.fillRect).toBeDefined();
      expect(context.strokeRect).toBeDefined();
      return expect(context.translate).toBeDefined();
    });
  });

}).call(this);
