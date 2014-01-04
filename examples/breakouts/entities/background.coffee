nv.factory.register 'Background', (scene, options = {}) ->
  entity = new nv.Entity scene, options
  entity.addComponent nv.SpriteRenderingComponent,
    src: '/assets/bg_prerendered.png'
  entity

