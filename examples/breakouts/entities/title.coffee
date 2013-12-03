class entities.Title extends nv.Entity
  constructor: (scene, plugins, model) ->
    model = new nv.Model
      color: "#FFF"
      x: 85
      y: 350
      font: "bold 25px sans-serif"
      text: "Click to Start"

    plugins = [ nv.TextRenderingPlugin ]

    super scene, plugins, model

nv.factory.class 'Title', entities.Title

