describe "gleam.base", () ->
  it "should create the main object with request frame functions", () ->
    expect(gleam).toBeDefined()
    expect(gleam.requestFrame).toBeDefined()
    expect(gleam.cancelFrame).toBeDefined()