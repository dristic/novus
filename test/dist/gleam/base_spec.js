(function() {
  describe("gleam.base", function() {
    it("should create the main object with request frame functions", function() {
      expect(gleam).toBeDefined();
      expect(gleam.requestFrame).toBeDefined();
      return expect(gleam.cancelFrame).toBeDefined();
    });
    return it("should allow for object extending", function() {
      var obj1, obj2;
      obj1 = {
        foo: "bar"
      };
      obj2 = {
        bar: "foo"
      };
      gleam.extend(obj1, obj2);
      return expect(obj1.bar).toBe("foo");
    });
  });

}).call(this);
