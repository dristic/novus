/* Zepto v1.0rc1 - polyfill zepto event detect fx ajax form touch - zeptojs.com/license */
;(function(undefined){
  if (String.prototype.trim === undefined) // fix for iOS 3.2
    String.prototype.trim = function(){ return this.replace(/^\s+/, '').replace(/\s+$/, '') }

  // For iOS 3.x
  // from https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/reduce
  if (Array.prototype.reduce === undefined)
    Array.prototype.reduce = function(fun){
      if(this === void 0 || this === null) throw new TypeError()
      var t = Object(this), len = t.length >>> 0, k = 0, accumulator
      if(typeof fun != 'function') throw new TypeError()
      if(len == 0 && arguments.length == 1) throw new TypeError()

      if(arguments.length >= 2)
       accumulator = arguments[1]
      else
        do{
          if(k in t){
            accumulator = t[k++]
            break
          }
          if(++k >= len) throw new TypeError()
        } while (true)

      while (k < len){
        if(k in t) accumulator = fun.call(undefined, accumulator, t[k], k, t)
        k++
      }
      return accumulator
    }

})()
var Zepto = (function() {
  var undefined, key, $, classList, emptyArray = [], slice = emptyArray.slice,
    document = window.document,
    elementDisplay = {}, classCache = {},
    getComputedStyle = document.defaultView.getComputedStyle,
    cssNumber = { 'column-count': 1, 'columns': 1, 'font-weight': 1, 'line-height': 1,'opacity': 1, 'z-index': 1, 'zoom': 1 },
    fragmentRE = /^\s*<(\w+|!)[^>]*>/,

    // Used by `$.zepto.init` to wrap elements, text/comment nodes, document,
    // and document fragment node types.
    elementTypes = [1, 3, 8, 9, 11],

    adjacencyOperators = [ 'after', 'prepend', 'before', 'append' ],
    table = document.createElement('table'),
    tableRow = document.createElement('tr'),
    containers = {
      'tr': document.createElement('tbody'),
      'tbody': table, 'thead': table, 'tfoot': table,
      'td': tableRow, 'th': tableRow,
      '*': document.createElement('div')
    },
    readyRE = /complete|loaded|interactive/,
    classSelectorRE = /^\.([\w-]+)$/,
    idSelectorRE = /^#([\w-]+)$/,
    tagSelectorRE = /^[\w-]+$/,
    toString = ({}).toString,
    zepto = {},
    camelize, uniq,
    tempParent = document.createElement('div')

  zepto.matches = function(element, selector) {
    if (!element || element.nodeType !== 1) return false
    var matchesSelector = element.webkitMatchesSelector || element.mozMatchesSelector ||
                          element.oMatchesSelector || element.matchesSelector
    if (matchesSelector) return matchesSelector.call(element, selector)
    // fall back to performing a selector:
    var match, parent = element.parentNode, temp = !parent
    if (temp) (parent = tempParent).appendChild(element)
    match = ~zepto.qsa(parent, selector).indexOf(element)
    temp && tempParent.removeChild(element)
    return match
  }

  function isFunction(value) { return toString.call(value) == "[object Function]" }
  function isObject(value) { return value instanceof Object }
  function isPlainObject(value) {
    var key, ctor
    if (toString.call(value) !== "[object Object]") return false
    ctor = (isFunction(value.constructor) && value.constructor.prototype)
    if (!ctor || !hasOwnProperty.call(ctor, 'isPrototypeOf')) return false
    for (key in value);
    return key === undefined || hasOwnProperty.call(value, key)
  }
  function isArray(value) { return value instanceof Array }
  function likeArray(obj) { return typeof obj.length == 'number' }

  function compact(array) { return array.filter(function(item){ return item !== undefined && item !== null }) }
  function flatten(array) { return array.length > 0 ? [].concat.apply([], array) : array }
  camelize = function(str){ return str.replace(/-+(.)?/g, function(match, chr){ return chr ? chr.toUpperCase() : '' }) }
  function dasherize(str) {
    return str.replace(/::/g, '/')
           .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
           .replace(/([a-z\d])([A-Z])/g, '$1_$2')
           .replace(/_/g, '-')
           .toLowerCase()
  }
  uniq = function(array){ return array.filter(function(item, idx){ return array.indexOf(item) == idx }) }

  function classRE(name) {
    return name in classCache ?
      classCache[name] : (classCache[name] = new RegExp('(^|\\s)' + name + '(\\s|$)'))
  }

  function maybeAddPx(name, value) {
    return (typeof value == "number" && !cssNumber[dasherize(name)]) ? value + "px" : value
  }

  function defaultDisplay(nodeName) {
    var element, display
    if (!elementDisplay[nodeName]) {
      element = document.createElement(nodeName)
      document.body.appendChild(element)
      display = getComputedStyle(element, '').getPropertyValue("display")
      element.parentNode.removeChild(element)
      display == "none" && (display = "block")
      elementDisplay[nodeName] = display
    }
    return elementDisplay[nodeName]
  }

  // `$.zepto.fragment` takes a html string and an optional tag name
  // to generate DOM nodes nodes from the given html string.
  // The generated DOM nodes are returned as an array.
  // This function can be overriden in plugins for example to make
  // it compatible with browsers that don't support the DOM fully.
  zepto.fragment = function(html, name) {
    if (name === undefined) name = fragmentRE.test(html) && RegExp.$1
    if (!(name in containers)) name = '*'
    var container = containers[name]
    container.innerHTML = '' + html
    return $.each(slice.call(container.childNodes), function(){
      container.removeChild(this)
    })
  }

  // `$.zepto.Z` swaps out the prototype of the given `dom` array
  // of nodes with `$.fn` and thus supplying all the Zepto functions
  // to the array. Note that `__proto__` is not supported on Internet
  // Explorer. This method can be overriden in plugins.
  zepto.Z = function(dom, selector) {
    dom = dom || []
    dom.__proto__ = arguments.callee.prototype
    dom.selector = selector || ''
    return dom
  }

  // `$.zepto.isZ` should return `true` if the given object is a Zepto
  // collection. This method can be overriden in plugins.
  zepto.isZ = function(object) {
    return object instanceof zepto.Z
  }

  // `$.zepto.init` is Zepto's counterpart to jQuery's `$.fn.init` and
  // takes a CSS selector and an optional context (and handles various
  // special cases).
  // This method can be overriden in plugins.
  zepto.init = function(selector, context) {
    // If nothing given, return an empty Zepto collection
    if (!selector) return zepto.Z()
    // If a function is given, call it when the DOM is ready
    else if (isFunction(selector)) return $(document).ready(selector)
    // If a Zepto collection is given, juts return it
    else if (zepto.isZ(selector)) return selector
    else {
      var dom
      // normalize array if an array of nodes is given
      if (isArray(selector)) dom = compact(selector)
      // if a JavaScript object is given, return a copy of it
      // this is a somewhat peculiar option, but supported by
      // jQuery so we'll do it, too
      else if (isPlainObject(selector))
        dom = [$.extend({}, selector)], selector = null
      // wrap stuff like `document` or `window`
      else if (elementTypes.indexOf(selector.nodeType) >= 0 || selector === window)
        dom = [selector], selector = null
      // If it's a html fragment, create nodes from it
      else if (fragmentRE.test(selector))
        dom = zepto.fragment(selector.trim(), RegExp.$1), selector = null
      // If there's a context, create a collection on that context first, and select
      // nodes from there
      else if (context !== undefined) return $(context).find(selector)
      // And last but no least, if it's a CSS selector, use it to select nodes.
      else dom = zepto.qsa(document, selector)
      // create a new Zepto collection from the nodes found
      return zepto.Z(dom, selector)
    }
  }

  // `$` will be the base `Zepto` object. When calling this
  // function just call `$.zepto.init, whichs makes the implementation
  // details of selecting nodes and creating Zepto collections
  // patchable in plugins.
  $ = function(selector, context){
    return zepto.init(selector, context)
  }

  // Copy all but undefined properties from one or more
  // objects to the `target` object.
  $.extend = function(target){
    slice.call(arguments, 1).forEach(function(source) {
      for (key in source)
        if (source[key] !== undefined)
          target[key] = source[key]
    })
    return target
  }

  // `$.zepto.qsa` is Zepto's CSS selector implementation which
  // uses `document.querySelectorAll` and optimizes for some special cases, like `#id`.
  // This method can be overriden in plugins.
  zepto.qsa = function(element, selector){
    var found
    return (element === document && idSelectorRE.test(selector)) ?
      ( (found = element.getElementById(RegExp.$1)) ? [found] : emptyArray ) :
      (element.nodeType !== 1 && element.nodeType !== 9) ? emptyArray :
      slice.call(
        classSelectorRE.test(selector) ? element.getElementsByClassName(RegExp.$1) :
        tagSelectorRE.test(selector) ? element.getElementsByTagName(selector) :
        element.querySelectorAll(selector)
      )
  }

  function filtered(nodes, selector) {
    return selector === undefined ? $(nodes) : $(nodes).filter(selector)
  }

  function funcArg(context, arg, idx, payload) {
   return isFunction(arg) ? arg.call(context, idx, payload) : arg
  }

  $.isFunction = isFunction
  $.isObject = isObject
  $.isArray = isArray
  $.isPlainObject = isPlainObject

  $.inArray = function(elem, array, i){
    return emptyArray.indexOf.call(array, elem, i)
  }

  $.trim = function(str) { return str.trim() }

  // plugin compatibility
  $.uuid = 0

  $.map = function(elements, callback){
    var value, values = [], i, key
    if (likeArray(elements))
      for (i = 0; i < elements.length; i++) {
        value = callback(elements[i], i)
        if (value != null) values.push(value)
      }
    else
      for (key in elements) {
        value = callback(elements[key], key)
        if (value != null) values.push(value)
      }
    return flatten(values)
  }

  $.each = function(elements, callback){
    var i, key
    if (likeArray(elements)) {
      for (i = 0; i < elements.length; i++)
        if (callback.call(elements[i], i, elements[i]) === false) return elements
    } else {
      for (key in elements)
        if (callback.call(elements[key], key, elements[key]) === false) return elements
    }

    return elements
  }

  // Define methods that will be available on all
  // Zepto collections
  $.fn = {
    // Because a collection acts like an array
    // copy over these useful array functions.
    forEach: emptyArray.forEach,
    reduce: emptyArray.reduce,
    push: emptyArray.push,
    indexOf: emptyArray.indexOf,
    concat: emptyArray.concat,

    // `map` and `slice` in the jQuery API work differently
    // from their array counterparts
    map: function(fn){
      return $.map(this, function(el, i){ return fn.call(el, i, el) })
    },
    slice: function(){
      return $(slice.apply(this, arguments))
    },

    ready: function(callback){
      if (readyRE.test(document.readyState)) callback($)
      else document.addEventListener('DOMContentLoaded', function(){ callback($) }, false)
      return this
    },
    get: function(idx){
      return idx === undefined ? slice.call(this) : this[idx]
    },
    toArray: function(){ return this.get() },
    size: function(){
      return this.length
    },
    remove: function(){
      return this.each(function(){
        if (this.parentNode != null)
          this.parentNode.removeChild(this)
      })
    },
    each: function(callback){
      this.forEach(function(el, idx){ callback.call(el, idx, el) })
      return this
    },
    filter: function(selector){
      return $([].filter.call(this, function(element){
        return zepto.matches(element, selector)
      }))
    },
    add: function(selector,context){
      return $(uniq(this.concat($(selector,context))))
    },
    is: function(selector){
      return this.length > 0 && zepto.matches(this[0], selector)
    },
    not: function(selector){
      var nodes=[]
      if (isFunction(selector) && selector.call !== undefined)
        this.each(function(idx){
          if (!selector.call(this,idx)) nodes.push(this)
        })
      else {
        var excludes = typeof selector == 'string' ? this.filter(selector) :
          (likeArray(selector) && isFunction(selector.item)) ? slice.call(selector) : $(selector)
        this.forEach(function(el){
          if (excludes.indexOf(el) < 0) nodes.push(el)
        })
      }
      return $(nodes)
    },
    eq: function(idx){
      return idx === -1 ? this.slice(idx) : this.slice(idx, + idx + 1)
    },
    first: function(){
      var el = this[0]
      return el && !isObject(el) ? el : $(el)
    },
    last: function(){
      var el = this[this.length - 1]
      return el && !isObject(el) ? el : $(el)
    },
    find: function(selector){
      var result
      if (this.length == 1) result = zepto.qsa(this[0], selector)
      else result = this.map(function(){ return zepto.qsa(this, selector) })
      return $(result)
    },
    closest: function(selector, context){
      var node = this[0]
      while (node && !zepto.matches(node, selector))
        node = node !== context && node !== document && node.parentNode
      return $(node)
    },
    parents: function(selector){
      var ancestors = [], nodes = this
      while (nodes.length > 0)
        nodes = $.map(nodes, function(node){
          if ((node = node.parentNode) && node !== document && ancestors.indexOf(node) < 0) {
            ancestors.push(node)
            return node
          }
        })
      return filtered(ancestors, selector)
    },
    parent: function(selector){
      return filtered(uniq(this.pluck('parentNode')), selector)
    },
    children: function(selector){
      return filtered(this.map(function(){ return slice.call(this.children) }), selector)
    },
    siblings: function(selector){
      return filtered(this.map(function(i, el){
        return slice.call(el.parentNode.children).filter(function(child){ return child!==el })
      }), selector)
    },
    empty: function(){
      return this.each(function(){ this.innerHTML = '' })
    },
    // `pluck` is borrowed from Prototype.js
    pluck: function(property){
      return this.map(function(){ return this[property] })
    },
    show: function(){
      return this.each(function(){
        this.style.display == "none" && (this.style.display = null)
        if (getComputedStyle(this, '').getPropertyValue("display") == "none")
          this.style.display = defaultDisplay(this.nodeName)
      })
    },
    replaceWith: function(newContent){
      return this.before(newContent).remove()
    },
    wrap: function(newContent){
      return this.each(function(){
        $(this).wrapAll($(newContent)[0].cloneNode(false))
      })
    },
    wrapAll: function(newContent){
      if (this[0]) {
        $(this[0]).before(newContent = $(newContent))
        newContent.append(this)
      }
      return this
    },
    unwrap: function(){
      this.parent().each(function(){
        $(this).replaceWith($(this).children())
      })
      return this
    },
    clone: function(){
      return $(this.map(function(){ return this.cloneNode(true) }))
    },
    hide: function(){
      return this.css("display", "none")
    },
    toggle: function(setting){
      return (setting === undefined ? this.css("display") == "none" : setting) ? this.show() : this.hide()
    },
    prev: function(){ return $(this.pluck('previousElementSibling')) },
    next: function(){ return $(this.pluck('nextElementSibling')) },
    html: function(html){
      return html === undefined ?
        (this.length > 0 ? this[0].innerHTML : null) :
        this.each(function(idx){
          var originHtml = this.innerHTML
          $(this).empty().append( funcArg(this, html, idx, originHtml) )
        })
    },
    text: function(text){
      return text === undefined ?
        (this.length > 0 ? this[0].textContent : null) :
        this.each(function(){ this.textContent = text })
    },
    attr: function(name, value){
      var result
      return (typeof name == 'string' && value === undefined) ?
        (this.length == 0 || this[0].nodeType !== 1 ? undefined :
          (name == 'value' && this[0].nodeName == 'INPUT') ? this.val() :
          (!(result = this[0].getAttribute(name)) && name in this[0]) ? this[0][name] : result
        ) :
        this.each(function(idx){
          if (this.nodeType !== 1) return
          if (isObject(name)) for (key in name) this.setAttribute(key, name[key])
          else this.setAttribute(name, funcArg(this, value, idx, this.getAttribute(name)))
        })
    },
    removeAttr: function(name){
      return this.each(function(){ if (this.nodeType === 1) this.removeAttribute(name) })
    },
    prop: function(name, value){
      return (value === undefined) ?
        (this[0] ? this[0][name] : undefined) :
        this.each(function(idx){
          this[name] = funcArg(this, value, idx, this[name])
        })
    },
    data: function(name, value){
      var data = this.attr('data-' + dasherize(name), value)
      return data !== null ? data : undefined
    },
    val: function(value){
      return (value === undefined) ?
        (this.length > 0 ? this[0].value : undefined) :
        this.each(function(idx){
          this.value = funcArg(this, value, idx, this.value)
        })
    },
    offset: function(){
      if (this.length==0) return null
      var obj = this[0].getBoundingClientRect()
      return {
        left: obj.left + window.pageXOffset,
        top: obj.top + window.pageYOffset,
        width: obj.width,
        height: obj.height
      }
    },
    css: function(property, value){
      if (value === undefined && typeof property == 'string')
        return (
          this.length == 0
            ? undefined
            : this[0].style[camelize(property)] || getComputedStyle(this[0], '').getPropertyValue(property))

      var css = ''
      for (key in property)
        if(typeof property[key] == 'string' && property[key] == '')
          this.each(function(){ this.style.removeProperty(dasherize(key)) })
        else
          css += dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';'

      if (typeof property == 'string')
        if (value == '')
          this.each(function(){ this.style.removeProperty(dasherize(property)) })
        else
          css = dasherize(property) + ":" + maybeAddPx(property, value)

      return this.each(function(){ this.style.cssText += ';' + css })
    },
    index: function(element){
      return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0])
    },
    hasClass: function(name){
      if (this.length < 1) return false
      else return classRE(name).test(this[0].className)
    },
    addClass: function(name){
      return this.each(function(idx){
        classList = []
        var cls = this.className, newName = funcArg(this, name, idx, cls)
        newName.split(/\s+/g).forEach(function(klass){
          if (!$(this).hasClass(klass)) classList.push(klass)
        }, this)
        classList.length && (this.className += (cls ? " " : "") + classList.join(" "))
      })
    },
    removeClass: function(name){
      return this.each(function(idx){
        if (name === undefined)
          return this.className = ''
        classList = this.className
        funcArg(this, name, idx, classList).split(/\s+/g).forEach(function(klass){
          classList = classList.replace(classRE(klass), " ")
        })
        this.className = classList.trim()
      })
    },
    toggleClass: function(name, when){
      return this.each(function(idx){
        var newName = funcArg(this, name, idx, this.className)
        ;(when === undefined ? !$(this).hasClass(newName) : when) ?
          $(this).addClass(newName) : $(this).removeClass(newName)
      })
    }
  }

  // Generate the `width` and `height` functions
  ;['width', 'height'].forEach(function(dimension){
    $.fn[dimension] = function(value){
      var offset, Dimension = dimension.replace(/./, function(m){ return m[0].toUpperCase() })
      if (value === undefined) return this[0] == window ? window['inner' + Dimension] :
        this[0] == document ? document.documentElement['offset' + Dimension] :
        (offset = this.offset()) && offset[dimension]
      else return this.each(function(idx){
        var el = $(this)
        el.css(dimension, funcArg(this, value, idx, el[dimension]()))
      })
    }
  })

  function insert(operator, target, node) {
    var parent = (operator % 2) ? target : target.parentNode
    parent ? parent.insertBefore(node,
      !operator ? target.nextSibling :      // after
      operator == 1 ? parent.firstChild :   // prepend
      operator == 2 ? target :              // before
      null) :                               // append
      $(node).remove()
  }

  function traverseNode(node, fun) {
    fun(node)
    for (var key in node.childNodes) traverseNode(node.childNodes[key], fun)
  }

  // Generate the `after`, `prepend`, `before`, `append`,
  // `insertAfter`, `insertBefore`, `appendTo`, and `prependTo` methods.
  adjacencyOperators.forEach(function(key, operator) {
    $.fn[key] = function(){
      // arguments can be nodes, arrays of nodes, Zepto objects and HTML strings
      var nodes = $.map(arguments, function(n){ return isObject(n) ? n : zepto.fragment(n) })
      if (nodes.length < 1) return this
      var size = this.length, copyByClone = size > 1, inReverse = operator < 2

      return this.each(function(index, target){
        for (var i = 0; i < nodes.length; i++) {
          var node = nodes[inReverse ? nodes.length-i-1 : i]
          traverseNode(node, function(node){
            if (node.nodeName != null && node.nodeName.toUpperCase() === 'SCRIPT' && (!node.type || node.type === 'text/javascript'))
              window['eval'].call(window, node.innerHTML)
          })
          if (copyByClone && index < size - 1) node = node.cloneNode(true)
          insert(operator, target, node)
        }
      })
    }

    $.fn[(operator % 2) ? key+'To' : 'insert'+(operator ? 'Before' : 'After')] = function(html){
      $(html)[key](this)
      return this
    }
  })

  zepto.Z.prototype = $.fn

  // Export internal API functions in the `$.zepto` namespace
  zepto.camelize = camelize
  zepto.uniq = uniq
  $.zepto = zepto

  return $
})()

