(function() {
  describe("nv.Model", function() {
    var model;
    model = null;
    beforeEach(function() {
      return model = new nv.Model({
        foo: 'bar',
        bar: 1
      });
    });
    it("should be able to get values.", function() {
      return expect(model.get('foo')).toBe('bar');
    });
    it("should be able to set values.", function() {
      model.set('pass', true);
      return expect(model.get('pass')).toBe(true);
    });
    return it("should be able to set many variables", function() {
      model.setMany({
        bar: 'foo',
        pass: true
      });
      expect(model.get('bar')).toBe('foo');
      return expect(model.get('pass')).toBe(true);
    });
  });

}).call(this);
