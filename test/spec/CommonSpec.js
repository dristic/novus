describe("nv.Common", function () {
  it("should be able to bind functions.", function () {
    var object = {
      foo: false
    };

    var changeFoo = function () {
      this.foo = true;
    }
    
    nv.bind(object, changeFoo)();

    expect(object.foo).toEqual(true);
  });
});