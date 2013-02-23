describe("nv.Model", function () {
  var model;

  beforeEach(function () {
    model = new nv.Model({
      foo: 'bar',
      bar: 1
    });
  });

  it('should be able to get values.', function () {
    expect(model.get('foo')).toBe('bar');
  });

  it('should be able to set values.', function () {
    model.set('pass', true);
    expect(model.get('pass')).toBe(true);
  });

  it('should be able to set many variables.', function () {
    model.setMany({
      bar: 'foo',
      pass: true
    });

    expect(model.get('bar')).toBe('foo');
    expect(model.get('pass')).toBe(true);
  });

  // it('should be able to persist values in local storage.', function () {
  //   model.persist();

  //   expect(window.localStorage['Model']).toNotBe(null);
  // });

  // it('should be able to load values from local storage.', function () {
  //   model.set('pass', true);
  //   model.persist();
  //   model.set('pass', false);
  //   model.load();

  //   expect(model.get('pass')).toBe(true);
  // });
});