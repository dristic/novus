class entities.MultiplayerController extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model

    myRootRef = new Firebase @model.url
    @ref = myRootRef.child 'game'
    @ref.child('turn').set 2

    @ref.child('players').on 'value', (snapshot) =>
      @ref.child('players').off()
      if snapshot.val() is 0
        @scene.fire "game:mp:player", 1
        @ref.child('players').set 1
      else
        @scene.fire "game:mp:player", 2
        @ref.child('players').set 2
