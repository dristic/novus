class entities.Title extends nv.Entity
  constructor: (scene, options = {}) ->
    super scene, options

    @addComponent nv.TextRenderingComponent,
      color: "#000"
      font: "bold 25px sans-serif"
      text: "Click to Start"

nv.factory.register 'Title', (scene, options = {}) ->
  options.x = options.x ? 85
  options.y = options.y ? 350

  new entities.Title scene, options

