class nv.TextUIPlugin extends nv.UIPlugin
  constructor: (scene, entity) ->
    super scene, entity

    # Used for telling what is interacted with
    @id = @entity.model.id

    @text = new gleam.Text @entity.model
    @dirty = true
    @values = {}

    if @entity.model.bind?
      binding = @scene.getEntity @entity.model.bind
      for match in @entity.model.text.match /\{{[\s\S]+?}}/g
        key = match.slice(2, -2)

        @values[key] = binding.model[key]
        @dirty = true

        binding.model.on "change:#{key}", (value) =>
          @values[key] = value
          @dirty = true

  updateText: () ->
    if @dirty
      text = @entity.model.text
      for key, value of @values
        value = value(key) if typeof value is "function"
        text = text.replace "{{" + key + "}}", value
      @text.text = text
      @dirty = false

  draw: (context, canvas) ->
    unless @hidden is true
      @updateText()
      @text.x = @entity.model.x
      @text.y = @entity.model.y
      @text.draw context, canvas
