nv.factory.register 'Logo', (scene, options = {}) ->
  entity = new nv.Entity scene, options
  entity.addComponent nv.SpriteRenderingComponent,
    src: '/assets/logo.png'
    width: 131
    height: 200
  entity

