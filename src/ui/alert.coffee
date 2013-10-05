class nv.AlertUIPlugin extends nv.UIPlugin
  constructor: (scene, entity) ->
    super scene, entity

    # reconcile config and default values to fill gaps
    model = entity.model
    model.width = model.width || 400
    model.height = model.height || 50
    model.x =  switch model.position
      when 'left' then 10
      when 'right' then scene.rootModel.canvas.width - 10 - model.width
      when 'center' then scene.rootModel.canvas.halfWidth - (model.width / 2)
    model.y = model.y || 30
    model.textAlign = model.textAlign || 'center'
    model.font = model.font || '14px sans-serif'
    model.lineHeight = model.lineHeight || 14

    model.viewTimeMs = (model.viewTime || 3) * 1000
    model.fadeTimeMs = (model.fadeTime || 1) * 1000

    @timerStart = null
    @hidden = true

    @panel = new gleam.Rectangle
      x: model.x
      y: model.y
      width: model.width
      height: model.height
      cornerRadius: model.corderRadius || 8
      fillStyle: 'white'
      strokeStyle: 'black'
      strokeWidth: model.strokeWidth || 3

    textX = switch model.textAlign
      when 'left', 'start' then model.x + 10
      when 'right', 'end' then model.x + model.width - 10
      when 'center' then model.x + (model.width / 2)

    @text = new gleam.Text
      color: model.color || '#000'
      x: textX
      y: model.y + model.height - Math.floor((model.height - model.lineHeight) / 2)
      textAlign: model.textAlign
      font: model.font
      text: 'Lorem Ipsum Dolar'
        
  "event(game:ui:alert)": (data) ->
    style = switch data.type
      when 'warning' then @entity.model.warning
      when 'alert' then @entity.model.alert
      else @entity.model.info

    @panel.fillStyle = style.style
    @text.color = style.color

    @text.text = data.message
    @showAlert()

  showAlert: () ->
    @hidden = false
    @fading = false
    @timerStart = null
    @timerEndMs = null
    @opacity = 1
    @setElementAlpha @opacity

  hideAlert: () ->
    @hidden = true
    @fading = false
    @timerStart = null
    @timerEndMs = null
    @opacity = 1

  setElementAlpha: (alpha) ->
    @panel.alpha = alpha
    @text.alpha = alpha

  update: (dt) ->
    return if @hidden
    
    now = Date.now()
    deltaMs = now - @timerStart

    if @timerStart is null
      @timerStart = now
      @timerEndMs = @entity.model.viewTimeMs + @entity.model.fadeTimeMs
    else if deltaMs > @timerEndMs
      @hideAlert()
    else if not @fading && deltaMs > @entity.model.viewTimeMs
      @fading = true

    if @fading
      @opacity = 1 - ((deltaMs - @entity.model.viewTimeMs) / @entity.model.fadeTimeMs)
      @setElementAlpha @opacity

  draw: (context, canvas) ->
    return if @hidden
    context.save()
    @panel.draw context, canvas
    @text.draw context, canvas
    context.restore()

  destroy: () ->
    @panel.destroy()
    @text.destroy()
    super
