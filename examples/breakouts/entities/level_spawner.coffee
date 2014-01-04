class entities.LevelSpawner extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model
    
  "event(spawn:level)": (data) ->
    levelData = breakout.levels[data]
    startX = 17
    x = startX # We want to center the bricks
    y = levelData.height # Skip the first line

    for row in levelData.data
      for cell in row
        color = "blue"
        switch cell
          when "X"
            # Do nothing
            a = 10
          when "b"
            color = "blue"
          when "o"
            color = "orange"
          when "r"
            color = "red"
          when "g"
            color = "green"

        @scene.createEntity 'Brick',
          x: x
          y: y
          color: color

        x += levelData.width

      y += levelData.height
      x = startX

nv.factory.register 'LevelSpawner', (scene, options = {}) ->
  new entities.LevelSpawner scene, options

