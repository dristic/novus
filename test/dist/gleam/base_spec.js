(function() {

  describe("gleam.base", function() {
    return it("should create the main object with request frame functions", function() {
      expect(gleam).toBeDefined();
      expect(gleam.requestFrame).toBeDefined();
      return expect(gleam.cancelFrame).toBeDefined();
    });
  });

}).call(this);
