class entities.Title extends nv.Entity
  constructor: (scene, options) ->
    super scene, options

    @addComponent nv.TextRenderingComponent,
      color: "#FFF"
      font: "bold 25px sans-serif"
      text: "Click to Start"

nv.factory.register "Title", (scene, options = {}) ->
  new entities.Title scene, options
