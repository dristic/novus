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

		scenario = scene.rootModel.get 'scenario'

		@flags = []
		@turns = []
		for name, data of scenario.countries
			image = new Image()
			image.src = data.flag.src
			@flags.push nv.extend {image: image}, data.flag

			model = nv.extend data.flag, {hidden: true, x: 560, y: 10}

			@turns.push new nv.SpriteUIPlugin(scene, new nv.Entity(scene, [], new nv.Model(model)))
			@turns[entity.model.turn - 1].hidden = false

	"event(game:turn:end)": (turn) ->
		for indicator in @turns
			indicator.hidden = true
		@turns[turn - 1].hidden = false


	draw: (context, canvas) ->
		for flag in @flags
			context.drawImage flag.image, flag.x, flag.y



