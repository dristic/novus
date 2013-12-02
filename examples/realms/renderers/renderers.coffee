class nv.AssignedLaborRenderer extends nv.RenderingPlugin
  constructor: (scene, entity) ->
    super scene, entity

    @farmer = new Image()
    @farmer.src = "/assets/farmer-16.png"

    @miner = new Image()
    @miner.src = "/assets/miner-16.png"

    @yields = []
    @yields.push new Image()
    @yields[0].src = "/assets/yield1-16.png"

    @yields.push new Image()
    @yields[1].src = "/assets/yield2-16.png"

    @yields.push new Image()
    @yields[2].src = "/assets/yield3-16.png"

  draw: (context, canvas) ->
    type = @entity.model.value
    return if type is "field" or type is "dirt"

    if type is "grain"
      context.drawImage @farmer, @entity.model.x, @entity.model.y + 1
      divisor = 1.33
    else
      context.drawImage @miner, @entity.model.x, @entity.model.y + 1
      divisor = 0.8

    idx = Math.floor( @entity.model.yield / divisor ) #Math.floor( ((@entity.model.yield - 0.2) * 10) / 8 )
    context.drawImage @yields[idx], @entity.model.x + 15, @entity.model.y + 15

    context.save()
    context.setFillStyle "#f1f1f1"
    context.setStrokeStyle "black"
    context.setFont "10px 'Lucida Console'"
    context.strokeText @entity.model.workers, @entity.model.x + 18, @entity.model.y + 11

    context.restore()


class renderers.PlayerManager extends nv.RenderingPlugin
  constructor: (scene, entity) ->
    super scene, entity
    @flags = []
    @turns = []
    @selectedCountry = 0
    @scale = @scene.getEntity(entities.ImageMap).scale

  "event(game:player:assigned)": () ->
    scenario = @scene.rootModel.get 'scenario'
    playerMetadata = @scene.rootModel.config.playerMetadata

    model =
      src: "/assets/beveled-round.png"
      x: -164
      y: 10
      width: 144
      height: 144
      anchor: "topRight"
    @border = new nv.SpriteUIPlugin(@scene, new nv.Entity(@scene, [], new nv.Model(model)))

    @loadFlags()

    for player in @entity.model.players
      model = nv.extend playerMetadata[player.model.number-1].flag, {hidden: true, x: -120, y: 55, width: 64, height: 64, anchor: "topRight"}

      @turns.push new nv.SpriteUIPlugin(@scene, new nv.Entity(@scene, [], new nv.Model(model)))
      @turns[@entity.model.turn - 1].hidden = false

    model =
      src: playerMetadata[ @entity.model.playerNumber - 1 ].flag.src
      x: 40
      y: 44
      width: 64
      height: 64
    @shield = new nv.SpriteUIPlugin(@scene, new nv.Entity(@scene, [], new nv.Model(model)))

    @selectedCountry = @entity.clientPlayer().selectedCountry().model.id

  loadFlags: () ->
    @flags = []
    for player in @entity.model.players
      for country in player.countries()
        image = new Image()
        image.src = country.model.flag.src
        @flags.push nv.extend {image: image, countryId: country.model.id}, country.model.flag

  "event(game:turn:end)": (turn) ->
    for indicator in @turns
      indicator.hidden = true
    @turns[turn - 1].hidden = false

  "event(game:selected:country)": (data) ->
    @selectedCountry = data.id
    @countryCount = @data.count

  "event(game:country:updated)": () ->
    @loadFlags()

  "event(game:map:scaled)": (scale) ->
    @scale = scale


  draw: (context, canvas) ->
    for flag in @flags
      scaledX = flag.x * @scale
      scaledY = flag.y * @scale

      if flag.countryId is @selectedCountry and @countryCount > 1
        context.save();
        context.source.scale(1, 0.5);
        context.setStrokeStyle "yellow"
        context.setStrokeWidth 3
        context.source.beginPath();
        context.source.arc(scaledX + (flag.width/2) - 1, 2*(scaledY + flag.height) - 10, 20, 0, Math.PI*2, false);
        context.stroke();
        context.closePath();
        context.restore();

      context.drawImage flag.image, scaledX, scaledY, flag.width, flag.height

    if @entity.attacking
      context.setLineDash? [4,4]
      context.setStrokeStyle "red"
      context.setStrokeWidth 2

      for country in @entity.countries
        data = country.model
        context.strokeRect data.bounds.x * @scale, data.bounds.y * @scale, data.bounds.width() * @scale, data.bounds.height() * @scale


class renderers.Seasons extends nv.RenderingPlugin
  constructor: (scene, entity) ->
    super scene, entity
    
    model =
      src: "/assets/beveled-round.png"
      x: -144
      y: -144
      width: 104
      height: 104
      anchor: "bottomRight"
    @border = new nv.SpriteUIPlugin(@scene, new nv.Entity(@scene, [], new nv.Model(model)))

    model =
      src: "/assets/season-wheel.png"
      x: -123
      y: -123
      width: 64
      height: 64
      rotate: 0
      anchor: "bottomRight"
    @wheel = new nv.SpriteUIPlugin(@scene, new nv.Entity(@scene, [], new nv.Model(model)))
    
    @season = 0
    @rotation = 0
    @animating = false
    @increment = Math.PI / 32

  "event(game:season:changed)": (season) ->
    @season = season
    @current = @wheel.entity.model.rotate
    @end = (Math.PI / 2) * season
    @end += Math.PI * 2 if @end < @current
    @animating = @current != @end
    #@wheel.entity.model.rotate = (Math.PI / 2) * season

  update: (dt) ->
    return unless @animating
    @current += @increment
    @wheel.entity.model.rotate = Math.min(@current, @end) % (2 * Math.PI)
    @animating = @current < @end
