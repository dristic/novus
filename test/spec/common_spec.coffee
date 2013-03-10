describe "nv.Common", () ->
  it "should be able to bind functions", () ->
    object =
      foo: false

    changeFoo = () ->
      @foo = true
      
    nv.bind(object, changeFoo)()
    expect(object.foo).toEqual(true)