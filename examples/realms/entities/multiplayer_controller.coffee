class entities.MultiplayerController extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model

    @guid = nv.guid()
    @playerManager = scene.getEntity(entities.PlayerManager)
    @hash = location.hash

    if @hash is ''
      @hash = @generateHash()
    else
      @hash = @hash.replace '#', ''

    location.hash = @hash

    if @hash is 'local'
      @scene.fire "game:mp:player", 1
    
    if Firebase?
      @ref = new Firebase "#{@model.url}/game/#{@hash}"

      # Select the player number
      @ref.child('players').once 'value', (snapshot) =>
        if snapshot.val() is 0 or snapshot.val() is 2 or snapshot.val() is null
          @scene.fire "game:mp:player", 1
          @ref.child('players').set 1
        else if snapshot.val() is 1
          @scene.fire "game:mp:player", 2
          @ref.child('players').set 2
        else
          # Reset the game
          @ref.child('turn').set 1
          @ref.child('players').set 0

      # Listen for the other player to join the game
      @ref.child('players').on 'value', (snapshot) =>
        if snapshot.val() is 2
          @scene.fire 'game:ui:alert',
            type: 'info'
            message: "Other player has joined the game!"

      # Lose peasants and soldiers when attacked
      @ref.child('attacks').on 'child_added', (snapshot) =>
        data = snapshot.val()
        if data.guid isnt @guid
          @scene.fire "game:army:attacked",
            amount: data.amount
            country: data.country
            player: data.player
          snapshot.ref().remove()

      # Get battle results when attacking
      @ref.child('attack_results').on 'child_added', (snapshot) =>
        data = snapshot.val()
        if data.guid isnt @guid
          @scene.fire "game:army:results", data
          @scene.fire 'game:ui:alert',
            type: 'info'
            message: "Killed #{data.kills.soldiers} soldiers and #{data.kills.peasants} peasants!"
          snapshot.ref().remove()

      # Keep track of turn switching
      @ref.child('turn').on 'value', (snapshot) =>
        if @playerManager.model.turn isnt snapshot.val() and snapshot.val() isnt null
          @scene.fire "game:turn:next", snapshot.val()

      # End game conditions
      @ref.child('population_update').on 'child_added', (snapshot) =>
        data = snapshot.val()
        if data.guid isnt @guid
          if data.population <= 0
            @scene.fire "game:over", "win"
            snapshot.ref().remove()

      # Country capturing
      @ref.child('country_captured').on 'child_added', (snapshot) =>
        data = snapshot.val()
        if data.guid isnt @guid
          data.remote = true
          @scene.fire "game:country:captured", data
          snapshot.ref().remove()

  "event(game:country:captured)": (data) ->
    unless data.remote is true
      @ref.child('country_captured').push
        guid: @guid
        victor: data.victor
        defeated: data.defeated
        country: data.country

  "event(game:lose)": (population) ->
    @ref.child('population_update').push
      guid: @guid
      population: population
    @scene.fire "game:over", "lose"

  "event(game:turn:next)": (newTurn) ->
    if @playerManager.model.turn is newTurn
      @ref.child('turn').set newTurn

  "event(game:army:send)": (data) ->
    @ref.child('attacks').push
      guid: @guid
      amount: data.amount
      country: data.country
      player: @playerManager.model.get('playerNumber')

  "event(game:army:battle)": (data) ->
    @ref.child('attack_results').push
      guid: @guid
      kills: data.kills

  generateHash: () ->
    text = ""
    possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

    for i in [0..5]
      text += possible.charAt(Math.floor(Math.random() * possible.length))

    text
