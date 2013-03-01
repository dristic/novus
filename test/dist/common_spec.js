(function() {

  describe("nv.Common", function() {
    return it("should be able to bind functions", function() {
      var changeFoo, object;
      object = {
        foo: false
      };
      changeFoo = function() {
        return this.foo = true;
      };
      nv.bind(object, changeFoo)();
      return expect(object.foo).toEqual(true);
    });
  });

}).call(this);
