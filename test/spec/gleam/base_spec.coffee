describe "gleam.base", () ->
  it "should create the main object with request frame functions", () ->
    expect(gleam).toBeDefined()
    expect(gleam.requestFrame).toBeDefined()
    expect(gleam.cancelFrame).toBeDefined()

  it "should allow for object extending", () ->
    obj1 =
      foo: "bar"
    obj2 =
      bar: "foo"
    gleam.extend obj1, obj2

    expect(obj1.bar).toBe("foo")