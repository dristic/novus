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
		else
			context.drawImage @miner, @entity.model.x, @entity.model.y + 1

		idx = Math.floor( ((@entity.model.yield - 0.7) * 10) / 5 )
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

	"event(game:player:assigned)": () ->
		scenario = @scene.rootModel.get 'scenario'
		playerMetadata = @scene.rootModel.config.playerMetadata

		model =
			src: "/assets/turn-box.png"
			x: 560
			y: 5
			width: 59
			height: 72
		@border = new nv.SpriteUIPlugin(@scene, new nv.Entity(@scene, [], new nv.Model(model)))

		for player in @entity.model.players
			for country in player.countries()

				image = new Image()
				image.src = country.model.flag.src
				@flags.push nv.extend {image: image}, country.model.flag

			model = nv.extend playerMetadata[player.model.number-1].flag, {hidden: true, x: 567, y: 17}

			@turns.push new nv.SpriteUIPlugin(@scene, new nv.Entity(@scene, [], new nv.Model(model)))
			@turns[@entity.model.turn - 1].hidden = false


		model =
			src: playerMetadata[ @entity.model.playerNumber - 1 ].flag.src
			x: 5
			y: 5
			width: 32
			height: 32
		@shield = new nv.SpriteUIPlugin(@scene, new nv.Entity(@scene, [], new nv.Model(model)))

	"event(game:turn:end)": (turn) ->
		for indicator in @turns
			indicator.hidden = true
		@turns[turn - 1].hidden = false


	draw: (context, canvas) ->
		for flag in @flags
			context.drawImage flag.image, flag.x, flag.y

