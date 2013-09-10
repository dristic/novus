class entities.LevelSpawner extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model

    # Grab the brick data to spawn bricks with
    @brickData = scene.get("config").entities.blueBrick
    @entityConfig = scene.get("config").entities
    
  "event(spawn:level)": (data) ->
    levelData = @model.get("data")
    startX = 17
    x = startX # We want to center the bricks
    y = @brickData.model.options.height # Skip the first line

    for row in levelData
      for cell in row
        switch cell
          when "X"
            # Do nothing
            a = 10
          when "b"
            brickData = @entityConfig.blueBrick
            brickData.model.options.x = x
            brickData.model.options.y = y
            @scene.createEntity brickData
          when "o"
            brickData = @entityConfig.orangeBrick
            brickData.model.options.x = x
            brickData.model.options.y = y
            @scene.createEntity brickData
          when "r"
            brickData = @entityConfig.redBrick
            brickData.model.options.x = x
            brickData.model.options.y = y
            @scene.createEntity brickData
          when "g"
            brickData = @entityConfig.greenBrick
            brickData.model.options.x = x
            brickData.model.options.y = y
            @scene.createEntity brickData

        x += @brickData.model.options.width

      y += @brickData.model.options.height
      x = startX