// If `$` is not yet defined, point it to `Zepto`
window.Zepto = Zepto
'$' in window || (window.$ = Zepto)
;(function($){
  var $$ = $.zepto.qsa, handlers = {}, _zid = 1, specialEvents={}

  specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents'

  function zid(element) {
    return element._zid || (element._zid = _zid++)
  }
  function findHandlers(element, event, fn, selector) {
    event = parse(event)
    if (event.ns) var matcher = matcherFor(event.ns)
    return (handlers[zid(element)] || []).filter(function(handler) {
      return handler
        && (!event.e  || handler.e == event.e)
        && (!event.ns || matcher.test(handler.ns))
        && (!fn       || zid(handler.fn) === zid(fn))
        && (!selector || handler.sel == selector)
    })
  }
  function parse(event) {
    var parts = ('' + event).split('.')
    return {e: parts[0], ns: parts.slice(1).sort().join(' ')}
  }
  function matcherFor(ns) {
    return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)')
  }

  function eachEvent(events, fn, iterator){
    if ($.isObject(events)) $.each(events, iterator)
    else events.split(/\s/).forEach(function(type){ iterator(type, fn) })
  }

  function add(element, events, fn, selector, getDelegate, capture){
    capture = !!capture
    var id = zid(element), set = (handlers[id] || (handlers[id] = []))
    eachEvent(events, fn, function(event, fn){
      var delegate = getDelegate && getDelegate(fn, event),
        callback = delegate || fn
      var proxyfn = function (event) {
        var result = callback.apply(element, [event].concat(event.data))
        if (result === false) event.preventDefault()
        return result
      }
      var handler = $.extend(parse(event), {fn: fn, proxy: proxyfn, sel: selector, del: delegate, i: set.length})
      set.push(handler)
      element.addEventListener(handler.e, proxyfn, capture)
    })
  }
  function remove(element, events, fn, selector){
    var id = zid(element)
    eachEvent(events || '', fn, function(event, fn){
      findHandlers(element, event, fn, selector).forEach(function(handler){
        delete handlers[id][handler.i]
        element.removeEventListener(handler.e, handler.proxy, false)
      })
    })
  }

  $.event = { add: add, remove: remove }

  $.proxy = function(fn, context) {
    if ($.isFunction(fn)) {
      var proxyFn = function(){ return fn.apply(context, arguments) }
      proxyFn._zid = zid(fn)
      return proxyFn
    } else if (typeof context == 'string') {
      return $.proxy(fn[context], fn)
    } else {
      throw new TypeError("expected function")
    }
  }

  $.fn.bind = function(event, callback){
    return this.each(function(){
      add(this, event, callback)
    })
  }
  $.fn.unbind = function(event, callback){
    return this.each(function(){
      remove(this, event, callback)
    })
  }
  $.fn.one = function(event, callback){
    return this.each(function(i, element){
      add(this, event, callback, null, function(fn, type){
        return function(){
          var result = fn.apply(element, arguments)
          remove(element, type, fn)
          return result
        }
      })
    })
  }

  var returnTrue = function(){return true},
      returnFalse = function(){return false},
      eventMethods = {
        preventDefault: 'isDefaultPrevented',
        stopImmediatePropagation: 'isImmediatePropagationStopped',
        stopPropagation: 'isPropagationStopped'
      }
  function createProxy(event) {
    var proxy = $.extend({originalEvent: event}, event)
    $.each(eventMethods, function(name, predicate) {
      proxy[name] = function(){
        this[predicate] = returnTrue
        return event[name].apply(event, arguments)
      }
      proxy[predicate] = returnFalse
    })
    return proxy
  }

  // emulates the 'defaultPrevented' property for browsers that have none
  function fix(event) {
    if (!('defaultPrevented' in event)) {
      event.defaultPrevented = false
      var prevent = event.preventDefault
      event.preventDefault = function() {
        this.defaultPrevented = true
        prevent.call(this)
      }
    }
  }

  $.fn.delegate = function(selector, event, callback){
    var capture = false
    if(event == 'blur' || event == 'focus'){
      if($.iswebkit)
        event = event == 'blur' ? 'focusout' : event == 'focus' ? 'focusin' : event
      else
        capture = true
    }

    return this.each(function(i, element){
      add(element, event, callback, selector, function(fn){
        return function(e){
          var evt, match = $(e.target).closest(selector, element).get(0)
          if (match) {
            evt = $.extend(createProxy(e), {currentTarget: match, liveFired: element})
            return fn.apply(match, [evt].concat([].slice.call(arguments, 1)))
          }
        }
      }, capture)
    })
  }
  $.fn.undelegate = function(selector, event, callback){
    return this.each(function(){
      remove(this, event, callback, selector)
    })
  }

  $.fn.live = function(event, callback){
    $(document.body).delegate(this.selector, event, callback)
    return this
  }
  $.fn.die = function(event, callback){
    $(document.body).undelegate(this.selector, event, callback)
    return this
  }

  $.fn.on = function(event, selector, callback){
    return selector == undefined || $.isFunction(selector) ?
      this.bind(event, selector) : this.delegate(selector, event, callback)
  }
  $.fn.off = function(event, selector, callback){
    return selector == undefined || $.isFunction(selector) ?
      this.unbind(event, selector) : this.undelegate(selector, event, callback)
  }

  $.fn.trigger = function(event, data){
    if (typeof event == 'string') event = $.Event(event)
    fix(event)
    event.data = data
    return this.each(function(){
      // items in the collection might not be DOM elements
      // (todo: possibly support events on plain old objects)
      if('dispatchEvent' in this) this.dispatchEvent(event)
    })
  }

  // triggers event handlers on current element just as if an event occurred,
  // doesn't trigger an actual event, doesn't bubble
  $.fn.triggerHandler = function(event, data){
    var e, result
    this.each(function(i, element){
      e = createProxy(typeof event == 'string' ? $.Event(event) : event)
      e.data = data
      e.target = element
      $.each(findHandlers(element, event.type || event), function(i, handler){
        result = handler.proxy(e)
        if (e.isImmediatePropagationStopped()) return false
      })
    })
    return result
  }

  // shortcut methods for `.bind(event, fn)` for each event type
  ;('focusin focusout load resize scroll unload click dblclick '+
  'mousedown mouseup mousemove mouseover mouseout '+
  'change select keydown keypress keyup error').split(' ').forEach(function(event) {
    $.fn[event] = function(callback){ return this.bind(event, callback) }
  })

  ;['focus', 'blur'].forEach(function(name) {
    $.fn[name] = function(callback) {
      if (callback) this.bind(name, callback)
      else if (this.length) try { this.get(0)[name]() } catch(e){}
      return this
    }
  })

  $.Event = function(type, props) {
    var event = document.createEvent(specialEvents[type] || 'Events'), bubbles = true
    if (props) for (var name in props) (name == 'bubbles') ? (bubbles = !!props[name]) : (event[name] = props[name])
    event.initEvent(type, bubbles, true, null, null, null, null, null, null, null, null, null, null, null, null)
    return event
  }

})(Zepto)
;(function($){
  function detect(ua){
    var os = this.os = {}, browser = this.browser = {},
      webkit = ua.match(/WebKit\/([\d.]+)/),
      android = ua.match(/(Android)\s+([\d.]+)/),
      ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
      iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
      webos = ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
      touchpad = webos && ua.match(/TouchPad/),
      kindle = ua.match(/Kindle\/([\d.]+)/),
      silk = ua.match(/Silk\/([\d._]+)/),
      blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/)

    // todo clean this up with a better OS/browser
    // separation. we need to discern between multiple
    // browsers on android, and decide if kindle fire in
    // silk mode is android or not

    if (browser.webkit = !!webkit) browser.version = webkit[1]

    if (android) os.android = true, os.version = android[2]
    if (iphone) os.ios = os.iphone = true, os.version = iphone[2].replace(/_/g, '.')
    if (ipad) os.ios = os.ipad = true, os.version = ipad[2].replace(/_/g, '.')
    if (webos) os.webos = true, os.version = webos[2]
    if (touchpad) os.touchpad = true
    if (blackberry) os.blackberry = true, os.version = blackberry[2]
    if (kindle) os.kindle = true, os.version = kindle[1]
    if (silk) browser.silk = true, browser.version = silk[1]
    if (!silk && os.android && ua.match(/Kindle Fire/)) browser.silk = true
  }

  detect.call($, navigator.userAgent)
  // make available to unit tests
  $.__detect = detect

})(Zepto)
;(function($, undefined){
  var prefix = '', eventPrefix, endEventName, endAnimationName,
    vendors = { Webkit: 'webkit', Moz: '', O: 'o', ms: 'MS' },
    document = window.document, testEl = document.createElement('div'),
    supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
    clearProperties = {}

  function downcase(str) { return str.toLowerCase() }
  function normalizeEvent(name) { return eventPrefix ? eventPrefix + name : downcase(name) }

  $.each(vendors, function(vendor, event){
    if (testEl.style[vendor + 'TransitionProperty'] !== undefined) {
      prefix = '-' + downcase(vendor) + '-'
      eventPrefix = event
      return false
    }
  })

  clearProperties[prefix + 'transition-property'] =
  clearProperties[prefix + 'transition-duration'] =
  clearProperties[prefix + 'transition-timing-function'] =
  clearProperties[prefix + 'animation-name'] =
  clearProperties[prefix + 'animation-duration'] = ''

  $.fx = {
    off: (eventPrefix === undefined && testEl.style.transitionProperty === undefined),
    cssPrefix: prefix,
    transitionEnd: normalizeEvent('TransitionEnd'),
    animationEnd: normalizeEvent('AnimationEnd')
  }

  $.fn.animate = function(properties, duration, ease, callback){
    if ($.isObject(duration))
      ease = duration.easing, callback = duration.complete, duration = duration.duration
    if (duration) duration = duration / 1000
    return this.anim(properties, duration, ease, callback)
  }

  $.fn.anim = function(properties, duration, ease, callback){
    var transforms, cssProperties = {}, key, that = this, wrappedCallback, endEvent = $.fx.transitionEnd
    if (duration === undefined) duration = 0.4
    if ($.fx.off) duration = 0

    if (typeof properties == 'string') {
      // keyframe animation
      cssProperties[prefix + 'animation-name'] = properties
      cssProperties[prefix + 'animation-duration'] = duration + 's'
      endEvent = $.fx.animationEnd
    } else {
      // CSS transitions
      for (key in properties)
        if (supportedTransforms.test(key)) {
          transforms || (transforms = [])
          transforms.push(key + '(' + properties[key] + ')')
        }
        else cssProperties[key] = properties[key]

      if (transforms) cssProperties[prefix + 'transform'] = transforms.join(' ')
      if (!$.fx.off && typeof properties === 'object') {
        cssProperties[prefix + 'transition-property'] = Object.keys(properties).join(', ')
        cssProperties[prefix + 'transition-duration'] = duration + 's'
        cssProperties[prefix + 'transition-timing-function'] = (ease || 'linear')
      }
    }

    wrappedCallback = function(event){
      if (typeof event !== 'undefined') {
        if (event.target !== event.currentTarget) return // makes sure the event didn't bubble from "below"
        $(event.target).unbind(endEvent, arguments.callee)
      }
      $(this).css(clearProperties)
      callback && callback.call(this)
    }
    if (duration > 0) this.bind(endEvent, wrappedCallback)

    setTimeout(function() {
      that.css(cssProperties)
      if (duration <= 0) setTimeout(function() {
        that.each(function(){ wrappedCallback.call(this) })
      }, 0)
    }, 0)

    return this
  }

  testEl = null
})(Zepto)
;(function($){
  var jsonpID = 0,
      isObject = $.isObject,
      document = window.document,
      key,
      name,
      rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      scriptTypeRE = /^(?:text|application)\/javascript/i,
      xmlTypeRE = /^(?:text|application)\/xml/i,
      jsonType = 'application/json',
      htmlType = 'text/html',
      blankRE = /^\s*$/

  // trigger a custom event and return false if it was cancelled
  function triggerAndReturn(context, eventName, data) {
    var event = $.Event(eventName)
    $(context).trigger(event, data)
    return !event.defaultPrevented
  }

  // trigger an Ajax "global" event
  function triggerGlobal(settings, context, eventName, data) {
    if (settings.global) return triggerAndReturn(context || document, eventName, data)
  }

  // Number of active Ajax requests
  $.active = 0

  function ajaxStart(settings) {
    if (settings.global && $.active++ === 0) triggerGlobal(settings, null, 'ajaxStart')
  }
  function ajaxStop(settings) {
    if (settings.global && !(--$.active)) triggerGlobal(settings, null, 'ajaxStop')
  }

  // triggers an extra global event "ajaxBeforeSend" that's like "ajaxSend" but cancelable
  function ajaxBeforeSend(xhr, settings) {
    var context = settings.context
    if (settings.beforeSend.call(context, xhr, settings) === false ||
        triggerGlobal(settings, context, 'ajaxBeforeSend', [xhr, settings]) === false)
      return false

    triggerGlobal(settings, context, 'ajaxSend', [xhr, settings])
  }
  function ajaxSuccess(data, xhr, settings) {
    var context = settings.context, status = 'success'
    settings.success.call(context, data, status, xhr)
    triggerGlobal(settings, context, 'ajaxSuccess', [xhr, settings, data])
    ajaxComplete(status, xhr, settings)
  }
  // type: "timeout", "error", "abort", "parsererror"
  function ajaxError(error, type, xhr, settings) {
    var context = settings.context
    settings.error.call(context, xhr, type, error)
    triggerGlobal(settings, context, 'ajaxError', [xhr, settings, error])
    ajaxComplete(type, xhr, settings)
  }
  // status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
  function ajaxComplete(status, xhr, settings) {
    var context = settings.context
    settings.complete.call(context, xhr, status)
    triggerGlobal(settings, context, 'ajaxComplete', [xhr, settings])
    ajaxStop(settings)
  }

  // Empty function, used as default callback
  function empty() {}

  $.ajaxJSONP = function(options){
    var callbackName = 'jsonp' + (++jsonpID),
      script = document.createElement('script'),
      abort = function(){
        $(script).remove()
        if (callbackName in window) window[callbackName] = empty
        ajaxComplete('abort', xhr, options)
      },
      xhr = { abort: abort }, abortTimeout

    if (options.error) script.onerror = function() {
      xhr.abort()
      options.error()
    }

    window[callbackName] = function(data){
      clearTimeout(abortTimeout)
      $(script).remove()
      delete window[callbackName]
      ajaxSuccess(data, xhr, options)
    }

    serializeData(options)
    script.src = options.url.replace(/=\?/, '=' + callbackName)
    $('head').append(script)

    if (options.timeout > 0) abortTimeout = setTimeout(function(){
        xhr.abort()
        ajaxComplete('timeout', xhr, options)
      }, options.timeout)

    return xhr
  }

  $.ajaxSettings = {
    // Default type of request
    type: 'GET',
    // Callback that is executed before request
    beforeSend: empty,
    // Callback that is executed if the request succeeds
    success: empty,
    // Callback that is executed the the server drops error
    error: empty,
    // Callback that is executed on request complete (both: error and success)
    complete: empty,
    // The context for the callbacks
    context: null,
    // Whether to trigger "global" Ajax events
    global: true,
    // Transport
    xhr: function () {
      return new window.XMLHttpRequest()
    },
    // MIME types mapping
    accepts: {
      script: 'text/javascript, application/javascript',
      json:   jsonType,
      xml:    'application/xml, text/xml',
      html:   htmlType,
      text:   'text/plain'
    },
    // Whether the request is to another domain
    crossDomain: false,
    // Default timeout
    timeout: 0
  }

  function mimeToDataType(mime) {
    return mime && ( mime == htmlType ? 'html' :
      mime == jsonType ? 'json' :
      scriptTypeRE.test(mime) ? 'script' :
      xmlTypeRE.test(mime) && 'xml' ) || 'text'
  }

  function appendQuery(url, query) {
    return (url + '&' + query).replace(/[&?]{1,2}/, '?')
  }

  // serialize payload and append it to the URL for GET requests
  function serializeData(options) {
    if (isObject(options.data)) options.data = $.param(options.data)
    if (options.data && (!options.type || options.type.toUpperCase() == 'GET'))
      options.url = appendQuery(options.url, options.data)
  }

  $.ajax = function(options){
    var settings = $.extend({}, options || {})
    for (key in $.ajaxSettings) if (settings[key] === undefined) settings[key] = $.ajaxSettings[key]

    ajaxStart(settings)

    if (!settings.crossDomain) settings.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(settings.url) &&
      RegExp.$2 != window.location.host

    var dataType = settings.dataType, hasPlaceholder = /=\?/.test(settings.url)
    if (dataType == 'jsonp' || hasPlaceholder) {
      if (!hasPlaceholder) settings.url = appendQuery(settings.url, 'callback=?')
      return $.ajaxJSONP(settings)
    }

    if (!settings.url) settings.url = window.location.toString()
    serializeData(settings)

    var mime = settings.accepts[dataType],
        baseHeaders = { },
        protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
        xhr = $.ajaxSettings.xhr(), abortTimeout

    if (!settings.crossDomain) baseHeaders['X-Requested-With'] = 'XMLHttpRequest'
    if (mime) {
      baseHeaders['Accept'] = mime
      if (mime.indexOf(',') > -1) mime = mime.split(',', 2)[0]
      xhr.overrideMimeType && xhr.overrideMimeType(mime)
    }
    if (settings.contentType || (settings.data && settings.type.toUpperCase() != 'GET'))
      baseHeaders['Content-Type'] = (settings.contentType || 'application/x-www-form-urlencoded')
    settings.headers = $.extend(baseHeaders, settings.headers || {})

    xhr.onreadystatechange = function(){
      if (xhr.readyState == 4) {
        clearTimeout(abortTimeout)
        var result, error = false
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 || (xhr.status == 0 && protocol == 'file:')) {
          dataType = dataType || mimeToDataType(xhr.getResponseHeader('content-type'))
          result = xhr.responseText

          try {
            if (dataType == 'script')    (1,eval)(result)
            else if (dataType == 'xml')  result = xhr.responseXML
            else if (dataType == 'json') result = blankRE.test(result) ? null : JSON.parse(result)
          } catch (e) { error = e }

          if (error) ajaxError(error, 'parsererror', xhr, settings)
          else ajaxSuccess(result, xhr, settings)
        } else {
          ajaxError(null, 'error', xhr, settings)
        }
      }
    }

    var async = 'async' in settings ? settings.async : true
    xhr.open(settings.type, settings.url, async)

    for (name in settings.headers) xhr.setRequestHeader(name, settings.headers[name])

    if (ajaxBeforeSend(xhr, settings) === false) {
      xhr.abort()
      return false
    }

    if (settings.timeout > 0) abortTimeout = setTimeout(function(){
        xhr.onreadystatechange = empty
        xhr.abort()
        ajaxError(null, 'timeout', xhr, settings)
      }, settings.timeout)

    // avoid sending empty string (#319)
    xhr.send(settings.data ? settings.data : null)
    return xhr
  }

  $.get = function(url, success){ return $.ajax({ url: url, success: success }) }

  $.post = function(url, data, success, dataType){
    if ($.isFunction(data)) dataType = dataType || success, success = data, data = null
    return $.ajax({ type: 'POST', url: url, data: data, success: success, dataType: dataType })
  }

  $.getJSON = function(url, success){
    return $.ajax({ url: url, success: success, dataType: 'json' })
  }

  $.fn.load = function(url, success){
    if (!this.length) return this
    var self = this, parts = url.split(/\s/), selector
    if (parts.length > 1) url = parts[0], selector = parts[1]
    $.get(url, function(response){
      self.html(selector ?
        $(document.createElement('div')).html(response.replace(rscript, "")).find(selector).html()
        : response)
      success && success.call(self)
    })
    return this
  }

  var escape = encodeURIComponent

  function serialize(params, obj, traditional, scope){
    var array = $.isArray(obj)
    $.each(obj, function(key, value) {
      if (scope) key = traditional ? scope : scope + '[' + (array ? '' : key) + ']'
      // handle data in serializeArray() format
      if (!scope && array) params.add(value.name, value.value)
      // recurse into nested objects
      else if (traditional ? $.isArray(value) : isObject(value))
        serialize(params, value, traditional, key)
      else params.add(key, value)
    })
  }

  $.param = function(obj, traditional){
    var params = []
    params.add = function(k, v){ this.push(escape(k) + '=' + escape(v)) }
    serialize(params, obj, traditional)
    return params.join('&').replace('%20', '+')
  }
})(Zepto)
;(function ($) {
  $.fn.serializeArray = function () {
    var result = [], el
    $( Array.prototype.slice.call(this.get(0).elements) ).each(function () {
      el = $(this)
      var type = el.attr('type')
      if (this.nodeName.toLowerCase() != 'fieldset' &&
        !this.disabled && type != 'submit' && type != 'reset' && type != 'button' &&
        ((type != 'radio' && type != 'checkbox') || this.checked))
        result.push({
          name: el.attr('name'),
          value: el.val()
        })
    })
    return result
  }

  $.fn.serialize = function () {
    var result = []
    this.serializeArray().forEach(function (elm) {
      result.push( encodeURIComponent(elm.name) + '=' + encodeURIComponent(elm.value) )
    })
    return result.join('&')
  }

  $.fn.submit = function (callback) {
    if (callback) this.bind('submit', callback)
    else if (this.length) {
      var event = $.Event('submit')
      this.eq(0).trigger(event)
      if (!event.defaultPrevented) this.get(0).submit()
    }
    return this
  }

})(Zepto)
;(function($){
  var touch = {}, touchTimeout

  function parentIfText(node){
    return 'tagName' in node ? node : node.parentNode
  }

  function swipeDirection(x1, x2, y1, y2){
    var xDelta = Math.abs(x1 - x2), yDelta = Math.abs(y1 - y2)
    return xDelta >= yDelta ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
  }

  var longTapDelay = 750, longTapTimeout

  function longTap(){
    longTapTimeout = null
    if (touch.last) {
      touch.el.trigger('longTap')
      touch = {}
    }
  }

  function cancelLongTap(){
    if (longTapTimeout) clearTimeout(longTapTimeout)
    longTapTimeout = null
  }

  $(document).ready(function(){
    var now, delta

    $(document.body).bind('touchstart', function(e){
      now = Date.now()
      delta = now - (touch.last || now)
      touch.el = $(parentIfText(e.touches[0].target))
      touchTimeout && clearTimeout(touchTimeout)
      touch.x1 = e.touches[0].pageX
      touch.y1 = e.touches[0].pageY
      if (delta > 0 && delta <= 250) touch.isDoubleTap = true
      touch.last = now
      longTapTimeout = setTimeout(longTap, longTapDelay)
    }).bind('touchmove', function(e){
      cancelLongTap()
      touch.x2 = e.touches[0].pageX
      touch.y2 = e.touches[0].pageY
    }).bind('touchend', function(e){
       cancelLongTap()

      // double tap (tapped twice within 250ms)
      if (touch.isDoubleTap) {
        touch.el.trigger('doubleTap')
        touch = {}

      // swipe
      } else if ((touch.x2 && Math.abs(touch.x1 - touch.x2) > 30) ||
                 (touch.y2 && Math.abs(touch.y1 - touch.y2) > 30)) {
        touch.el.trigger('swipe') &&
          touch.el.trigger('swipe' + (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)))
        touch = {}

      // normal tap
      } else if ('last' in touch) {
        touch.el.trigger('tap')

        touchTimeout = setTimeout(function(){
          touchTimeout = null
          touch.el.trigger('singleTap')
          touch = {}
        }, 250)
      }
    }).bind('touchcancel', function(){
      if (touchTimeout) clearTimeout(touchTimeout)
      if (longTapTimeout) clearTimeout(longTapTimeout)
      longTapTimeout = touchTimeout = null
      touch = {}
    })
  })

  ;['swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown', 'doubleTap', 'tap', 'singleTap', 'longTap'].forEach(function(m){
    $.fn[m] = function(callback){ return this.bind(m, callback) }
  })
})(Zepto);(function(){var a;this.nv=(a=this.nv)!=null?a:{}}).call(this),function(){nv.Controller=function(){function a(a){this.asset=a}return a.prototype.update=function(a){},a}()}.call(this),function(){nv.Entity=function(){function a(a){this.plugins=a}return a}()}.call(this),function(){nv.Model=function(){function a(a,b,c){}return a.prototype.setMany=function(a){var b,c;c=[];for(b in a)c.push(this[b]=a[b]);return c},a.prototype.persist=function(){return window.localStorage[this.name]=this},a.prototype.load=function(){return this.setMany(window.localStorage[this.name])},a}()}.call(this),function(){nv.ObjectRenderer=function(){function a(a,b){this.glcanvas=a,this.asset=b,this.glcanvas.addDrawable(this)}return a.prototype.draw=function(a){},a.prototype.destroy=function(){return this.glcanvas.removeDrawable(this)},a}(),nv.ObjectListRenderer=function(){function a(a,b){var c=this;this.assets=b,this.classname=this.constructor.toString(),this.assetCounter=0,a.addDrawable(this),$.each(this.assets,function(a){return c.acquireAsset(a)})}return a.prototype.acquireAsset=function(a){return a.id=this.classname+this.assetCounter++,a},a.prototype.add=function(a){return this.assets.push(this.acquireAsset(a)),a},a.prototype.remove=function(a){return this.assets=this.assets.filter(function(b){return b.id!==a.id})},a.prototype.draw=function(a){},a}()}.call(this),function(){nv.Scene=function(){function a(){this.controllers=[],this.models={},this.renderers=[]}return a.prototype.addController=function(a){return this.controllers.push(a)},a.prototype.removeController=function(a){return this.controllers.splice(this.controllers.indexOf(a),1)},a.prototype.addModel=function(a,b){return this.models[a]=b},a.prototype.getModel=function(a){return this.models[a]},a.prototype.removeModel=function(a){return delete this.models[a]},a.prototype.addRenderer=function(a){return this.renderers.push(a)},a.prototype.removeRenderer=function(a){return this.renderers.splice(this.renderers.indexOf(a),1)},a.prototype.update=function(a){var b,c,d,e,f;e=this.controllers,f=[];for(c=0,d=e.length;c<d;c++)b=e[c],f.push(b.update(a));return f},a}()}.call(this),function(){nv.Point=function(){function a(a,b){this.x=a,this.y=b}return a.prototype.clone=function(){return new nv.Point(this.x,this.y)},a.prototype.translate=function(a,b){return this.x+=a,this.y+=b,this},a}(),nv.Rect=function(){function a(a,b,c,d){this.x=a,this.y=b,this.width=c,this.height=d}return a.prototype.clone=function(){return new nv.Rect(this.x,this.y,this.width,this.height)},a.prototype.contains=function(a){return a.x>=this.x&&a.x<=this.x+this.width&&a.y>=this.y&&a.y<=this.y+this.height},a.prototype.translate=function(a,b){return this.x+=a,this.y+=b},a}()}.call(this),function(){var a;window.nv=(a=window.nv)!=null?a:{},window.nv.Key={Backspace:8,Tab:9,Enter:13,Shift:16,Control:17,PauseBreak:19,CapsLock:20,Esc:27,Spacebar:32,PageUp:33,PageDown:34,End:35,Home:36,Left:37,Up:38,Right:39,Down:40,Insert:45,Delete:46,Keyb0:48,Keyb1:49,Keyb2:50,Keyb3:51,Keyb4:52,Keyb5:53,Keyb6:54,Keyb7:55,Keyb8:56,Keyb9:57,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90,Numpad0:96,Numpad1:97,Numpad2:98,Numpad3:99,Numpad4:100,Numpad5:101,Numpad6:102,Numpad7:103,Numpad8:104,Numpad9:105,NumpadStar:106,NumpadPlus:107,NumpadMinus:109,NumpadPeriod:110,NumpadSlash:111,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,F13:124,F14:125,F15:126,NumLck:144,ScrLck:145,SemiColon:186,Equal:187,Comma:188,Minus:189,Period:190,Question:191,BackQuote:192,LeftBrace:219,Pipe:220,RightBrace:221,SingleQuote:222}}.call(this),function(){var a,b,c=[].slice;nv.extend=function(a){var b,c;c=[];for(b in a)c.push(this[b]=a[b]);return c},nv.extend({log:function(){var a,b,c,d;d=[];for(b=0,c=arguments.length;b<c;b++)a=arguments[b],d.push(console.log(a));return d},bind:function(a,b){var d;return d=function(){return b.call.apply(b,[a].concat(c.call(arguments)))},d},keydown:function(a,b){return $(document).on("keydown",function(c){if(c.keyCode===a)return b()})},keyup:function(a,b){return $(document).on("keyup",function(c){if(c.keyCode===a)return b()})}}),b=function(){function a(){this.gamepad=navigator.webkitGamepad,this.state={},this.listeners={}}return a.prototype.aliasKey=function(a,b){var c=this;return nv.keydown(b,function(){return c.fireButton(a)}),nv.keyup(b,function(){return c.state[a]=!1})},a.prototype.fireButton=function(a){var b,c,d,e,f;this.state[a]=!0,c=this.listeners[a];if(c instanceof Array){f=[];for(d=0,e=c.length;d<e;d++)b=c[d],f.push(b(a));return f}},a.prototype.onButtonPress=function(a,b){var c;return c=this.listeners[a],c||(c=[]),c.push(b),this.listeners[a]=c,b},a.prototype.offButtonPress=function(a,b){var c;return c=this.listeners[a],c.indexOf(b(!0))&&c.splice(c.indexOf(b),1),this.listeners[a]=c,b},a.prototype.getState=function(){return this.state},a}(),nv.gamepad=function(){return new b},a=function(){function a(){this.following=null,this.x=0,this.y=0,this.offsetX=0,this.offsetY=0,this.zoomValue=1}return a.prototype.follow=function(a,b,c){return this.following=a,this.offsetX=b,this.offsetY=c},a.prototype.zoom=function(a,b){var c,d,e=this;return b?(d=Date.now(),c=this.zoomValue,this.onUpdate=function(f){var g,h;h=Date.now(),g=h-d,e.zoomValue=(a-c)*(g/b)+c;if(g>b)return e.onUpdate=null,e.zoomValue=a}):this.zoomValue=a},a.prototype.update=function(a,b,c){var d;return this.following&&(d=c.size(),this.offsetX=d.width/2,this.offsetY=d.height/2,this.x=-this.following.x*this.zoomValue+this.offsetX,this.y=-this.following.y*this.zoomValue+this.offsetY),this.onUpdate&&this.onUpdate(a),b.translate(this.x,this.y),b.scale(this.zoomValue,this.zoomValue)},a}(),nv.camera=function(){return new a}}.call(this),function(){var a;a=function(){function a(){this.listeners=[]}return a.prototype.on=function(a,b){var c;return c=this.listeners[a],c instanceof Array||(c=[]),c.push(b),this.listeners[a]=c,this},a.prototype.fire=function(a,b){var c,d,e,f,g;b=b!=null?b:{},b.data=b,b.type=a,d=this.listeners[a];if(d instanceof Array){g=[];for(e=0,f=d.length;e<f;e++)c=d[e],g.push(c(b));return g}},a.prototype.off=function(a,b){return!this.listeners[a]instanceof Array||this.listeners[a].indexOf(b(!0))&&this.listeners[a].splice(this.listeners[a].indexOf(b),1),this},a}(),window.EventDispatcher=a}.call(this),function(){var a,b={}.hasOwnProperty,c=function(a,c){function e(){this.constructor=a}for(var d in c)b.call(c,d)&&(a[d]=c[d]);return e.prototype=c.prototype,a.prototype=new e,a.__super__=c.prototype,a};a=function(a){function b(){var a=this;this.listeners={},this.connection=this.connectToChannel("novus"),this.connection.on("connect",function(){return console.log("Connected!")}),this.connection.on("join",function(a){return console.log(a)}),this.connection.on("message",function(b){return a.handleMessage(b)})}return c(b,a),b.prototype.handleMessage=function(a){console.log(a);if(a.id)return this.fire(a.id,a)},b.prototype.send=function(a,b){return b.id=a,this.connection.emit("message",b)},b.prototype.connectToChannel=function(a){return io.connect("http://pubsub.pubnub.com",{channel:a,publish_key:"pub-c54880a5-ba99-4836-a084-08f57b4b5333",subscribe_key:"sub-3129de73-8f26-11e1-94c8-1543525cae6d",ssl:!1})},b.prototype.auth=function(a){var b=this;return $.post("http://localhost:3000",{user:a},function(a){var c;return c=JSON.parse(a).token,b.connection=b.connectToChannel(c),b.connection.send("Hello server!")})},b}(EventDispatcher),window.nub=function(){return new a}}.call(this),function(){var a,b,c,d,e,f,g,h,i,j,k,l,m,n;c=(d=(e=(g=(h=(i=window.requestAnimationFrame)!=null?i:window.webkitRequestAnimationFrame)!=null?h:window.mozRequestAnimationFrame)!=null?g:window.oRequestAnimationFrame)!=null?e:window.msRequestAnimationFrame)!=null?d:function(a){return setTimeout(a,17)},a=(j=(k=(l=(m=(n=(f=window.cancelRequestAnimationFrame)!=null?f:window.webkitCancelAnimationFrame)!=null?n:window.webkitCancelRequestAnimationFrame)!=null?m:window.mozCancelRequestAnimationFrame)!=null?l:window.oCancelRequestAnimationFrame)!=null?k:window.msCancelRequestAnimationFrame)!=null?j:clearTimeout,b=function(a){return new b.prototype.init(a)},b.prototype={init:function(a){return typeof a=="string"&&(a=document.querySelector(a)),a=a!=null?a:document.createElement("canvas"),b.prototype.extend.call(a,b.prototype),a.context=b.context(a.getContext("2d")),a.objects=[],a.requestFrameKey=null,a.updating=!1,a},size:function(a,b){var c;return a!=null&&b!=null?(this.width=a,this.height=b,this):c={width:this.width,height:this.height}},fullscreen:function(){var a=this;return this.size(window.innerWidth,window.innerHeight),window.addEventListener("resize",function(b){return a.size(window.innerWidth,window.innerHeight)})},background:function(a){return this.style.background=a},draw:function(a){return a.draw(this.context,this)},addDrawable:function(a){return this.objects.push(a)},removeDrawable:function(a){return this.objects.splice(this.objects.indexOf(a),1)},drawObjects:function(){var a,b,c,d,e;d=this.objects,e=[];for(b=0,c=d.length;b<c;b++)a=d[b],e.push(this.draw(a));return e},startDrawUpdate:function(a,b){var d,e,f=this;return this.updating=!0,d=Date.now(),e=function(){var a,g,h;g=Date.now(),a=g-d,a/=1e3,h=b(a),f.context.save(),f.context.clear(),f.camera&&f.camera.update(a,f.context,f),f.drawObjects(),f.context.restore(),d=g;if(f.cancel)return f.cancel=!1;if(!!f.updating)return f.requestFrameKey=c(e)},this.requestFrameKey=c(e)},stopDrawUpdate:function(){return this.updating=!1,this.cancel=!0,a(this.requestFrameKey)},extend:function(a){var b;for(b in a)this[b]=a[b];return this}},b.prototype.init.prototype=b.prototype,window.gl=b,b.prototype.extend.call(b,{implement:function(a){return b.prototype.extend.call(b,a)},context:function(a){return b.prototype.extend.call(a,b.context.prototype),a}}),b.prototype.extend.call(b.context.prototype,{color:function(a){return this.fillStyle=a},strokeColor:function(a){return this.strokeStyle=a},strokeWidth:function(a){return this.lineWidth=a},setFont:function(a){return this.font=a},fillPath:function(a){return this.beginPath(),a(this),this.fill(),this.closePath()},line:function(){this.beginPath(),this.moveTo(Array.prototype.shift.call(arguments),Array.prototype.shift.call(arguments));while(arguments.length>0)this.lineTo(Array.prototype.shift.call(arguments),Array.prototype.shift.call(arguments));return this.stroke(),this.closePath()},rotateAround:function(a,b,c,d){return this.save(),this.translate(a,b),this.rotate(c),this.translate(-a,-b),d(),this.restore()},clear:function(){return this.clearRect(0,0,this.canvas.width,this.canvas.height)}}),b.implement({drawable:function(a){return b.prototype.extend.call(this,a),b.prototype.extend.call(this.prototype,a),this}}),b.implement({square:function(a){var c;return c={color:"#CCC",width:10,height:10,x:10,y:10},b.prototype.extend.call(c,a),b.drawable.call(this,c),this}}),b.prototype.extend.call(b.square.prototype,{draw:function(a){return a.color(this.color),a.fillRect(this.x,this.y,this.width,this.height)}}),b.implement({text:function(a){var c;return c={color:"#CCC",x:10,y:10,font:"bold 20px sans-serif",textBaseline:"bottom",text:"Lorem Ipsum"},b.prototype.extend.call(c,a),b.drawable.call(this,c),this}}),b.prototype.extend.call(b.text.prototype,{draw:function(a){return a.color(this.color),a.setFont(this.font),a.textBaseline=this.textBaseline,a.fillText(this.text,this.x,this.y)}}),b.implement({sprite:function(a){var c,d=this;return c={src:"",x:10,y:10,width:null,height:null},b.prototype.extend.call(c,a),b.drawable.call(this,c),this.loaded=!1,this.image=new Image,this.image.onload=function(){return d.width||(d.width=d.image.width),d.height||(d.height=d.image.height),d.loaded=!0},this.image.src=this.src,this}}),b.prototype.extend.call(b.sprite.prototype,{draw:function(a){return a.drawImage(this.image,this.x,this.y,this.width,this.height)}})}.call(this),function(){var a;a=function(){function a(){}return a.prototype.html='<div id="debug"></div>',a.prototype.log=function(){var a;return a=arguments,console.log(arguments)},a}(),$(function(){return nv.Debug=new a,nv.log=nv.Debug.log})}.call(this),function(){var a,b,c,d,e,f,g={}.hasOwnProperty,h=function(a,b){function d(){this.constructor=a}for(var c in b)g.call(b,c)&&(a[c]=b[c]);return d.prototype=b.prototype,a.prototype=new d,a.__super__=b.prototype,a};b=function(){function a(){var a,b,c,d;this.canvas=gl().size(700,700),this.x=0,this.y=0,this.width=this.canvas.width,this.height=this.canvas.height,a=0;while(!(a>100))a++,c=Math.random()*700,d=Math.random()*700,b=Math.random()*2+.5,this.canvas.context.fillPath(function(a){return a.color("#FFFFFF"),a.arc(c,d,b,0,Math.PI*2,!0)})}return a}(),c=function(){function a(a,b){this.angle=b,this.x=a.x,this.y=a.y,this.id=null,this.speed=400,this.radius=3,this.alive=!0,this.life=100}return a}(),f=function(){function a(){this.id=null,this.x=0,this.y=30,this.width=12,this.height=18,this.rotation=0,this.speed=5,this._path=[],this._wireframe=[],this.initPath()}return a.prototype.initPath=function(){return this._wireframe=[new nv.Point(0,-this.height/2),new nv.Point(this.width/2,this.height/2),new nv.Point(-this.width/2,this.height/2)],this._updatePath()},a.prototype._updatePath=function(){var a,b,c,d;return a=Math.cos(this.rotation),d=Math.sin(this.rotation),b=[],c=this,$.each(this._wireframe,function(){return b.push(new nv.Point(this.x*a-this.y*d+c.x,this.x*d+this.y*a+c.y))}),console.log(b[0].x,b[0].y,b[1].x,b[1].y,b[2].x,b[2].y),this._path=b},a.prototype.nose=function(){return this._path[0]},a.prototype.path=function(){return this._path},a.prototype.rotate=function(a){return this.rotation+=a,this._updatePath()},a.prototype.translate=function(a,b){return this.x+=a,this.y+=b,this._updatePath()},a}(),a=function(){function a(a,b){this.id=null,this.x=a*Math.random(),this.y=b*Math.random(),this.width=12,this.height=12,this.rotation=0,this.speed=Math.random()+.3,this.direction=Math.random()*Math.PI-Math.PI/2}return a}(),e=function(){function a(a){this.glcanvas=a,this.x=0,this.y=0,this.width=this.glcanvas.size().width,this.height=this.glcanvas.size().height,this.color="#FFF",this.lives=3,this.score=1e5}return a}(),d=function(a){function b(){this.title="Asteroids",this.actionText="Press <Space> to Start.",this.options={difficulty:"easy"}}return h(b,a),b}(nv.Model),$(function(){return nv.models={Background:b,Ship:f,Bullet:c,Asteroid:a,Hud:e,Global:d}})}.call(this),function(){var a,b,c,d,e={}.hasOwnProperty,f=function(a,b){function d(){this.constructor=a}for(var c in b)e.call(b,c)&&(a[c]=b[c]);return d.prototype=b.prototype,a.prototype=new d,a.__super__=b.prototype,a};b=function(a){function b(a,c){this.ship=a,this.glcanvas=c,b.__super__.constructor.apply(this,arguments),this.assets=[],this.shotDelay=10}return f(b,a),b.prototype.update=function(a,b){var c,e,f=this;return e=b.getState(),e.shoot&&this.shotDelay===0&&(console.log(this.ship.nose(),this.ship.rotation),c=new nv.models.Bullet(this.ship.nose(),this.ship.rotation),this.assets.push(c),$(document).trigger("new:bullet",{asset:c}),this.shotDelay=10),this.shotDelay&&this.shotDelay--,$.each(this.assets,function(b,c){c.x+=c.speed*Math.sin(c.angle)*a,c.y-=c.speed*Math.cos(c.angle)*a;if(c.x<-100||c.x>900)if(c.y<-100||c.y>900)c.alive=!1;return c.life--,c.life>0||(c.alive=!1),d(c,f.glcanvas)}),this.assets=this.assets.filter(function(a){return a.alive})},b}(nv.Controller),d=function(a,b){var c;c=b.size(),a.x<0?a.x=c.width:a.x>c.width&&(a.x=0);if(a.y<0)return a.y=c.height;if(a.y>c.height)return a.y=0},a=function(a){function b(a,c){this.assets=a,this.glcanvas=c,b.__super__.constructor.apply(this,arguments)}return f(b,a),b.prototype.update=function(a){var b=this;return $.each(this.assets,function(a,c){return c.x+=Math.sin(c.direction)*c.speed,c.y+=Math.cos(c.direction)*c.speed,d(c,b.glcanvas)})},b}(nv.Controller),c=function(a){function b(a,c){this.glcanvas=c,b.__super__.constructor.apply(this,arguments),this.speed=5,this.shootDelay=10}return f(b,a),b.prototype.update=function(a,b){var c;return c=b.getState(),c.left&&this.asset.rotate(-0.1),c.right&&this.asset.rotate(.1),c.up&&this.asset.translate(this.speed*Math.sin(this.asset.rotation),-this.speed*Math.cos(this.asset.rotation)),c.down&&this.asset.translate(-this.speed/2*Math.sin(this.asset.rotation),this.speed/2*Math.cos(this.asset.rotation)),d(this.asset,this.glcanvas)},b}(nv.Controller),$(function(){return nv.controllers={ShipController:c,BulletController:b,AsteroidController:a}})}.call(this),function(){var a,b,c,d,e,f,g={}.hasOwnProperty,h=function(a,b){function d(){this.constructor=a}for(var c in b)g.call(b,c)&&(a[c]=b[c]);return d.prototype=b.prototype,a.prototype=new d,a.__super__=b.prototype,a};b=function(a){function b(a,c){this.glcanvas=a,b.__super__.constructor.apply(this,arguments)}return h(b,a),b.prototype.draw=function(a,b){var c,d,e,f,g,h,i;c=-this.glcanvas.camera.x,d=-this.glcanvas.camera.y,g=c+(this.asset.x-c)%this.asset.width,h=d+(this.asset.y-d)%this.asset.height,g>c&&(g-=this.asset.width),h>d&&(h-=this.asset.height),e=g,f=h,i=[];while(e<c+this.glcanvas.width){while(f<d+this.glcanvas.height)a.drawImage(this.asset.canvas,e,f),f+=this.asset.height;f=h,i.push(e+=this.asset.width)}return i},b}(nv.ObjectRenderer),c=function(a){function b(a,c){var d=this;b.__super__.constructor.apply(this,arguments),$(document).on("new:bullet",function(a){return d.add(a.data.asset)})}return h(b,a),b.prototype.draw=function(a){return $.each(this.assets,function(b,c){var d=this;return a.fillPath(function(a){return a.color("#ff7600"),a.arc(c.x,c.y,c.radius,0,Math.PI*2,!0)})}),this.assets=this.assets.filter(function(a){return a.alive})},b}(nv.ObjectListRenderer),f=function(a){function b(a,c){b.__super__.constructor.apply(this,arguments),this.color="#FFF",this.strokeWidth=2}return h(b,a),b.prototype.draw=function(a){var b,c=this;return a.strokeColor(this.color),a.strokeWidth(this.strokeWidth),a.rotateAround(this.asset.x+this.asset.width/2,this.asset.y+this.asset.height/2,this.asset.rotation,function(){return a.line(c.asset.x,c.asset.y+c.asset.height,c.asset.x+c.asset.width/2,c.asset.y,c.asset.x+c.asset.width,c.asset.y+c.asset.height,c.asset.x,c.asset.y+c.asset.height)}),b=this.asset.path(),a.beginPath(),a.strokeColor("#929"),a.strokeWidth(10),a.moveTo(b[0].x,b[0].y),$.each(b,function(){return a.lineTo(this.x,this.y)}),a.lineTo(b[0].x,b[0].y),a.stroke(),a.closePath()},b}(nv.ObjectRenderer),a=function(a){function b(a,c){b.__super__.constructor.apply(this,arguments),this.color="#FFF",this.strokeWidth=2}return h(b,a),b.prototype.draw=function(a){var b=this;return $.each(this.assets,function(c,d){return a.fillPath(function(a){return a.color("rgba(0, 0, 0, 0)"),a.strokeColor(b.color),a.strokeWidth(2),a.line(d.x,d.y,d.x+30,d.y+20,d.x+35,d.y+50,d.x+23,d.y+60,d.x-10,d.y+50,d.x-20,d.y+15,d.x,d.y)})})},b}(nv.ObjectListRenderer),d=function(a){function b(a,c){this.glcanvas=a,b.__super__.constructor.apply(this,arguments),this.ship=new nv.models.Ship,this.shipRenderer=new nv.renderers.ShipRenderer(this.glcanvas,this.ship)}return h(b,a),b.prototype.draw=function(a){var b,c;a.strokeColor(this.color),a.strokeRect(this.asset.x,this.asset.y,this.asset.width,this.asset.height),a.fillStyle="#F00",a.font="italic bold 30px sans-serif",a.textBaseline="bottom",a.fillText("Asteroids",-this.glcanvas.camera.x+20,-this.glcanvas.camera.y+50),a.fillStyle="#FFF",a.font="bold 30px sans-serif",a.textBaseline="bottom",b=this.glcanvas.size(),a.fillText(this.asset.score,-this.glcanvas.camera.x+b.width-120,-this.glcanvas.camera.y+b.height-10),c=this.asset.lives;while(c--)this.ship.x=-this.glcanvas.camera.x+180+c*30,this.ship.y=-this.glcanvas.camera.y+25,this.shipRenderer.draw(a);return this},b}(nv.ObjectRenderer),e=function(a){function b(a,c){this.glcanvas=a,this.model=c,b.__super__.constructor.apply(this,arguments),this.title=new gl.text({color:"#F00",x:200,y:200,font:"bold 20px sans-serif",text:this.model.title}),this.actionText=new gl.text({color:"#F00",x:200,y:300,font:"bold 20px sans-serif",text:this.model.actionText})}return h(b,a),b.prototype.draw=function(a){return this.title.draw(a),this.actionText.draw(a)},b}(nv.ObjectRenderer),$(function(){return nv.renderers={ShipRenderer:f,BulletRenderer:c,BackgroundRenderer:b,AsteroidRenderer:a,HudRenderer:d,MainRenderer:e}})}.call(this),function(){var a,b,c={}.hasOwnProperty,d=function(a,b){function e(){this.constructor=a}for(var d in b)c.call(b,d)&&(a[d]=b[d]);return e.prototype=b.prototype,a.prototype=new e,a.__super__=b.prototype,a};b=function(a){function b(a,c,d){var e;this.glcanvas=a,this.gamepad=c,this.callback=d,b.__super__.constructor.apply(this,arguments),this.addModel("Global",(e=window.global)!=null?e:new nv.models.Global),this.addModel("Bg",new nv.models.Background),this.addModel("Bg2",new nv.models.Background),this.addRenderer(new nv.renderers.MainRenderer(this.glcanvas,this.getModel("Global"))),this.addRenderer(new nv.renderers.BackgroundRenderer(this.glcanvas,this.getModel("Bg"))),this.addRenderer(new nv.renderers.BackgroundRenderer(this.glcanvas,this.getModel("Bg2"))),this.glcanvas.camera=nv.camera(),this.glcanvas.startDrawUpdate(10,nv.bind(this,this.update))}return d(b,a),b.prototype.update=function(a){var b;b=this.gamepad.getState();if(b.shoot)return this.destroy()},b.prototype.destroy=function(){var a,b,c,d;d=this.renderers;for(b=0,c=d.length;b<c;b++)a=d[b],a.destroy();this.glcanvas.stopDrawUpdate();if(!!this.callback)return this.callback()},b}(nv.Scene),a=function(a){function b(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p=this;this.gamepad=b,this.bg=new nv.models.Background,this.bg2=new nv.models.Background,this.ship=new nv.models.Ship,c=new nv.models.Asteroid(500,500),d=new nv.models.Asteroid(500,500),e=new nv.models.Asteroid(500,500),l=new nv.models.Hud(a),f=new nv.controllers.AsteroidController([c,d,e],a),n=new nv.controllers.ShipController(this.ship,a),j=new nv.controllers.BulletController(this.ship,a),this.controllers=[j,f,n],i=new nv.renderers.BackgroundRenderer(a,this.bg,this.ship),h=new nv.renderers.BackgroundRenderer(a,this.bg2,this.ship),o=new nv.renderers.ShipRenderer(a,this.ship),g=new nv.renderers.AsteroidRenderer(a,[c,d,e]),m=new nv.renderers.HudRenderer(a,l),k=new nv.renderers.BulletRenderer(a,[]),this.renderers=[i,h,o,g,m,k],a.camera=nv.camera(),a.camera.follow(this.ship,250,250),a.camera.zoom(.5),a.camera.zoom(1,2e3),a.startDrawUpdate(60,function(a){return p.update.call(p,a)})}return d(b,a),b.prototype.update=function(a){var b,c,d,e;e=this.controllers;for(c=0,d=e.length;c<d;c++)b=e[c],b.update(a,this.gamepad);return this.bg.x=-this.ship.x*.05,this.bg.y=-this.ship.y*.05,this.bg2.x=-this.ship.x*.01,this.bg2.y=-this.ship.y*.01},b}(nv.Scene),$(function(){var c,d,e;return c=document.querySelector("canvas"),e=gl(c),c===void 0&&document.body.appendChild(e.canvas),e.size(500,500),e.background("#000"),e.fullscreen(),d=nv.gamepad(),d.aliasKey("left",nv.Key.A),d.aliasKey("right",nv.Key.D),d.aliasKey("up",nv.Key.W),d.aliasKey("down",nv.Key.S),d.aliasKey("shoot",nv.Key.Spacebar),new b(e,d,function(){return new a(e,d)})})}.call(this)