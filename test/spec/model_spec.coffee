describe "nv.Model", () ->
  model = null

  beforeEach () ->
    model = new nv.Model
      foo: 'bar'
      bar: 1

  it "should be able to get values.", () ->
    expect(model.get('foo')).toBe 'bar'

  it "should be able to set values.", () ->
    model.set 'pass', true
    expect(model.get('pass')).toBe true

  it "should be able to set many variables", () ->
    model.setMany
      bar: 'foo'
      pass: true

    expect(model.get('bar')).toBe 'foo'
    expect(model.get('pass')).toBe true

