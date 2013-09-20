class nv.TextUIPlugin extends nv.UIPlugin
  constructor: (scene, entity) ->
    super scene, entity

    # Used for telling what is interacted with
    @id = @entity.model.id

    @text = new gleam.Text @entity.model

    if @entity.model.bind
      if typeof @entity.model.bind is "function"
        binding = @scene.getEntity @entity.model.bind
      else
        binding = @entity.model.bind
      for match in @entity.model.text.match /\{{([\s\S]+?)}}/g
        match = match.replace '{{', ''
        match = match.replace '}}', ''
        key = match
        binding.model.on "change:#{key}", (value) =>
          @text.text = @entity.model.text.replace "{{" + key + "}}", value
        @text.text = @entity.model.text.replace "{{" + key + "}}", binding.model[key]

  draw: (context, canvas) ->
    unless @hidden is true
      @text.x = @entity.model.x
      @text.y = @entity.model.y
      @text.draw context, canvas
