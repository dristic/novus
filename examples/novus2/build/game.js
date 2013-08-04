/* Zepto v1.0rc1 - polyfill zepto event detect fx ajax form touch - zeptojs.com/license */
(function(a){String.prototype.trim===a&&(String.prototype.trim=function(){return this.replace(/^\s+/,"").replace(/\s+$/,"")}),Array.prototype.reduce===a&&(Array.prototype.reduce=function(b){if(this===void 0||this===null)throw new TypeError;var c=Object(this),d=c.length>>>0,e=0,f;if(typeof b!="function")throw new TypeError;if(d==0&&arguments.length==1)throw new TypeError;if(arguments.length>=2)f=arguments[1];else do{if(e in c){f=c[e++];break}if(++e>=d)throw new TypeError}while(!0);while(e<d)e in c&&(f=b.call(a,f,c[e],e,c)),e++;return f})})();var Zepto=function(){function A(a){return v.call(a)=="[object Function]"}function B(a){return a instanceof Object}function C(b){var c,d;if(v.call(b)!=="[object Object]")return!1;d=A(b.constructor)&&b.constructor.prototype;if(!d||!hasOwnProperty.call(d,"isPrototypeOf"))return!1;for(c in b);return c===a||hasOwnProperty.call(b,c)}function D(a){return a instanceof Array}function E(a){return typeof a.length=="number"}function F(b){return b.filter(function(b){return b!==a&&b!==null})}function G(a){return a.length>0?[].concat.apply([],a):a}function H(a){return a.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function I(a){return a in i?i[a]:i[a]=new RegExp("(^|\\s)"+a+"(\\s|$)")}function J(a,b){return typeof b=="number"&&!k[H(a)]?b+"px":b}function K(a){var b,c;return h[a]||(b=g.createElement(a),g.body.appendChild(b),c=j(b,"").getPropertyValue("display"),b.parentNode.removeChild(b),c=="none"&&(c="block"),h[a]=c),h[a]}function L(b,d){return d===a?c(b):c(b).filter(d)}function M(a,b,c,d){return A(b)?b.call(a,c,d):b}function N(a,b,d){var e=a%2?b:b.parentNode;e?e.insertBefore(d,a?a==1?e.firstChild:a==2?b:null:b.nextSibling):c(d).remove()}function O(a,b){b(a);for(var c in a.childNodes)O(a.childNodes[c],b)}var a,b,c,d,e=[],f=e.slice,g=window.document,h={},i={},j=g.defaultView.getComputedStyle,k={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},l=/^\s*<(\w+|!)[^>]*>/,m=[1,3,8,9,11],n=["after","prepend","before","append"],o=g.createElement("table"),p=g.createElement("tr"),q={tr:g.createElement("tbody"),tbody:o,thead:o,tfoot:o,td:p,th:p,"*":g.createElement("div")},r=/complete|loaded|interactive/,s=/^\.([\w-]+)$/,t=/^#([\w-]+)$/,u=/^[\w-]+$/,v={}.toString,w={},x,y,z=g.createElement("div");return w.matches=function(a,b){if(!a||a.nodeType!==1)return!1;var c=a.webkitMatchesSelector||a.mozMatchesSelector||a.oMatchesSelector||a.matchesSelector;if(c)return c.call(a,b);var d,e=a.parentNode,f=!e;return f&&(e=z).appendChild(a),d=~w.qsa(e,b).indexOf(a),f&&z.removeChild(a),d},x=function(a){return a.replace(/-+(.)?/g,function(a,b){return b?b.toUpperCase():""})},y=function(a){return a.filter(function(b,c){return a.indexOf(b)==c})},w.fragment=function(b,d){d===a&&(d=l.test(b)&&RegExp.$1),d in q||(d="*");var e=q[d];return e.innerHTML=""+b,c.each(f.call(e.childNodes),function(){e.removeChild(this)})},w.Z=function(a,b){return a=a||[],a.__proto__=arguments.callee.prototype,a.selector=b||"",a},w.isZ=function(a){return a instanceof w.Z},w.init=function(b,d){if(!b)return w.Z();if(A(b))return c(g).ready(b);if(w.isZ(b))return b;var e;if(D(b))e=F(b);else if(C(b))e=[c.extend({},b)],b=null;else if(m.indexOf(b.nodeType)>=0||b===window)e=[b],b=null;else if(l.test(b))e=w.fragment(b.trim(),RegExp.$1),b=null;else{if(d!==a)return c(d).find(b);e=w.qsa(g,b)}return w.Z(e,b)},c=function(a,b){return w.init(a,b)},c.extend=function(c){return f.call(arguments,1).forEach(function(d){for(b in d)d[b]!==a&&(c[b]=d[b])}),c},w.qsa=function(a,b){var c;return a===g&&t.test(b)?(c=a.getElementById(RegExp.$1))?[c]:e:a.nodeType!==1&&a.nodeType!==9?e:f.call(s.test(b)?a.getElementsByClassName(RegExp.$1):u.test(b)?a.getElementsByTagName(b):a.querySelectorAll(b))},c.isFunction=A,c.isObject=B,c.isArray=D,c.isPlainObject=C,c.inArray=function(a,b,c){return e.indexOf.call(b,a,c)},c.trim=function(a){return a.trim()},c.uuid=0,c.map=function(a,b){var c,d=[],e,f;if(E(a))for(e=0;e<a.length;e++)c=b(a[e],e),c!=null&&d.push(c);else for(f in a)c=b(a[f],f),c!=null&&d.push(c);return G(d)},c.each=function(a,b){var c,d;if(E(a)){for(c=0;c<a.length;c++)if(b.call(a[c],c,a[c])===!1)return a}else for(d in a)if(b.call(a[d],d,a[d])===!1)return a;return a},c.fn={forEach:e.forEach,reduce:e.reduce,push:e.push,indexOf:e.indexOf,concat:e.concat,map:function(a){return c.map(this,function(b,c){return a.call(b,c,b)})},slice:function(){return c(f.apply(this,arguments))},ready:function(a){return r.test(g.readyState)?a(c):g.addEventListener("DOMContentLoaded",function(){a(c)},!1),this},get:function(b){return b===a?f.call(this):this[b]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){this.parentNode!=null&&this.parentNode.removeChild(this)})},each:function(a){return this.forEach(function(b,c){a.call(b,c,b)}),this},filter:function(a){return c([].filter.call(this,function(b){return w.matches(b,a)}))},add:function(a,b){return c(y(this.concat(c(a,b))))},is:function(a){return this.length>0&&w.matches(this[0],a)},not:function(b){var d=[];if(A(b)&&b.call!==a)this.each(function(a){b.call(this,a)||d.push(this)});else{var e=typeof b=="string"?this.filter(b):E(b)&&A(b.item)?f.call(b):c(b);this.forEach(function(a){e.indexOf(a)<0&&d.push(a)})}return c(d)},eq:function(a){return a===-1?this.slice(a):this.slice(a,+a+1)},first:function(){var a=this[0];return a&&!B(a)?a:c(a)},last:function(){var a=this[this.length-1];return a&&!B(a)?a:c(a)},find:function(a){var b;return this.length==1?b=w.qsa(this[0],a):b=this.map(function(){return w.qsa(this,a)}),c(b)},closest:function(a,b){var d=this[0];while(d&&!w.matches(d,a))d=d!==b&&d!==g&&d.parentNode;return c(d)},parents:function(a){var b=[],d=this;while(d.length>0)d=c.map(d,function(a){if((a=a.parentNode)&&a!==g&&b.indexOf(a)<0)return b.push(a),a});return L(b,a)},parent:function(a){return L(y(this.pluck("parentNode")),a)},children:function(a){return L(this.map(function(){return f.call(this.children)}),a)},siblings:function(a){return L(this.map(function(a,b){return f.call(b.parentNode.children).filter(function(a){return a!==b})}),a)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(a){return this.map(function(){return this[a]})},show:function(){return this.each(function(){this.style.display=="none"&&(this.style.display=null),j(this,"").getPropertyValue("display")=="none"&&(this.style.display=K(this.nodeName))})},replaceWith:function(a){return this.before(a).remove()},wrap:function(a){return this.each(function(){c(this).wrapAll(c(a)[0].cloneNode(!1))})},wrapAll:function(a){return this[0]&&(c(this[0]).before(a=c(a)),a.append(this)),this},unwrap:function(){return this.parent().each(function(){c(this).replaceWith(c(this).children())}),this},clone:function(){return c(this.map(function(){return this.cloneNode(!0)}))},hide:function(){return this.css("display","none")},toggle:function(b){return(b===a?this.css("display")=="none":b)?this.show():this.hide()},prev:function(){return c(this.pluck("previousElementSibling"))},next:function(){return c(this.pluck("nextElementSibling"))},html:function(b){return b===a?this.length>0?this[0].innerHTML:null:this.each(function(a){var d=this.innerHTML;c(this).empty().append(M(this,b,a,d))})},text:function(b){return b===a?this.length>0?this[0].textContent:null:this.each(function(){this.textContent=b})},attr:function(c,d){var e;return typeof c=="string"&&d===a?this.length==0||this[0].nodeType!==1?a:c=="value"&&this[0].nodeName=="INPUT"?this.val():!(e=this[0].getAttribute(c))&&c in this[0]?this[0][c]:e:this.each(function(a){if(this.nodeType!==1)return;if(B(c))for(b in c)this.setAttribute(b,c[b]);else this.setAttribute(c,M(this,d,a,this.getAttribute(c)))})},removeAttr:function(a){return this.each(function(){this.nodeType===1&&this.removeAttribute(a)})},prop:function(b,c){return c===a?this[0]?this[0][b]:a:this.each(function(a){this[b]=M(this,c,a,this[b])})},data:function(b,c){var d=this.attr("data-"+H(b),c);return d!==null?d:a},val:function(b){return b===a?this.length>0?this[0].value:a:this.each(function(a){this.value=M(this,b,a,this.value)})},offset:function(){if(this.length==0)return null;var a=this[0].getBoundingClientRect();return{left:a.left+window.pageXOffset,top:a.top+window.pageYOffset,width:a.width,height:a.height}},css:function(c,d){if(d===a&&typeof c=="string")return this.length==0?a:this[0].style[x(c)]||j(this[0],"").getPropertyValue(c);var e="";for(b in c)typeof c[b]=="string"&&c[b]==""?this.each(function(){this.style.removeProperty(H(b))}):e+=H(b)+":"+J(b,c[b])+";";return typeof c=="string"&&(d==""?this.each(function(){this.style.removeProperty(H(c))}):e=H(c)+":"+J(c,d)),this.each(function(){this.style.cssText+=";"+e})},index:function(a){return a?this.indexOf(c(a)[0]):this.parent().children().indexOf(this[0])},hasClass:function(a){return this.length<1?!1:I(a).test(this[0].className)},addClass:function(a){return this.each(function(b){d=[];var e=this.className,f=M(this,a,b,e);f.split(/\s+/g).forEach(function(a){c(this).hasClass(a)||d.push(a)},this),d.length&&(this.className+=(e?" ":"")+d.join(" "))})},removeClass:function(b){return this.each(function(c){if(b===a)return this.className="";d=this.className,M(this,b,c,d).split(/\s+/g).forEach(function(a){d=d.replace(I(a)," ")}),this.className=d.trim()})},toggleClass:function(b,d){return this.each(function(e){var f=M(this,b,e,this.className);(d===a?!c(this).hasClass(f):d)?c(this).addClass(f):c(this).removeClass(f)})}},["width","height"].forEach(function(b){c.fn[b]=function(d){var e,f=b.replace(/./,function(a){return a[0].toUpperCase()});return d===a?this[0]==window?window["inner"+f]:this[0]==g?g.documentElement["offset"+f]:(e=this.offset())&&e[b]:this.each(function(a){var e=c(this);e.css(b,M(this,d,a,e[b]()))})}}),n.forEach(function(a,b){c.fn[a]=function(){var a=c.map(arguments,function(a){return B(a)?a:w.fragment(a)});if(a.length<1)return this;var d=this.length,e=d>1,f=b<2;return this.each(function(c,g){for(var h=0;h<a.length;h++){var i=a[f?a.length-h-1:h];O(i,function(a){a.nodeName!=null&&a.nodeName.toUpperCase()==="SCRIPT"&&(!a.type||a.type==="text/javascript")&&window.eval.call(window,a.innerHTML)}),e&&c<d-1&&(i=i.cloneNode(!0)),N(b,g,i)}})},c.fn[b%2?a+"To":"insert"+(b?"Before":"After")]=function(b){return c(b)[a](this),this}}),w.Z.prototype=c.fn,w.camelize=x,w.uniq=y,c.zepto=w,c}();window.Zepto=Zepto,"$"in window||(window.$=Zepto),function(a){function f(a){return a._zid||(a._zid=d++)}function g(a,b,d,e){b=h(b);if(b.ns)var g=i(b.ns);return(c[f(a)]||[]).filter(function(a){return a&&(!b.e||a.e==b.e)&&(!b.ns||g.test(a.ns))&&(!d||f(a.fn)===f(d))&&(!e||a.sel==e)})}function h(a){var b=(""+a).split(".");return{e:b[0],ns:b.slice(1).sort().join(" ")}}function i(a){return new RegExp("(?:^| )"+a.replace(" "," .* ?")+"(?: |$)")}function j(b,c,d){a.isObject(b)?a.each(b,d):b.split(/\s/).forEach(function(a){d(a,c)})}function k(b,d,e,g,i,k){k=!!k;var l=f(b),m=c[l]||(c[l]=[]);j(d,e,function(c,d){var e=i&&i(d,c),f=e||d,j=function(a){var c=f.apply(b,[a].concat(a.data));return c===!1&&a.preventDefault(),c},l=a.extend(h(c),{fn:d,proxy:j,sel:g,del:e,i:m.length});m.push(l),b.addEventListener(l.e,j,k)})}function l(a,b,d,e){var h=f(a);j(b||"",d,function(b,d){g(a,b,d,e).forEach(function(b){delete c[h][b.i],a.removeEventListener(b.e,b.proxy,!1)})})}function p(b){var c=a.extend({originalEvent:b},b);return a.each(o,function(a,d){c[a]=function(){return this[d]=m,b[a].apply(b,arguments)},c[d]=n}),c}function q(a){if(!("defaultPrevented"in a)){a.defaultPrevented=!1;var b=a.preventDefault;a.preventDefault=function(){this.defaultPrevented=!0,b.call(this)}}}var b=a.zepto.qsa,c={},d=1,e={};e.click=e.mousedown=e.mouseup=e.mousemove="MouseEvents",a.event={add:k,remove:l},a.proxy=function(b,c){if(a.isFunction(b)){var d=function(){return b.apply(c,arguments)};return d._zid=f(b),d}if(typeof c=="string")return a.proxy(b[c],b);throw new TypeError("expected function")},a.fn.bind=function(a,b){return this.each(function(){k(this,a,b)})},a.fn.unbind=function(a,b){return this.each(function(){l(this,a,b)})},a.fn.one=function(a,b){return this.each(function(c,d){k(this,a,b,null,function(a,b){return function(){var c=a.apply(d,arguments);return l(d,b,a),c}})})};var m=function(){return!0},n=function(){return!1},o={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};a.fn.delegate=function(b,c,d){var e=!1;if(c=="blur"||c=="focus")a.iswebkit?c=c=="blur"?"focusout":c=="focus"?"focusin":c:e=!0;return this.each(function(f,g){k(g,c,d,b,function(c){return function(d){var e,f=a(d.target).closest(b,g).get(0);if(f)return e=a.extend(p(d),{currentTarget:f,liveFired:g}),c.apply(f,[e].concat([].slice.call(arguments,1)))}},e)})},a.fn.undelegate=function(a,b,c){return this.each(function(){l(this,b,c,a)})},a.fn.live=function(b,c){return a(document.body).delegate(this.selector,b,c),this},a.fn.die=function(b,c){return a(document.body).undelegate(this.selector,b,c),this},a.fn.on=function(b,c,d){return c==undefined||a.isFunction(c)?this.bind(b,c):this.delegate(c,b,d)},a.fn.off=function(b,c,d){return c==undefined||a.isFunction(c)?this.unbind(b,c):this.undelegate(c,b,d)},a.fn.trigger=function(b,c){return typeof b=="string"&&(b=a.Event(b)),q(b),b.data=c,this.each(function(){"dispatchEvent"in this&&this.dispatchEvent(b)})},a.fn.triggerHandler=function(b,c){var d,e;return this.each(function(f,h){d=p(typeof b=="string"?a.Event(b):b),d.data=c,d.target=h,a.each(g(h,b.type||b),function(a,b){e=b.proxy(d);if(d.isImmediatePropagationStopped())return!1})}),e},"focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout change select keydown keypress keyup error".split(" ").forEach(function(b){a.fn[b]=function(a){return this.bind(b,a)}}),["focus","blur"].forEach(function(b){a.fn[b]=function(a){if(a)this.bind(b,a);else if(this.length)try{this.get(0)[b]()}catch(c){}return this}}),a.Event=function(a,b){var c=document.createEvent(e[a]||"Events"),d=!0;if(b)for(var f in b)f=="bubbles"?d=!!b[f]:c[f]=b[f];return c.initEvent(a,d,!0,null,null,null,null,null,null,null,null,null,null,null,null),c}}(Zepto),function(a){function b(a){var b=this.os={},c=this.browser={},d=a.match(/WebKit\/([\d.]+)/),e=a.match(/(Android)\s+([\d.]+)/),f=a.match(/(iPad).*OS\s([\d_]+)/),g=!f&&a.match(/(iPhone\sOS)\s([\d_]+)/),h=a.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),i=h&&a.match(/TouchPad/),j=a.match(/Kindle\/([\d.]+)/),k=a.match(/Silk\/([\d._]+)/),l=a.match(/(BlackBerry).*Version\/([\d.]+)/);if(c.webkit=!!d)c.version=d[1];e&&(b.android=!0,b.version=e[2]),g&&(b.ios=b.iphone=!0,b.version=g[2].replace(/_/g,".")),f&&(b.ios=b.ipad=!0,b.version=f[2].replace(/_/g,".")),h&&(b.webos=!0,b.version=h[2]),i&&(b.touchpad=!0),l&&(b.blackberry=!0,b.version=l[2]),j&&(b.kindle=!0,b.version=j[1]),k&&(c.silk=!0,c.version=k[1]),!k&&b.android&&a.match(/Kindle Fire/)&&(c.silk=!0)}b.call(a,navigator.userAgent),a.__detect=b}(Zepto),function(a,b){function l(a){return a.toLowerCase()}function m(a){return d?d+a:l(a)}var c="",d,e,f,g={Webkit:"webkit",Moz:"",O:"o",ms:"MS"},h=window.document,i=h.createElement("div"),j=/^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,k={};a.each(g,function(a,e){if(i.style[a+"TransitionProperty"]!==b)return c="-"+l(a)+"-",d=e,!1}),k[c+"transition-property"]=k[c+"transition-duration"]=k[c+"transition-timing-function"]=k[c+"animation-name"]=k[c+"animation-duration"]="",a.fx={off:d===b&&i.style.transitionProperty===b,cssPrefix:c,transitionEnd:m("TransitionEnd"),animationEnd:m("AnimationEnd")},a.fn.animate=function(b,c,d,e){return a.isObject(c)&&(d=c.easing,e=c.complete,c=c.duration),c&&(c/=1e3),this.anim(b,c,d,e)},a.fn.anim=function(d,e,f,g){var h,i={},l,m=this,n,o=a.fx.transitionEnd;e===b&&(e=.4),a.fx.off&&(e=0);if(typeof d=="string")i[c+"animation-name"]=d,i[c+"animation-duration"]=e+"s",o=a.fx.animationEnd;else{for(l in d)j.test(l)?(h||(h=[]),h.push(l+"("+d[l]+")")):i[l]=d[l];h&&(i[c+"transform"]=h.join(" ")),!a.fx.off&&typeof d=="object"&&(i[c+"transition-property"]=Object.keys(d).join(", "),i[c+"transition-duration"]=e+"s",i[c+"transition-timing-function"]=f||"linear")}return n=function(b){if(typeof b!="undefined"){if(b.target!==b.currentTarget)return;a(b.target).unbind(o,arguments.callee)}a(this).css(k),g&&g.call(this)},e>0&&this.bind(o,n),setTimeout(function(){m.css(i),e<=0&&setTimeout(function(){m.each(function(){n.call(this)})},0)},0),this},i=null}(Zepto),function($){function triggerAndReturn(a,b,c){var d=$.Event(b);return $(a).trigger(d,c),!d.defaultPrevented}function triggerGlobal(a,b,c,d){if(a.global)return triggerAndReturn(b||document,c,d)}function ajaxStart(a){a.global&&$.active++===0&&triggerGlobal(a,null,"ajaxStart")}function ajaxStop(a){a.global&&!--$.active&&triggerGlobal(a,null,"ajaxStop")}function ajaxBeforeSend(a,b){var c=b.context;if(b.beforeSend.call(c,a,b)===!1||triggerGlobal(b,c,"ajaxBeforeSend",[a,b])===!1)return!1;triggerGlobal(b,c,"ajaxSend",[a,b])}function ajaxSuccess(a,b,c){var d=c.context,e="success";c.success.call(d,a,e,b),triggerGlobal(c,d,"ajaxSuccess",[b,c,a]),ajaxComplete(e,b,c)}function ajaxError(a,b,c,d){var e=d.context;d.error.call(e,c,b,a),triggerGlobal(d,e,"ajaxError",[c,d,a]),ajaxComplete(b,c,d)}function ajaxComplete(a,b,c){var d=c.context;c.complete.call(d,b,a),triggerGlobal(c,d,"ajaxComplete",[b,c]),ajaxStop(c)}function empty(){}function mimeToDataType(a){return a&&(a==htmlType?"html":a==jsonType?"json":scriptTypeRE.test(a)?"script":xmlTypeRE.test(a)&&"xml")||"text"}function appendQuery(a,b){return(a+"&"+b).replace(/[&?]{1,2}/,"?")}function serializeData(a){isObject(a.data)&&(a.data=$.param(a.data)),a.data&&(!a.type||a.type.toUpperCase()=="GET")&&(a.url=appendQuery(a.url,a.data))}function serialize(a,b,c,d){var e=$.isArray(b);$.each(b,function(b,f){d&&(b=c?d:d+"["+(e?"":b)+"]"),!d&&e?a.add(f.name,f.value):(c?$.isArray(f):isObject(f))?serialize(a,f,c,b):a.add(b,f)})}var jsonpID=0,isObject=$.isObject,document=window.document,key,name,rscript=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,scriptTypeRE=/^(?:text|application)\/javascript/i,xmlTypeRE=/^(?:text|application)\/xml/i,jsonType="application/json",htmlType="text/html",blankRE=/^\s*$/;$.active=0,$.ajaxJSONP=function(a){var b="jsonp"+ ++jsonpID,c=document.createElement("script"),d=function(){$(c).remove(),b in window&&(window[b]=empty),ajaxComplete("abort",e,a)},e={abort:d},f;return a.error&&(c.onerror=function(){e.abort(),a.error()}),window[b]=function(d){clearTimeout(f),$(c).remove(),delete window[b],ajaxSuccess(d,e,a)},serializeData(a),c.src=a.url.replace(/=\?/,"="+b),$("head").append(c),a.timeout>0&&(f=setTimeout(function(){e.abort(),ajaxComplete("timeout",e,a)},a.timeout)),e},$.ajaxSettings={type:"GET",beforeSend:empty,success:empty,error:empty,complete:empty,context:null,global:!0,xhr:function(){return new window.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript",json:jsonType,xml:"application/xml, text/xml",html:htmlType,text:"text/plain"},crossDomain:!1,timeout:0},$.ajax=function(options){var settings=$.extend({},options||{});for(key in $.ajaxSettings)settings[key]===undefined&&(settings[key]=$.ajaxSettings[key]);ajaxStart(settings),settings.crossDomain||(settings.crossDomain=/^([\w-]+:)?\/\/([^\/]+)/.test(settings.url)&&RegExp.$2!=window.location.host);var dataType=settings.dataType,hasPlaceholder=/=\?/.test(settings.url);if(dataType=="jsonp"||hasPlaceholder)return hasPlaceholder||(settings.url=appendQuery(settings.url,"callback=?")),$.ajaxJSONP(settings);settings.url||(settings.url=window.location.toString()),serializeData(settings);var mime=settings.accepts[dataType],baseHeaders={},protocol=/^([\w-]+:)\/\//.test(settings.url)?RegExp.$1:window.location.protocol,xhr=$.ajaxSettings.xhr(),abortTimeout;settings.crossDomain||(baseHeaders["X-Requested-With"]="XMLHttpRequest"),mime&&(baseHeaders.Accept=mime,mime.indexOf(",")>-1&&(mime=mime.split(",",2)[0]),xhr.overrideMimeType&&xhr.overrideMimeType(mime));if(settings.contentType||settings.data&&settings.type.toUpperCase()!="GET")baseHeaders["Content-Type"]=settings.contentType||"application/x-www-form-urlencoded";settings.headers=$.extend(baseHeaders,settings.headers||{}),xhr.onreadystatechange=function(){if(xhr.readyState==4){clearTimeout(abortTimeout);var result,error=!1;if(xhr.status>=200&&xhr.status<300||xhr.status==304||xhr.status==0&&protocol=="file:"){dataType=dataType||mimeToDataType(xhr.getResponseHeader("content-type")),result=xhr.responseText;try{dataType=="script"?(1,eval)(result):dataType=="xml"?result=xhr.responseXML:dataType=="json"&&(result=blankRE.test(result)?null:JSON.parse(result))}catch(e){error=e}error?ajaxError(error,"parsererror",xhr,settings):ajaxSuccess(result,xhr,settings)}else ajaxError(null,"error",xhr,settings)}};var async="async"in settings?settings.async:!0;xhr.open(settings.type,settings.url,async);for(name in settings.headers)xhr.setRequestHeader(name,settings.headers[name]);return ajaxBeforeSend(xhr,settings)===!1?(xhr.abort(),!1):(settings.timeout>0&&(abortTimeout=setTimeout(function(){xhr.onreadystatechange=empty,xhr.abort(),ajaxError(null,"timeout",xhr,settings)},settings.timeout)),xhr.send(settings.data?settings.data:null),xhr)},$.get=function(a,b){return $.ajax({url:a,success:b})},$.post=function(a,b,c,d){return $.isFunction(b)&&(d=d||c,c=b,b=null),$.ajax({type:"POST",url:a,data:b,success:c,dataType:d})},$.getJSON=function(a,b){return $.ajax({url:a,success:b,dataType:"json"})},$.fn.load=function(a,b){if(!this.length)return this;var c=this,d=a.split(/\s/),e;return d.length>1&&(a=d[0],e=d[1]),$.get(a,function(a){c.html(e?$(document.createElement("div")).html(a.replace(rscript,"")).find(e).html():a),b&&b.call(c)}),this};var escape=encodeURIComponent;$.param=function(a,b){var c=[];return c.add=function(a,b){this.push(escape(a)+"="+escape(b))},serialize(c,a,b),c.join("&").replace("%20","+")}}(Zepto),function(a){a.fn.serializeArray=function(){var b=[],c;return a(Array.prototype.slice.call(this.get(0).elements)).each(function(){c=a(this);var d=c.attr("type");this.nodeName.toLowerCase()!="fieldset"&&!this.disabled&&d!="submit"&&d!="reset"&&d!="button"&&(d!="radio"&&d!="checkbox"||this.checked)&&b.push({name:c.attr("name"),value:c.val()})}),b},a.fn.serialize=function(){var a=[];return this.serializeArray().forEach(function(b){a.push(encodeURIComponent(b.name)+"="+encodeURIComponent(b.value))}),a.join("&")},a.fn.submit=function(b){if(b)this.bind("submit",b);else if(this.length){var c=a.Event("submit");this.eq(0).trigger(c),c.defaultPrevented||this.get(0).submit()}return this}}(Zepto),function(a){function d(a){return"tagName"in a?a:a.parentNode}function e(a,b,c,d){var e=Math.abs(a-b),f=Math.abs(c-d);return e>=f?a-b>0?"Left":"Right":c-d>0?"Up":"Down"}function h(){g=null,b.last&&(b.el.trigger("longTap"),b={})}function i(){g&&clearTimeout(g),g=null}var b={},c,f=750,g;a(document).ready(function(){var j,k;a(document.body).bind("touchstart",function(e){j=Date.now(),k=j-(b.last||j),b.el=a(d(e.touches[0].target)),c&&clearTimeout(c),b.x1=e.touches[0].pageX,b.y1=e.touches[0].pageY,k>0&&k<=250&&(b.isDoubleTap=!0),b.last=j,g=setTimeout(h,f)}).bind("touchmove",function(a){i(),b.x2=a.touches[0].pageX,b.y2=a.touches[0].pageY}).bind("touchend",function(a){i(),b.isDoubleTap?(b.el.trigger("doubleTap"),b={}):b.x2&&Math.abs(b.x1-b.x2)>30||b.y2&&Math.abs(b.y1-b.y2)>30?(b.el.trigger("swipe")&&b.el.trigger("swipe"+e(b.x1,b.x2,b.y1,b.y2)),b={}):"last"in b&&(b.el.trigger("tap"),c=setTimeout(function(){c=null,b.el.trigger("singleTap"),b={}},250))}).bind("touchcancel",function(){c&&clearTimeout(c),g&&clearTimeout(g),g=c=null,b={}})}),["swipe","swipeLeft","swipeRight","swipeUp","swipeDown","doubleTap","tap","singleTap","longTap"].forEach(function(b){a.fn[b]=function(a){return this.bind(b,a)}})}(Zepto);
(function() {
  var _ref, _ref1, _ref10, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9;

  this.gleam = typeof gleam !== "undefined" && gleam !== null ? gleam : {
    requestFrame: (_ref = (_ref1 = (_ref2 = (_ref3 = (_ref4 = window.requestAnimationFrame) != null ? _ref4 : window.webkitRequestAnimationFrame) != null ? _ref3 : window.mozRequestAnimationFrame) != null ? _ref2 : window.oRequestAnimationFrame) != null ? _ref1 : window.msRequestAnimationFrame) != null ? _ref : function(callback) {
      return setTimeout(callback, 17);
    },
    cancelFrame: (_ref5 = (_ref6 = (_ref7 = (_ref8 = (_ref9 = (_ref10 = window.cancelRequestAnimationFrame) != null ? _ref10 : window.webkitCancelAnimationFrame) != null ? _ref9 : window.webkitCancelRequestAnimationFrame) != null ? _ref8 : window.mozCancelRequestAnimationFrame) != null ? _ref7 : window.oCancelRequestAnimationFrame) != null ? _ref6 : window.msCancelRequestAnimationFrame) != null ? _ref5 : clearTimeout,
    extend: function(object, other) {
      var key;
      if (Object.keys) {
        Object.keys(other).forEach(function(property) {
          return Object.defineProperty(object, property, Object.getOwnPropertyDescriptor(other, property));
        });
      } else {
        for (key in other) {
          if (other.hasOwnProperty(key)) {
            object[key] = other[key];
          }
        }
      }
      return object;
    }
  };

}).call(this);

(function() {
  var __slice = [].slice;

  gleam.Canvas = (function() {

    function Canvas(canvas) {
      if (typeof canvas === 'string') {
        canvas = document.querySelector(canvas);
      }
      this.source = canvas != null ? canvas : document.createElement('canvas');
      this.context = new gleam.Context(this.source.getContext('2d'), this);
      this.width = this.source.width;
      this.height = this.source.height;
      this.halfWidth = this.source.width / 2;
      this.halfHeight = this.source.height / 2;
      this.fullscreened = false;
      this.responsive = false;
      this;
    }

    Canvas.prototype.setStyle = function(key, value) {
      return this.source.style[key] = value;
    };

    Canvas.prototype.setSize = function(width, height) {
      if (this.maxWidth && width > this.maxWidth) {
        width = this.maxWidth;
      }
      if (this.maxHeight && height > this.maxHeight) {
        height = this.maxHeight;
      }
      console.log(this.source);
      this.source.width = width;
      this.source.height = height;
      this.width = this.source.width;
      this.height = this.source.height;
      this.halfWidth = this.source.width / 2;
      return this.halfHeight = this.source.height / 2;
    };

    Canvas.prototype.setMaxSize = function(width, height) {
      this.maxWidth = width;
      this.maxHeight = height;
      return this.setSize(this.width, this.height);
    };

    Canvas.prototype.getSize = function() {
      return {
        width: this.width,
        height: this.height
      };
    };

    Canvas.prototype.setFullscreen = function(isOn) {
      var _this = this;
      if (isOn) {
        this.fullscreened = true;
        this.setSize(document.body.clientWidth, document.body.clientHeight);
        document.body.style.overflow = "hidden";
        this.fullscreenListener = function(event) {
          return _this.setSize(document.body.clientWidth, document.body.clientHeight);
        };
        return window.addEventListener('resize', this.fullscreenListener);
      } else {
        this.fullscreened = false;
        return window.removeEventListener('resize', this.fullscreenListener);
      }
    };

    Canvas.prototype.setResponsive = function(isOn) {
      var _this = this;
      if (isOn) {
        this.responsive = true;
        this.calculateResponsive();
        this.responsiveListener = function(event) {
          return _this.calculateResponsive();
        };
        return window.addEventListener('resize', this.responsiveListener);
      } else {
        this.responsive = false;
        return window.removeEventListener('resize', this.responsiveListener);
      }
    };

    Canvas.prototype.calculateResponsive = function() {
      var height, ratio, width;
      this.source.style.webkitTransformOrigin = "top";
      width = document.body.clientWidth;
      height = document.body.clientHeight;
      if (height < this.height || height > (this.height + 50)) {
        ratio = height / this.height;
        return this.source.style.webkitTransform = "scale(" + ratio + ")";
      } else {
        return this.source.style.webkitTransform = "";
      }
    };

    Canvas.prototype.draw = function(objects, camera) {
      var object, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = objects.length; _i < _len; _i++) {
        object = objects[_i];
        _results.push(object.draw(this.context, this));
      }
      return _results;
    };

    Canvas.prototype.toDataUrl = function() {
      var args, _ref;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return (_ref = this.source).toDataUrl.apply(_ref, args);
    };

    Canvas.prototype.getContext = function(type) {
      if (type == null) {
        type = "2d";
      }
      return this.context = new gleam.Context(this.source.getContext(type), this);
    };

    return Canvas;

  })();

}).call(this);

(function() {
  var key,
    __slice = [].slice;

  gleam.Context = (function() {

    function Context(source, canvas) {
      this.source = source;
      this.canvas = canvas;
    }

    Context.prototype.set = function(key, value) {
      return this.source[key] = value;
    };

    Context.prototype.get = function(key) {
      return this.source[key];
    };

    Context.prototype.setFillStyle = function(style) {
      return this.source.fillStyle = style;
    };

    Context.prototype.setStrokeStyle = function(style) {
      return this.source.strokeStyle = style;
    };

    Context.prototype.setStrokeWidth = function(width) {
      return this.source.lineWidth = width;
    };

    Context.prototype.setFont = function(font) {
      return this.source.font = font;
    };

    Context.prototype.setTextBaseline = function(baseline) {
      return this.source.textBaseline = baseline;
    };

    Context.prototype.fillPath = function(func) {
      this.beginPath();
      func(this);
      this.fill();
      return this.closePath();
    };

    Context.prototype.path = function() {
      if (arguments.length % 2 !== 0) {
        throw new Exception("Arguments should be divisible by 2");
      }
      this.beginPath();
      this.moveTo(Array.prototype.shift.call(arguments), Array.prototype.shift.call(arguments));
      while (arguments.length > 0) {
        this.lineTo(Array.prototype.shift.call(arguments), Array.prototype.shift.call(arguments));
      }
      this.stroke();
      return this.closePath();
    };

    Context.prototype.rotateAround = function(x, y, angle, func) {
      this.save();
      this.translate(x, y);
      this.rotate(angle);
      this.translate(-x, -y);
      func();
      return this.restore();
    };

    Context.prototype.setClearColor = function(hex, opacity) {
      this.clearColor = hex;
      return this.clearOpacity = opacity != null ? opacity : 1;
    };

    Context.prototype.clearRect = function(x, y, width, height) {
      x = x != null ? x : 0;
      y = y != null ? y : 0;
      width = width != null ? width : this.canvas.width;
      height = height != null ? height : this.canvas.height;
      if (this.clearColor) {
        this.source.fillStyle = this.clearColor;
        this.source.globalAlpha = this.clearOpacity;
        return this.source.fillRect(x, y, width, height);
      } else {
        return this.source.clearRect(x, y, width, height);
      }
    };

    return Context;

  })();

  gleam.Context.addContextAlias = function(key) {
    if (!gleam.Context.prototype[key]) {
      return gleam.Context.prototype[key] = function() {
        var args, _ref;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return (_ref = this.source)[key].apply(_ref, args);
      };
    }
  };

  for (key in CanvasRenderingContext2D.prototype) {
    gleam.Context.addContextAlias(key);
  }

}).call(this);

(function() {

  gleam.Square = (function() {

    function Square(options) {
      var defaults;
      defaults = {
        color: '#CCC',
        width: 10,
        height: 10,
        x: 10,
        y: 10
      };
      options = options != null ? options : {};
      if (!!options) {
        gleam.extend(defaults, options);
      }
      gleam.extend(this, defaults);
    }

    Square.prototype.draw = function(context, canvas) {
      context.setFillStyle(this.color);
      return context.fillRect(this.x, this.y, this.width, this.height);
    };

    return Square;

  })();

}).call(this);

(function() {

  gleam.Text = (function() {

    function Text(options) {
      var defaults;
      defaults = {
        color: '#CCC',
        x: 10,
        y: 10,
        font: 'bold 20px sans-serif',
        textBaseline: 'bottom',
        text: 'Lorem Ipsum'
      };
      if (!!options) {
        gleam.extend(defaults, options);
      }
      gleam.extend(this, defaults);
    }

    Text.prototype.draw = function(context, canvas) {
      context.setFillStyle(this.color);
      context.setFont(this.font);
      context.setTextBaseline(this.textBaseline);
      return context.fillText(this.text, this.x, this.y);
    };

    return Text;

  })();

}).call(this);

(function() {

  gleam.Sprite = (function() {

    function Sprite(options) {
      var defaults,
        _this = this;
      defaults = {
        src: '',
        x: 10,
        y: 10,
        width: null,
        height: null
      };
      if (!!options) {
        gleam.extend(defaults, options);
      }
      gleam.extend(this, defaults);
      this.loaded = false;
      this.image = new Image;
      this.image.onload = function() {
        if (!_this.width) {
          _this.width = _this.image.width;
        }
        if (!_this.height) {
          _this.height = _this.image.height;
        }
        return _this.loaded = true;
      };
      this.image.src = this.src;
    }

    Sprite.prototype.draw = function(context, canvas) {
      if (!!this.loaded) {
        return context.drawImage(this.image, this.x, this.y, this.width, this.height);
      }
    };

    return Sprite;

  })();

}).call(this);

(function() {

  gleam.Camera = (function() {

    function Camera() {
      this.following = null;
      this.x = 0;
      this.y = 0;
      this.offsetX = 0;
      this.offsetY = 0;
      this.zoomValue = 1;
    }

    Camera.prototype.follow = function(object, offsetX, offsetY) {
      this.following = object;
      this.offsetX = offsetX;
      return this.offsetY = offsetY;
    };

    Camera.prototype.zoom = function(distance, duration) {
      var initial, startTime,
        _this = this;
      if (duration) {
        startTime = Date.now();
        initial = this.zoomValue;
        return this.onUpdate = function(dt) {
          var diff, now;
          now = Date.now();
          diff = now - startTime;
          _this.zoomValue = (distance - initial) * (diff / duration) + initial;
          if (diff > duration) {
            _this.onUpdate = null;
            return _this.zoomValue = distance;
          }
        };
      } else {
        return this.zoomValue = distance;
      }
    };

    Camera.prototype.update = function(dt, context, canvas) {
      var size;
      if (this.following) {
        size = canvas.getSize();
        this.offsetX = size.width / 2;
        this.offsetY = size.height / 2;
        this.x = -this.following.x * this.zoomValue + this.offsetX;
        this.y = -this.following.y * this.zoomValue + this.offsetY;
      }
      if (this.onUpdate) {
        this.onUpdate(dt);
      }
      context.translate(this.x, this.y);
      return context.scale(this.zoomValue, this.zoomValue);
    };

    return Camera;

  })();

}).call(this);

(function() {

  gleam.Circle = function(options) {
    var defaults;
    defaults = {
      color: '#CCC',
      width: 10,
      height: 10,
      x: 10,
      y: 10
    };
    options = options != null ? options : {};
    gleam.extend(defaults, options);
    gleam.extend(this, defaults);
    return this;
  };

  gleam.extend(gleam.Circle.prototype, {
    draw: function(context, canvas) {
      context.beginPath();
      context.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, 2 * Math.PI, false);
      context.fillStyle = this.color;
      context.fill();
      return context.closePath();
    }
  });

}).call(this);

(function() {

  gleam.Rectangle = function(options) {
    var defaults;
    defaults = {
      fillStyle: '#CCC',
      width: 10,
      height: 10,
      cornerRadius: 0,
      x: 0,
      y: 0
    };
    options = options != null ? options : {};
    gleam.extend(defaults, options);
    gleam.extend(this, defaults);
    return this;
  };

  gleam.extend(gleam.Rectangle.prototype, {
    draw: function(context, canvas) {
      if (this.strokeStyle) {
        context.setStrokeStyle(this.strokeStyle);
      }
      if (this.strokeWidth) {
        context.setStrokeWidth(this.strokeWidth);
      }
      if (this.fillStyle) {
        context.setFillStyle(this.fillStyle);
      }
      context.beginPath();
      context.moveTo(this.x + this.cornerRadius, this.y);
      context.lineTo(this.x + this.width - this.cornerRadius * 2, this.y);
      if (this.cornerRadius) {
        context.arcTo(this.x + this.width, this.y, this.x + this.width, this.y + this.cornerRadius, this.cornerRadius);
      }
      context.lineTo(this.x + this.width, this.y + this.height - this.cornerRadius);
      if (this.cornerRadius) {
        context.arcTo(this.x + this.width, this.y + this.height, this.x + this.width - this.cornerRadius, this.y + this.height, this.cornerRadius);
      }
      context.lineTo(this.x + this.cornerRadius, this.y + this.height);
      if (this.cornerRadius) {
        context.arcTo(this.x, this.y + this.height, this.x, this.y + this.height - this.cornerRadius, this.cornerRadius);
      }
      context.lineTo(this.x, this.y + this.cornerRadius);
      if (this.cornerRadius) {
        context.arcTo(this.x, this.y, this.x + this.cornerRadius, this.y, this.cornerRadius);
      }
      context.stroke();
      context.fill();
      return context.closePath();
    }
  });

}).call(this);

(function() {



}).call(this);

(function() {
  var _ref, _ref1, _ref2, _ref3;

  this.nv = (_ref = this.nv) != null ? _ref : {};

  this.renderers = (_ref1 = this.renderers) != null ? _ref1 : {};

  this.entities = (_ref2 = this.entities) != null ? _ref2 : {};

  this.scenes = (_ref3 = this.scenes) != null ? _ref3 : {};

  this.getClass = function(name) {
    var klass;
    klass = window;
    $.each(name.split("."), function() {
      return klass = klass[this];
    });
    return klass;
  };

  this.shallowClone = function(obj) {
    var key, newObj;
    newObj = {};
    for (key in obj) {
      if (typeof key !== "object") {
        newObj[key] = obj[key];
      }
    }
    return newObj;
  };

}).call(this);

(function() {

  nv.ajax = function(url, method, data, callback) {
    var onReadyStateChange, version, versions, xhr, _i, _len;
    callback = callback != null ? callback : method;
    if (typeof method === "function") {
      method = 'GET';
    }
    data = data != null ? data : "";
    if (typeof XMLHttpRequest !== 'undefined') {
      xhr = new XMLHttpRequest();
    } else {
      versions = ["Microsoft.XmlHttp", "MSXML2.XmlHttp", "MSXML2.XmlHttp.3.0", "MSXML2.XmlHttp.4.0", "MSXML2.XmlHttp.5.0"];
      for (_i = 0, _len = versions.length; _i < _len; _i++) {
        version = versions[_i];
        try {
          xhr = new ActiveXObject(version);
        } catch (e) {

        }
      }
    }
    onReadyStateChange = function() {
      if (xhr.readyState < 4) {
        return;
      }
      if (xhr.status !== 200) {
        return;
      }
      if (xhr.readyState === 4) {
        return callback(xhr.responseText);
      }
    };
    xhr.onreadystatechange = onReadyStateChange;
    xhr.open(method, url, false);
    return xhr.send(data);
  };

}).call(this);

(function() {
  var _ref;

  window.nv = (_ref = window.nv) != null ? _ref : {};

  window.nv.Controller = {
    Up: 12,
    Down: 13,
    Left: 14,
    Right: 15,
    A: 0,
    X: 1,
    Y: 3,
    B: 2,
    LB: 4,
    LT: 6,
    RB: 5,
    RT: 7,
    Select: 8,
    Start: 9,
    LeftStick: 10,
    RightStick: 11
  };

  window.nv.Key = {
    Backspace: 8,
    Tab: 9,
    Enter: 13,
    Shift: 16,
    Control: 17,
    PauseBreak: 19,
    CapsLock: 20,
    Esc: 27,
    Spacebar: 32,
    PageUp: 33,
    PageDown: 34,
    End: 35,
    Home: 36,
    Left: 37,
    Up: 38,
    Right: 39,
    Down: 40,
    Insert: 45,
    Delete: 46,
    Keyb0: 48,
    Keyb1: 49,
    Keyb2: 50,
    Keyb3: 51,
    Keyb4: 52,
    Keyb5: 53,
    Keyb6: 54,
    Keyb7: 55,
    Keyb8: 56,
    Keyb9: 57,
    A: 65,
    B: 66,
    C: 67,
    D: 68,
    E: 69,
    F: 70,
    G: 71,
    H: 72,
    I: 73,
    J: 74,
    K: 75,
    L: 76,
    M: 77,
    N: 78,
    O: 79,
    P: 80,
    Q: 81,
    R: 82,
    S: 83,
    T: 84,
    U: 85,
    V: 86,
    W: 87,
    X: 88,
    Y: 89,
    Z: 90,
    Numpad0: 96,
    Numpad1: 97,
    Numpad2: 98,
    Numpad3: 99,
    Numpad4: 100,
    Numpad5: 101,
    Numpad6: 102,
    Numpad7: 103,
    Numpad8: 104,
    Numpad9: 105,
    NumpadStar: 106,
    NumpadPlus: 107,
    NumpadMinus: 109,
    NumpadPeriod: 110,
    NumpadSlash: 111,
    F1: 112,
    F2: 113,
    F3: 114,
    F4: 115,
    F5: 116,
    F6: 117,
    F7: 118,
    F8: 119,
    F9: 120,
    F10: 121,
    F11: 122,
    F12: 123,
    F13: 124,
    F14: 125,
    F15: 126,
    NumLck: 144,
    ScrLck: 145,
    SemiColon: 186,
    Equal: 187,
    Comma: 188,
    Minus: 189,
    Period: 190,
    Question: 191,
    BackQuote: 192,
    LeftBrace: 219,
    Pipe: 220,
    RightBrace: 221,
    SingleQuote: 222
  };

}).call(this);

(function() {
  var __slice = [].slice;

  nv.config = {
    debug: false
  };

  nv.implement = function(other) {
    var key, _results;
    _results = [];
    for (key in other) {
      _results.push(this[key] = other[key]);
    }
    return _results;
  };

  nv.implement({
    log: function() {
      var message, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = arguments.length; _i < _len; _i++) {
        message = arguments[_i];
        _results.push(console.log(message));
      }
      return _results;
    },
    configure: function(options) {
      return nv.config = nv.extend(nv.config, options);
    },
    bind: function(context, func) {
      var f;
      f = function() {
        return func.call.apply(func, [context].concat(__slice.call(arguments)));
      };
      return f;
    },
    clone: function(object) {
      var obj;
      obj = {};
      nv.extend(obj, object, true);
      return obj;
    },
    extend: function(object, other, deep) {
      var key;
      if (deep == null) {
        deep = false;
      }
      for (key in other) {
        if (other[key] instanceof Object && deep === true) {
          object[key] = {};
          nv.extend(object[key], other[key]);
        } else {
          object[key] = other[key];
        }
      }
      return object;
    },
    keydown: function(key, callback) {
      var func;
      func = function(event) {
        if (event.keyCode === key) {
          return callback();
        }
      };
      $(document).on('keydown', func);
      return func;
    },
    keypress: function(key, callback) {
      var func;
      func = function(event) {
        if (event.keyCode === key) {
          return callback();
        }
      };
      $(document).on('keypress', func);
      return func;
    },
    keyup: function(key, callback) {
      var func;
      func = function(event) {
        if (event.keyCode === key) {
          return callback();
        }
      };
      $(document).on('keyup', func);
      return func;
    },
    mousedown: function(callback) {
      $(document).on('mousedown', callback);
      return $(document).on('touchstart', callback);
    },
    mouseup: function(callback) {
      $(document).on('mouseup', callback);
      return $(document).on('touchend', callback);
    },
    mousemove: function(callback) {
      $(document).on('mousemove', callback);
      return $(document).on('touchmove', callback);
    },
    isMobile: function() {
      var agent;
      agent = navigator.userAgent.toLowerCase();
      return (agent.match(/android/i) || agent.match(/webos/i) || agent.match(/iphone/i) || agent.match(/ipad/i) || agent.match(/ipod/i) || agent.match(/blackberry/i) || agent.match(/windows phone/i)) !== null;
    },
    ready: function(func) {
      var _this = this;
      if (!!this.isReady) {
        return func();
      }
      return document.addEventListener('DOMContentLoaded', function() {
        _this.isReady = true;
        return func();
      });
    }
  });

  nv.Color = (function() {

    function Color(r, b, g, a) {
      this.r = r;
      this.b = b;
      this.g = g;
      this.a = a;
    }

    Color.prototype.interpolate = function(percent, other) {
      return new Color(this.r + (other.r - this.r) * percent, this.g + (other.g - this.g) * percent, this.b + (other.b - this.b) * percent, this.a + (other.a - this.a) * percent);
    };

    Color.prototype.toCanvasColor = function() {
      return "rgb(" + (parseInt(this.r)) + ", " + (parseInt(this.g)) + ", " + (parseInt(this.b)) + ")";
    };

    return Color;

  })();

  nv.Gradient = (function() {

    function Gradient(colorStops) {
      this.colorStops = colorStops;
    }

    Gradient.prototype.getColor = function(percent) {
      var color1, color2, colorF;
      colorF = percent * (this.colorStops.length - 1);
      color1 = parseInt(colorF);
      color2 = parseInt(colorF + 1);
      return this.colorStops[color1].interpolate((colorF - color1) / (color2 - color1), this.colorStops[color2]);
    };

    return Gradient;

  })();

}).call(this);

(function() {

  nv.Plugin = (function() {

    function Plugin(scene, entity) {
      this.scene = scene;
      this.entity = entity;
    }

    Plugin.prototype.destroy = function() {
      delete this.scene;
      return delete this.entity;
    };

    return Plugin;

  })();

}).call(this);

(function() {

  nv.Entity = (function() {

    function Entity(scene, pluginClasses, model) {
      var key, klass, _i, _len, _ref;
      this.scene = scene;
      this.model = model;
      this.plugins = [];
      this.listeners = [];
      this.model = (_ref = this.model) != null ? _ref : new nv.Model;
      for (_i = 0, _len = pluginClasses.length; _i < _len; _i++) {
        klass = pluginClasses[_i];
        this.plugins.push(new klass(this.scene, this));
      }
      this.scene.fire("entity:create:" + this.constructor.name);
      for (key in this) {
        if (/event\(.*\)/.test(key)) {
          this.on(key.slice(6, -1), nv.bind(this, this[key]));
        }
      }
    }

    Entity.prototype.on = function(name, callback) {
      this.scene.on(name, callback);
      return this.listeners.push({
        name: name,
        callback: callback
      });
    };

    Entity.prototype.off = function(name, callback) {
      var i, listener, _i, _len, _ref, _results;
      this.scene.off(name, callback);
      _ref = this.listeners;
      _results = [];
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        listener = _ref[i];
        if (listener.name === name && listener.callback === callback) {
          this.listeners.splice(i, 1);
          break;
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Entity.prototype.getPlugin = function(type) {
      var plugin, _i, _len, _ref;
      _ref = this.plugins;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        plugin = _ref[_i];
        if (plugin instanceof type) {
          return plugin;
        }
      }
      return null;
    };

    Entity.prototype.update = function(dt) {};

    Entity.prototype.destroy = function() {
      var i, listener, plugin, _i, _len, _ref;
      _ref = this.plugins;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        plugin = _ref[_i];
        plugin.destroy();
      }
      i = this.listeners.length;
      while (i--) {
        listener = this.listeners[i];
        this.off(listener.name, listener.callback);
      }
      delete this.model;
      return delete this.plugins;
    };

    return Entity;

  })();

}).call(this);

(function() {

  nv.EventDispatcher = (function() {

    function EventDispatcher() {
      this.event_listeners = {};
      this.event_async_queue = [];
    }

    EventDispatcher.prototype.destroy = function() {
      return this.processQueuedEvents();
    };

    EventDispatcher.prototype.on = function(event, func) {
      var event_listeners;
      event_listeners = this.event_listeners[event];
      if (!(event_listeners instanceof Array)) {
        event_listeners = [];
      }
      event_listeners.push(func);
      this.event_listeners[event] = event_listeners;
      return this;
    };

    EventDispatcher.prototype.fire = function(event, data) {
      if (this.event_listeners[event] instanceof Array) {
        return this.event_async_queue.push({
          event: event,
          data: data != null ? data : {}
        });
      }
    };

    EventDispatcher.prototype.send = function(event, data) {
      var event_listeners, listener, _i, _len, _results;
      event_listeners = this.event_listeners[event];
      if (event_listeners instanceof Array) {
        _results = [];
        for (_i = 0, _len = event_listeners.length; _i < _len; _i++) {
          listener = event_listeners[_i];
          _results.push(listener(data != null ? data : {}));
        }
        return _results;
      }
    };

    EventDispatcher.prototype.off = function(event, func) {
      if (!this.event_listeners[event] instanceof Array) {

      } else {
        if (this.event_listeners[event].indexOf(func) !== -1) {
          this.event_listeners[event].splice(this.event_listeners[event].indexOf(func), 1);
        }
      }
      return this;
    };

    EventDispatcher.prototype.update = function(dt) {
      return this.processQueuedEvents();
    };

    EventDispatcher.prototype.processQueuedEvents = function() {
      var event, eventListeners, events, listener, _i, _j, _len, _len1;
      while (this.event_async_queue.length) {
        events = this.event_async_queue.slice(0);
        this.event_async_queue = [];
        for (_i = 0, _len = events.length; _i < _len; _i++) {
          event = events[_i];
          eventListeners = this.event_listeners[event.event];
          for (_j = 0, _len1 = eventListeners.length; _j < _len1; _j++) {
            listener = eventListeners[_j];
            if (listener) {
              listener(event.data);
            }
          }
        }
      }
      return null;
    };

    return EventDispatcher;

  })();

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  nv.Model = (function() {

    function Model(data) {
      this.setMany(data);
    }

    Model.prototype.setMany = function(object) {
      var key, _results;
      _results = [];
      for (key in object) {
        _results.push(this[key] = object[key]);
      }
      return _results;
    };

    Model.prototype.get = function(key) {
      return this[key];
    };

    Model.prototype.set = function(key, value) {
      return this[key] = value;
    };

    Model.prototype.reset = function() {};

    Model.prototype.persist = function() {
      var data, key;
      data = {};
      for (key in this) {
        data[key] = this[key];
      }
      return window.localStorage[this.constructor.name] = data;
    };

    Model.prototype.load = function() {
      return this.setMany(window.localStorage[this.constructor.name]);
    };

    return Model;

  })();

  nv.Collection = (function(_super) {

    __extends(Collection, _super);

    function Collection(arr) {
      this.items = arr != null ? arr : [];
    }

    return Collection;

  })(nv.Model);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  nv.Scene = (function(_super) {

    __extends(Scene, _super);

    function Scene(name, game, rootModel, options) {
      var key, _ref,
        _this = this;
      this.game = game;
      this.rootModel = rootModel;
      this.options = options;
      Scene.__super__.constructor.apply(this, arguments);
      this.sceneName = name.toLowerCase();
      this.engines = [];
      this.entities = [];
      this.deletedEntities = [];
      this.options = (_ref = this.options) != null ? _ref : {};
      if (nv.gameConfig.scenes[this.sceneName].config.scene != null) {
        this.options = $.extend(this.options, nv.gameConfig.scenes[this.sceneName].config.scene);
      }
      this.options = $.extend(this.options, this.rootModel);
      this.on("entity:remove", function(entity) {
        return _this.removeEntity(entity);
      });
      this.on("entity:add", function(entity) {
        return _this.addEntity(entity);
      });
      this.on("entity:create", function(options) {
        var config, entityName;
        entityName = options.entity;
        config = nv.gameConfig.scenes[_this.sceneName].entities[entityName];
        if (config.include != null) {
          config = nv.gameConfig.entities[entityName];
        }
        if (!!config) {
          return _this.createEntity(config, options);
        }
      });
      this.on("scene:destroy", function(options) {
        return _this.destruct();
      });
      for (key in this) {
        if (/event\(.*\)/.test(key)) {
          this.on(key.slice(6, -1), nv.bind(this, this[key]));
        }
      }
      this.prepareEngines();
      this.createEntities(nv.gameConfig.scenes[this.sceneName].entities);
      this.createSoundFxs();
    }

    Scene.prototype.get = function(key) {
      return this.options[key];
    };

    Scene.prototype.set = function(key, value) {
      return this.options[key] = value;
    };

    Scene.prototype.prepareEngines = function() {
      var engine, klass, _i, _j, _len, _len1, _ref, _ref1, _results;
      _ref = nv.gameConfig.scenes[this.sceneName].enginesUsed;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        klass = _ref[_i];
        this.useEngine(klass.name);
      }
      _ref1 = this.engines;
      _results = [];
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        engine = _ref1[_j];
        _results.push(engine.prepare());
      }
      return _results;
    };

    Scene.prototype.useEngine = function(engineName, initializer) {
      var config, configKey, engineObj, _ref;
      engineObj = this.game.engines[engineName];
      configKey = engineName.replace("nv.", "").replace("Engine", "").toLowerCase();
      config = (_ref = nv.gameConfig.scenes[this.sceneName].config[configKey]) != null ? _ref : {};
      if (engineObj.klass.prototype.initializer != null) {
        engineObj.klass.prototype.initializer(config, this.game.model());
      }
      if (initializer != null) {
        initializer(config, this.game.model());
      }
      return this.engines.push(new engineObj.klass(this, config));
    };

    Scene.prototype.createEntities = function(entities) {
      var config, entity, index, _results;
      _results = [];
      for (entity in entities) {
        config = entities[entity];
        if (config.count != null) {
          index = config.count;
          _results.push((function() {
            var _results1;
            _results1 = [];
            while ((index -= 1) >= 0) {
              _results1.push(this.createEntity(config, {}, index));
            }
            return _results1;
          }).call(this));
        } else {
          _results.push(this.createEntity(config));
        }
      }
      return _results;
    };

    Scene.prototype.createEntity = function(config, options, index) {
      if (options == null) {
        options = {};
      }
      if (index == null) {
        index = 0;
      }
      if (config.include != null) {
        config = nv.gameConfig.entities[config.include];
      }
      if (config.model != null) {
        return this.addEntity(new config.entity(this, config.plugins, this.loadModelFromConfig(config, options, index)));
      } else {
        return this.addEntity(new config.entity(this, config.plugins));
      }
    };

    Scene.prototype.loadModelFromConfig = function(config, options, index) {
      var initializer, key, model;
      if (index == null) {
        index = 0;
      }
      model = {};
      model = nv.extend(model, config.model.options);
      model = nv.extend(model, options);
      if (config.model.initializers != null) {
        for (key in config.model.initializers) {
          initializer = config.model.initializers[key];
          if (model[key] === void 0) {
            model[key] = nv.bind(model, initializer)(this, index);
          }
        }
      }
      if (config.model.klass != null) {
        model = new config.model.klass(model);
      } else {
        model = new nv.Model(model);
      }
      return model;
    };

    Scene.prototype.addEntities = function() {
      var entities, entity, _i, _len, _results;
      entities = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      _results = [];
      for (_i = 0, _len = entities.length; _i < _len; _i++) {
        entity = entities[_i];
        _results.push(this.addEntity(entity));
      }
      return _results;
    };

    Scene.prototype.addEntity = function(entity) {
      this.entities.push(entity);
      return entity;
    };

    Scene.prototype.createSoundFxs = function() {
      if (nv.gameConfig.scenes[this.sceneName].soundfx === void 0) {
        return;
      }
      return new nv.SoundFactory().wire(this, nv.gameConfig.scenes[this.sceneName].soundfx);
    };

    Scene.prototype.getEntity = function(type) {
      var entity, _i, _len, _ref;
      _ref = this.entities;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        entity = _ref[_i];
        if (entity instanceof type) {
          return entity;
        }
      }
      return null;
    };

    Scene.prototype.removeEntity = function(entity) {
      if (this.entities.indexOf(entity) !== -1) {
        if (!!entity.destroy) {
          entity.destroy();
        }
        return this.entities.splice(this.entities.indexOf(entity), 1);
      }
    };

    Scene.prototype.onRemoveEntity = function(entity) {
      return this.deletedEntities.push(entity);
    };

    Scene.prototype.getEngine = function(type) {
      var engine, _i, _len, _ref;
      _ref = this.engines;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        engine = _ref[_i];
        if (engine instanceof type) {
          return engine;
        }
      }
      return null;
    };

    Scene.prototype.fire = function(event, data) {
      return Scene.__super__.fire.call(this, event, data);
    };

    Scene.prototype.update = function(dt) {
      var engine, entity, _i, _j, _len, _len1, _ref, _ref1;
      _ref = this.engines;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        engine = _ref[_i];
        engine.update(dt);
      }
      _ref1 = this.entities;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        entity = _ref1[_j];
        entity.update(dt);
      }
      return Scene.__super__.update.call(this, dt);
    };

    Scene.prototype.destroy = function() {
      return this.fire("scene:destroy");
    };

    Scene.prototype.destruct = function() {
      var engine, entity, _i, _j, _len, _len1, _ref, _ref1;
      _ref = this.entities;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        entity = _ref[_i];
        entity.destroy();
      }
      _ref1 = this.engines;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        engine = _ref1[_j];
        engine.destroy();
      }
      delete this.entities;
      return delete this.engines;
    };

    return Scene;

  })(nv.EventDispatcher);

}).call(this);

(function() {

  nv.Point = (function() {

    function Point(x, y) {
      this.x = x;
      this.y = y;
    }

    Point.prototype.clone = function() {
      return new nv.Point(this.x, this.y);
    };

    Point.prototype.translate = function(dx, dy) {
      this.x += dx;
      this.y += dy;
      return this;
    };

    Point.prototype.add = function(point) {
      this.x += point.x;
      this.y += point.y;
      return this;
    };

    Point.prototype.times = function(num) {
      new nv.Point(this.x * num, this.y * num);
      return this;
    };

    Point.prototype.fromPolar = function(ang, rad) {
      this.x = Math.cos(ang) * rad;
      this.y = Math.sin(ang) * rad;
      return this;
    };

    Point.prototype.constrain = function(rect) {
      if (!rect.contains(this)) {
        if (this.x < rect.x) {
          this.x = 0;
        }
        if (this.x > rect.x2) {
          this.x = rect.x2;
        }
        if (this.y < rect.y) {
          this.y = 0;
        }
        if (this.y > rect.y2) {
          this.y = rect.y2;
        }
      }
      return this;
    };

    Point.prototype.eq = function(pt) {
      return this.x === pt.x && this.y === pt.y;
    };

    return Point;

  })();

  nv.Rect = (function() {

    function Rect(x, y, x2, y2) {
      this.x = x;
      this.y = y;
      this.x2 = x2;
      this.y2 = y2;
    }

    Rect.prototype.clone = function() {
      return new nv.Rect(this.x, this.y, this.x2, this.y2);
    };

    Rect.prototype.reset = function(x, y, x2, y2) {
      this.x = x;
      this.y = y;
      this.x2 = x2;
      this.y2 = y2;
    };

    Rect.prototype._checkPt = function(tx, ty) {
      return (tx >= this.x && tx <= this.x2) && (ty >= this.y && ty <= this.y2);
    };

    Rect.prototype.contains = function(pt) {
      return this._checkPt(pt.x, pt.y);
    };

    Rect.prototype.intersects = function(rect) {
      if (this.x2 < rect.x || this.y2 < rect.y || this.x > rect.x2 || this.y > rect.y2) {
        return false;
      }
      return true;
    };

    Rect.prototype.translate = function(dx, dy) {
      this.x += dx;
      return this.y += dy;
    };

    return Rect;

  })();

}).call(this);

(function() {
  var __slice = [].slice;

  nv.Game = (function() {

    function Game(config) {
      var engine, klass, name, scene, _i, _len, _ref;
      this.rootModel = new nv.Model;
      this.scenes = [];
      this.sceneClasses = {};
      this.engines = {};
      if (config.enginesToLoad != null) {
        _ref = config.enginesToLoad;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          engine = _ref[_i];
          this.registerEngine(engine);
        }
      }
      if (config.scenes != null) {
        for (name in config.scenes) {
          scene = name[0].toUpperCase() + name.toLowerCase().slice(1);
          klass = "scenes." + scene;
          this.registerScene(scene, getClass(klass));
        }
      }
      this.rootModel.setMany({
        config: config,
        gamepad: nv.gamepad()
      });
    }

    Game.prototype.model = function() {
      return this.rootModel;
    };

    Game.prototype.registerEngine = function(klass, initializer) {
      var name;
      name = klass.name;
      return this.engines[name] = {
        klass: klass,
        initializer: initializer
      };
    };

    Game.prototype.registerScenes = function(object) {
      var key, _results;
      _results = [];
      for (key in object) {
        _results.push(this.registerScene(key, object[key]));
      }
      return _results;
    };

    Game.prototype.registerScene = function(name, klass) {
      return this.sceneClasses[name] = klass;
    };

    Game.prototype.openScene = function() {
      var args, name,
        _this = this;
      name = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      this.scenes.push((function(func, args, ctor) {
        ctor.prototype = func.prototype;
        var child = new ctor, result = func.apply(child, args);
        return Object(result) === result ? result : child;
      })(this.sceneClasses[name], [name, this, this.rootModel].concat(__slice.call(args)), function(){}));
      return this.scenes[this.scenes.length - 1].on("scene:close", function() {
        return _this.closeScene(name);
      });
    };

    Game.prototype.closeScene = function(name) {
      var index, scene, _i, _len, _ref, _results;
      name = name != null ? name : this.scenes[this.scenes.length - 1].constructor.name;
      _ref = this.scenes;
      _results = [];
      for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
        scene = _ref[index];
        if (scene instanceof this.sceneClasses[name]) {
          scene.destroy();
          _results.push(this.scenes.splice(index, 1));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Game.prototype.start = function(scene) {
      return this.openScene(scene);
    };

    return Game;

  })();

}).call(this);

(function() {

  nv.Engine = (function() {

    Engine.prototype.initializer = function() {};

    function Engine(scene, config) {
      var key, _ref;
      this.scene = scene;
      this.config = config;
      this.config = (_ref = this.config) != null ? _ref : {};
      this.listeners = [];
      for (key in this) {
        if (/event\(.*\)/.test(key)) {
          this.on(key.slice(6, -1), nv.bind(this, this[key]));
        }
      }
    }

    Engine.prototype.on = function(name, callback) {
      this.scene.on(name, callback);
      return this.listeners.push({
        name: name,
        callback: callback
      });
    };

    Engine.prototype.off = function(name, callback) {
      var i, listener, _i, _len, _ref, _results;
      this.scene.off(name, callback);
      _ref = this.listeners;
      _results = [];
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        listener = _ref[i];
        if (listener.name === name && listener.callback === callback) {
          this.listeners.splice(i, 1);
          break;
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Engine.prototype.prepare = function() {};

    Engine.prototype.update = function(dt) {};

    Engine.prototype.destroy = function() {
      var i, listener;
      i = this.listeners.length;
      while (i--) {
        listener = this.listeners[i];
        this.off(listener.name, listener.callback);
      }
      delete this.listeners;
      delete this.scene;
      return delete this.config;
    };

    return Engine;

  })();

}).call(this);

(function() {
  var cancelFrame, requestFrame, _ref, _ref1, _ref10, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  requestFrame = (_ref = (_ref1 = (_ref2 = (_ref3 = (_ref4 = window.requestAnimationFrame) != null ? _ref4 : window.webkitRequestAnimationFrame) != null ? _ref3 : window.mozRequestAnimationFrame) != null ? _ref2 : window.oRequestAnimationFrame) != null ? _ref1 : window.msRequestAnimationFrame) != null ? _ref : function(callback) {
    return setTimeout(callback, 17);
  };

  cancelFrame = (_ref5 = (_ref6 = (_ref7 = (_ref8 = (_ref9 = (_ref10 = window.cancelRequestAnimationFrame) != null ? _ref10 : window.webkitCancelAnimationFrame) != null ? _ref9 : window.webkitCancelRequestAnimationFrame) != null ? _ref8 : window.mozCancelRequestAnimationFrame) != null ? _ref7 : window.oCancelRequestAnimationFrame) != null ? _ref6 : window.msCancelRequestAnimationFrame) != null ? _ref5 : clearTimeout;

  nv.TimingEngine = (function(_super) {

    __extends(TimingEngine, _super);

    function TimingEngine(scene, config) {
      var _ref11, _ref12,
        _this = this;
      TimingEngine.__super__.constructor.call(this, scene, config);
      this.updating = false;
      this.config.afters = (_ref11 = this.config.afters) != null ? _ref11 : [];
      this.config.befores = (_ref12 = this.config.befores) != null ? _ref12 : [];
      scene.on("engine:timing:start", nv.bind(this, this.start));
      scene.on("engine:timing:stop", nv.bind(this, this.stop));
      scene.on("engine:timing:register:after", function(func) {
        return _this.config.afters.push(func);
      });
      scene.on("engine:timing:register:before", function(func) {
        return _this.config.befores.push(func);
      });
    }

    TimingEngine.prototype.start = function() {
      var lastTime, update,
        _this = this;
      lastTime = Date.now();
      this.updating = true;
      update = function() {
        var after, before, delta, now, _i, _j, _len, _len1, _ref11, _ref12;
        now = Date.now();
        delta = now - lastTime;
        delta /= 1000;
        _ref11 = _this.config.befores;
        for (_i = 0, _len = _ref11.length; _i < _len; _i++) {
          before = _ref11[_i];
          before(delta);
        }
        _this.scene.update(delta);
        if (_this.updating) {
          _ref12 = _this.config.afters;
          for (_j = 0, _len1 = _ref12.length; _j < _len1; _j++) {
            after = _ref12[_j];
            after(delta);
          }
          lastTime = now;
          return requestFrame(update);
        }
      };
      return requestFrame(update);
    };

    TimingEngine.prototype.stop = function() {
      return this.updating = false;
    };

    TimingEngine.prototype.destroy = function() {
      this.stop();
      delete this.updating;
      return TimingEngine.__super__.destroy.apply(this, arguments);
    };

    return TimingEngine;

  })(nv.Engine);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  nv.DebugEngine = (function(_super) {

    __extends(DebugEngine, _super);

    function DebugEngine(scene) {
      var fire, send,
        _this = this;
      DebugEngine.__super__.constructor.call(this, scene);
      this.messageLog = [];
      fire = scene.fire;
      scene.fire = function() {
        var args;
        args = Array.prototype.slice.call(arguments, 0);
        _this.log(("[EVENT] - " + args[0]) + (args[1] !== void 0 ? " - " + args[1].constructor.name : ""));
        return fire.call.apply(fire, [scene].concat(__slice.call(arguments)));
      };
      send = scene.send;
      scene.send = function() {
        var args;
        args = Array.prototype.slice.call(arguments, 0);
        _this.log(("[EVENT (Immediate)] - " + args[0]) + (args[1] !== void 0 ? " - " + args[1].constructor.name : ""));
        return send.call.apply(send, [scene].concat(__slice.call(arguments)));
      };
    }

    DebugEngine.prototype.log = function() {
      var message, messages, part, _i, _len;
      messages = Array.prototype.slice.call(arguments, 0);
      message = "";
      for (_i = 0, _len = messages.length; _i < _len; _i++) {
        part = messages[_i];
        message += part.toString();
      }
      this.messageLog.push(message);
      return console.log(message);
    };

    return DebugEngine;

  })(nv.Engine);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  nv.RenderingEngine = (function(_super) {

    __extends(RenderingEngine, _super);

    RenderingEngine.prototype.initializer = function(config, rootModel) {
      var canvas, property, rootConfig, value, _ref;
      if (!rootModel.get('canvas')) {
        rootConfig = rootModel.config;
        canvas = new gleam.Canvas;
        canvas.setSize(rootConfig.canvas.width, rootConfig.canvas.height);
        canvas.setMaxSize(rootConfig.canvas.maxWidth, rootConfig.canvas.maxHeight);
        _ref = rootConfig.canvas.css;
        for (property in _ref) {
          value = _ref[property];
          canvas.setStyle(property, value);
        }
        canvas.setFullscreen(rootConfig.canvas.fullscreen);
        canvas.setResponsive(rootConfig.canvas.responsive);
        document.body.appendChild(canvas.source);
        rootModel.set('canvas', canvas);
      }
      return nv.extend(config, {
        canvas: rootModel.canvas,
        width: rootModel.canvas.width,
        height: rootModel.canvas.height,
        autoRendering: true
      });
    };

    function RenderingEngine(scene, config) {
      RenderingEngine.__super__.constructor.call(this, scene, config);
      this.canvas = config.canvas;
      this.context = this.canvas.context;
      this.drawables = [];
      this.camera = new gleam.Camera;
    }

    RenderingEngine.prototype["event(engine:rendering:create)"] = function(drawable) {
      return this.drawables.push(drawable);
    };

    RenderingEngine.prototype["event(engine:rendering:destroy)"] = function(drawable) {
      return this.drawables.splice(this.drawables.indexOf(drawable), 1);
    };

    RenderingEngine.prototype["event(engine:rendering:draw)"] = function() {
      return this._render(0);
    };

    RenderingEngine.prototype.prepare = function() {
      this.scene.fire("engine:timing:register:after", nv.bind(this, this.draw));
      return this.scene.on("engine:gamepad:mouse:down", nv.bind(this, this.onMouseDown));
    };

    RenderingEngine.prototype.draw = function(dt) {
      if (!this.config.autoRendering) {
        return;
      }
      return this._render(dt);
    };

    RenderingEngine.prototype._render = function(dt) {
      var drawable, _i, _len, _ref;
      this.context.save();
      this.context.clearRect();
      this.camera.update(dt, this.context, this.canvas);
      _ref = this.drawables;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        drawable = _ref[_i];
        drawable.draw(this.context, this.canvas);
      }
      return this.context.restore();
    };

    RenderingEngine.prototype.onMouseDown = function(data) {
      var bounds, drawable, _i, _len, _ref, _results;
      _ref = this.drawables;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        drawable = _ref[_i];
        if (drawable.clickable === true) {
          if (drawable.bounds) {
            bounds = drawable.bounds();
            if (bounds.contains(new nv.Point(data.x, data.y))) {
              _results.push(this.scene.fire("engine:rendering:clicked:" + drawable.entity.constructor.name, drawable.entity));
            } else {
              _results.push(void 0);
            }
          } else {
            _results.push(void 0);
          }
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    RenderingEngine.prototype.destroy = function() {
      delete this.drawables;
      return RenderingEngine.__super__.destroy.apply(this, arguments);
    };

    return RenderingEngine;

  })(nv.Engine);

  nv.RenderingPlugin = (function(_super) {

    __extends(RenderingPlugin, _super);

    function RenderingPlugin(scene, entity) {
      var _ref;
      RenderingPlugin.__super__.constructor.call(this, scene, entity);
      this.clickable = (_ref = entity.model.clickable) != null ? _ref : false;
      this.scene.fire("engine:rendering:create", this);
    }

    RenderingPlugin.prototype.cache = function(width, height) {
      var oldX, oldY;
      oldX = this.entity.model.x;
      oldY = this.entity.model.y;
      this.entity.model.x = 0;
      this.entity.model.y = 0;
      this.cached = gl().size(width, height);
      this.draw(this.cached.context, this.cached);
      this._draw = this.draw;
      this.entity.model.x = oldX;
      this.entity.model.y = oldY;
      return this.draw = function(context, canvas) {
        return context.drawImage(this.cached, this.entity.model.x, this.entity.model.y);
      };
    };

    RenderingPlugin.prototype.draw = function(context, canvas) {};

    RenderingPlugin.prototype.destroy = function() {
      this.scene.fire("engine:rendering:destroy", this);
      return RenderingPlugin.__super__.destroy.apply(this, arguments);
    };

    return RenderingPlugin;

  })(nv.Plugin);

  nv.DrawableRenderingPlugin = (function(_super) {

    __extends(DrawableRenderingPlugin, _super);

    function DrawableRenderingPlugin(scene, entity) {
      DrawableRenderingPlugin.__super__.constructor.call(this, scene, entity);
      this.drawable = entity.model.drawable;
    }

    DrawableRenderingPlugin.prototype.bounds = function() {
      return new nv.Rect(this.drawable.x, this.drawable.y, this.drawable.x + this.drawable.width, this.drawable.y + this.drawable.height);
    };

    DrawableRenderingPlugin.prototype.draw = function(context, canvas) {
      this.drawable.x = this.entity.model.x;
      this.drawable.y = this.entity.model.y;
      return this.drawable.draw(context, canvas);
    };

    return DrawableRenderingPlugin;

  })(nv.RenderingPlugin);

  nv.TextRenderingPlugin = (function(_super) {

    __extends(TextRenderingPlugin, _super);

    function TextRenderingPlugin(scene, entity) {
      TextRenderingPlugin.__super__.constructor.call(this, scene, entity);
      this.text = new gl.text(entity.model);
    }

    TextRenderingPlugin.prototype.draw = function(context, canvas) {
      return this.text.draw(context, canvas);
    };

    return TextRenderingPlugin;

  })(nv.RenderingPlugin);

  nv.PathRenderingPlugin = (function(_super) {

    __extends(PathRenderingPlugin, _super);

    function PathRenderingPlugin(scene, entity) {
      PathRenderingPlugin.__super__.constructor.call(this, scene, entity);
    }

    PathRenderingPlugin.prototype.draw = function(context, canvas) {
      var shape, _i, _len, _ref, _results;
      _ref = this.entity.model.shapes();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        shape = _ref[_i];
        if (shape.strokeColor) {
          context.setStrokeStyle(shape.strokeColor);
        }
        if (shape.strokeWidth) {
          context.setStrokeWidth(shape.strokeWidth);
        }
        if (shape.fillStyle) {
          context.setFillStyle(shape.fillStyle);
        }
        context.beginPath();
        context.moveTo(shape.points[0].x, shape.points[0].y);
        $.each(shape.points.slice(1), function() {
          return context.lineTo(this.x, this.y);
        });
        context.lineTo(shape.points[0].x, shape.points[0].y);
        if (shape.fillStyle) {
          context.fill();
        }
        context.stroke();
        _results.push(context.closePath());
      }
      return _results;
    };

    return PathRenderingPlugin;

  })(nv.RenderingPlugin);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  nv.GamepadEngine = (function(_super) {

    __extends(GamepadEngine, _super);

    function GamepadEngine(scene, config) {
      var key,
        _this = this;
      GamepadEngine.__super__.constructor.call(this, scene, config);
      this.gamepad = scene.get('gamepad');
      this.options = scene.options;
      this.options.setMany(config);
      if (this.options.trackMouse != null) {
        this.gamepad.trackMouse();
      }
      if (this.options.keyRepeatEvents) {
        this.gamepad.keyRepeatEvents = true;
      }
      for (key in this.options.keys) {
        this.gamepad.aliasKey(key, this.options.keys[key]);
      }
      for (key in this.config.controller) {
        this.gamepad.aliasGamepadButton(key, this.config.controller[key]);
      }
      this.buttonPressFunction = nv.bind(this, this.onButtonPress);
      this.buttonReleaseFunction = nv.bind(this, this.onButtonRelease);
      this.buttonRepeatFunction = nv.bind(this, this.onButtonRepeat);
      this.mouseDownFunction = nv.bind(this, this.onMouseDown);
      this.mouseUpFunction = nv.bind(this, this.onMouseUp);
      this.gamepad.on("press", this.buttonPressFunction);
      this.gamepad.on("release", this.buttonReleaseFunction);
      this.gamepad.on("repeat", this.buttonRepeatFunction);
      this.gamepad.on("gamepad:connected", function() {
        return _this.scene.fire("engine:gamepad:controller:connected");
      });
      this.gamepad.on("mousedown", this.mouseDownFunction);
      this.gamepad.on("mouseup", this.mouseUpFunction);
    }

    GamepadEngine.prototype.onButtonPress = function(button) {
      return this.scene.fire("engine:gamepad:press:" + button);
    };

    GamepadEngine.prototype.onButtonRelease = function(button) {
      return this.scene.fire("engine:gamepad:release:" + button);
    };

    GamepadEngine.prototype.onButtonRepeat = function(button) {
      return this.scene.fire("engine:gamepad:repeat:" + button);
    };

    GamepadEngine.prototype.onMouseDown = function(data) {
      if (!!this.config.trackMouse) {
        return this.scene.fire("engine:gamepad:mouse:down", data);
      }
    };

    GamepadEngine.prototype.onMouseUp = function(data) {
      if (!!this.config.trackMouse) {
        return this.scene.fire("engine:gamepad:mouse:up", data);
      }
    };

    GamepadEngine.prototype.update = function(dt) {
      return this.gamepad.update(dt);
    };

    GamepadEngine.prototype.destroy = function() {
      this.gamepad.off("press", this.buttonPressFunction);
      this.gamepad.off("release", this.buttonReleaseFunction);
      this.gamepad.off("repeat", this.buttonRepeatFunction);
      this.gamepad.off("mousedown", this.mouseDownFunction);
      this.gamepad.off("mouseup", this.mouseUpFunction);
      delete this.buttonPressFunction;
      delete this.buttonReleaseFunction;
      delete this.buttonRepeatFunction;
      delete this.gamepad;
      delete this.config;
      return GamepadEngine.__super__.destroy.apply(this, arguments);
    };

    return GamepadEngine;

  })(nv.Engine);

  nv.TouchTargetPlugin = (function(_super) {

    __extends(TouchTargetPlugin, _super);

    function TouchTargetPlugin(scene, entity) {
      var _this = this;
      TouchTargetPlugin.__super__.constructor.call(this, scene, entity);
      this.pressed = false;
      this.scene.on("engine:gamepad:mouse:down", function(event) {
        if (_this.entity.model.bounds.contains(new nv.Point(event.x, event.y))) {
          _this.pressed = true;
          return _this.scene.fire("engine:gamepad:press:" + _this.entity.model.action);
        }
      });
      this.scene.on("engine:gamepad:mouse:up", function(event) {
        if (_this.pressed) {
          _this.pressed = false;
          return _this.scene.fire("engine:gamepad:release:" + _this.entity.model.action);
        }
      });
    }

    return TouchTargetPlugin;

  })(nv.Plugin);

  nv.Gamepad = (function(_super) {

    __extends(Gamepad, _super);

    function Gamepad() {
      Gamepad.__super__.constructor.apply(this, arguments);
      this.gamepad = navigator.webkitGamepad;
      this.state = {};
      this.listeners = {};
      this.trackers = {};
      this.gamepadAliases = {};
      this.previousGamepadState = void 0;
      this.trackGamepad = false;
      this.keyRepeatEvents = false;
    }

    Gamepad.prototype.trackMouse = function() {
      var _this = this;
      this.state.mouse = {
        x: -1,
        y: -1,
        down: false
      };
      nv.mousedown(function(event) {
        _this.state.mouse.x = event.clientX;
        _this.state.mouse.y = event.clientY;
        _this.state.mouse.down = true;
        return _this.send("mousedown", _this.state.mouse);
      });
      nv.mouseup(function(event) {
        _this.state.mouse.x = event.clientX;
        _this.state.mouse.y = event.clientY;
        _this.state.mouse.down = false;
        return _this.send("mouseup", _this.state.mouse);
      });
      return nv.mousemove(function(event) {
        _this.state.mouse.x = event.clientX;
        return _this.state.mouse.y = event.clientY;
      });
    };

    Gamepad.prototype.aliasKey = function(button, key) {
      var _this = this;
      if (!this.trackers[button]) {
        this.trackers[button] = [];
      }
      this.trackers[button].push(nv.keydown(key, function() {
        if (!_this.state[button]) {
          _this.fireButton(button, "press");
          return _this.state[button] = true;
        }
      }));
      if (this.keyRepeatEvents) {
        this.trackers[button].push(nv.keypress(key + 32, function() {
          if (!_this.state[button]) {
            return;
          }
          return _this.fireButton(button, "repeat");
        }));
      }
      return this.trackers[button].push(nv.keyup(key, function() {
        _this.state[button] = false;
        return _this.fireButton(button, "release");
      }));
    };

    Gamepad.prototype.aliasGamepadButton = function(button, gamepadButton) {
      this.trackGamepad = true;
      if (!this.gamepadAliases[gamepadButton]) {
        this.gamepadAliases[gamepadButton] = [];
      }
      return this.gamepadAliases[gamepadButton].push(button);
    };

    Gamepad.prototype.fireButton = function(button, state) {
      return this.send(state, button);
    };

    Gamepad.prototype.getState = function() {
      return this.state;
    };

    Gamepad.prototype.update = function(dt) {
      var button, gamepad, key, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2, _ref3;
      if (this.trackGamepad) {
        gamepad = navigator.webkitGetGamepads()[0];
        if (gamepad && this.previousGamepadState) {
          for (key in this.gamepadAliases) {
            key = parseInt(key);
            if (gamepad.buttons[key] > 0 && this.previousGamepadState.buttons[key] === 0) {
              _ref = this.gamepadAliases[key];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                button = _ref[_i];
                this.state[button] = true;
              }
              _ref1 = this.gamepadAliases[key];
              for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                button = _ref1[_j];
                this.fireButton(button, "press");
              }
            } else if (gamepad.buttons[key] === 0 && this.previousGamepadState.buttons[key] > 0) {
              _ref2 = this.gamepadAliases[key];
              for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
                button = _ref2[_k];
                this.state[button] = false;
              }
              _ref3 = this.gamepadAliases[key];
              for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {
                button = _ref3[_l];
                this.fireButton(button, "release");
              }
            }
          }
          return this.previousGamepadState = nv.extend({}, gamepad);
        } else {
          this.previousGamepadState = nv.extend({}, gamepad);
          return this.send("controller:connected");
        }
      }
    };

    Gamepad.prototype.destroy = function() {};

    return Gamepad;

  })(nv.EventDispatcher);

  nv.gamepad = function() {
    return new nv.Gamepad;
  };

}).call(this);

(function() {
  var __objectId,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  nv.PhysicsEngine = (function(_super) {

    __extends(PhysicsEngine, _super);

    function PhysicsEngine(scene, config) {
      PhysicsEngine.__super__.constructor.call(this, scene, config);
      this.passiveObjects = {};
      this.activeObjects = {};
      this.physicsObjects = [];
    }

    PhysicsEngine.prototype["event(engine:physics:create)"] = function(collidable) {
      return this.trackObject(collidable);
    };

    PhysicsEngine.prototype["event(engine:physics:delete)"] = function(collidable) {
      return this.removeObject(collidable);
    };

    PhysicsEngine.prototype["event(engine:physics:register)"] = function(obj) {
      return this.physicsObjects.push(obj);
    };

    PhysicsEngine.prototype.prepare = function() {
      if (this.config.debug === true) {
        this.canvas = this.scene.getEngine(nv.RenderingEngine).canvas;
        return this.scene.fire("engine:timing:register:after", nv.bind(this, this.drawObjects));
      }
    };

    PhysicsEngine.prototype.drawObjects = function() {
      var drawObj, ida, obj, _ref, _ref1, _results,
        _this = this;
      drawObj = function(obj) {
        var bounds;
        _this.canvas.context.setStrokeStyle("#FF0000");
        _this.canvas.context.setStrokeWidth(2);
        bounds = obj.bounds();
        return _this.canvas.context.strokeRect(bounds.x, bounds.y, bounds.x2 - bounds.x, bounds.y2 - bounds.y);
      };
      _ref = this.activeObjects;
      for (ida in _ref) {
        obj = _ref[ida];
        drawObj(obj);
      }
      _ref1 = this.passiveObjects;
      _results = [];
      for (ida in _ref1) {
        obj = _ref1[ida];
        _results.push(drawObj(obj));
      }
      return _results;
    };

    PhysicsEngine.prototype.trackObjects = function(array) {
      var self;
      self = this;
      return $.each(array, function() {
        return self.trackObject(this);
      });
    };

    PhysicsEngine.prototype.trackObject = function(obj) {
      switch (obj.type) {
        case 'passive':
          return this.passiveObjects[obj.id] = obj;
        case 'active':
          return this.activeObjects[obj.id] = obj;
        case 'both':
          this.passiveObjects[obj.id] = obj;
          return this.activeObjects[obj.id] = obj;
      }
    };

    PhysicsEngine.prototype.removeObject = function(obj) {
      switch (obj.type) {
        case 'passive':
          return delete this.passiveObjects[obj.id];
        case 'active':
          return delete this.activeObjects[obj.id];
        case 'both':
          delete this.passiveObjects[obj.id];
          return delete this.activeObjects[obj.id];
      }
    };

    PhysicsEngine.prototype.update = function(dt) {
      var ida, idp, ivec, obj, obja, objaBounds, objp, objpBounds, _i, _len, _ref, _ref1, _ref2, _results;
      _ref = this.activeObjects;
      for (ida in _ref) {
        obja = _ref[ida];
        objaBounds = obja.bounds();
        _ref1 = this.passiveObjects;
        for (idp in _ref1) {
          objp = _ref1[idp];
          if (ida === idp) {
            continue;
          }
          objpBounds = objp.bounds();
          if (objpBounds.intersects(objaBounds)) {
            ivec = this.impactVector(objaBounds, objpBounds);
            this.scene.send("engine:collision:queued", {
              actor: obja.entity,
              target: objp.entity
            });
            this.scene.fire("engine:collision:" + obja.entity.constructor.name + ":" + objp.entity.constructor.name, {
              actor: obja.entity,
              target: objp.entity,
              impactVector: ivec
            });
            break;
          }
        }
      }
      _ref2 = this.physicsObjects;
      _results = [];
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        obj = _ref2[_i];
        _results.push(obj.update(dt));
      }
      return _results;
    };

    PhysicsEngine.prototype.impactVector = function(colliderBounds, collideeBounds) {
      var bottom, iVec, left, right, top;
      iVec = new nv.Point(0, 0);
      left = collideeBounds.x - colliderBounds.x2;
      right = collideeBounds.x2 - colliderBounds.x;
      top = collideeBounds.y - colliderBounds.y2;
      bottom = collideeBounds.y2 - colliderBounds.y;
      iVec.x = -1 * (Math.abs(left) <= right ? left : right);
      iVec.y = -1 * (Math.abs(top) <= bottom ? top : bottom);
      return iVec;
    };

    return PhysicsEngine;

  })(nv.Engine);

  nv.PhysicsPlugin = (function(_super) {

    __extends(PhysicsPlugin, _super);

    function PhysicsPlugin(scene, entity) {
      PhysicsPlugin.__super__.constructor.call(this, scene, entity);
      this.scene.fire("engine:physics:create", this);
    }

    PhysicsPlugin.prototype.destroy = function() {
      this.scene.fire("engine:physics:delete", this);
      return PhysicsPlugin.__super__.destroy.apply(this, arguments);
    };

    return PhysicsPlugin;

  })(nv.Plugin);

  __objectId = 0;

  nv.PathPhysicsPlugin = (function(_super) {

    __extends(PathPhysicsPlugin, _super);

    function PathPhysicsPlugin(scene, entity) {
      this.id = __objectId++;
      this.type = entity.model.physicsObjectType;
      this.boundingRect = new nv.Rect(0, 0, 0, 0);
      PathPhysicsPlugin.__super__.constructor.call(this, scene, entity);
      this.updateBounds();
    }

    PathPhysicsPlugin.prototype.bounds = function() {
      this.updateBounds();
      return this.boundingRect;
    };

    PathPhysicsPlugin.prototype.updateBounds = function() {
      var x1, x2, y1, y2;
      x1 = x2 = y1 = y2 = null;
      $.each(this.entity.model.points(), function() {
        if (x1 === null || this.x < x1) {
          x1 = this.x;
        }
        if (x2 === null || this.x > x2) {
          x2 = this.x;
        }
        if (y1 === null || this.y < y1) {
          y1 = this.y;
        }
        if (y2 === null || this.y > y2) {
          return y2 = this.y;
        }
      });
      return this.boundingRect.reset(x1, y1, x2, y2);
    };

    return PathPhysicsPlugin;

  })(nv.PhysicsPlugin);

  nv.RectanglePhysicsPlugin = (function(_super) {

    __extends(RectanglePhysicsPlugin, _super);

    function RectanglePhysicsPlugin(scene, entity) {
      this.id = __objectId++;
      this.type = entity.model.physicsObjectType;
      this.boundingRect = new nv.Rect(0, 0, 0, 0);
      RectanglePhysicsPlugin.__super__.constructor.call(this, scene, entity);
    }

    RectanglePhysicsPlugin.prototype.bounds = function() {
      var model;
      model = this.entity.model;
      return new nv.Rect(model.x, model.y, model.x + model.width, model.y + model.height);
    };

    return RectanglePhysicsPlugin;

  })(nv.PhysicsPlugin);

  nv.GravityPhysicsPlugin = (function(_super) {

    __extends(GravityPhysicsPlugin, _super);

    function GravityPhysicsPlugin(scene, entity) {
      this.gravity = 0.003;
      GravityPhysicsPlugin.__super__.constructor.call(this, scene, entity);
    }

    GravityPhysicsPlugin.prototype.update = function(dt) {
      var model, tx, ty;
      model = this.entity.model;
      if (!model.thrusters) {
        tx = this.gravity * (model.thrustVector.x < 0 ? 1 : -1);
        ty = this.gravity * (model.thrustVector.y < 0 ? 1 : -1);
        return model.thrustVector.translate(tx, ty);
      }
    };

    return GravityPhysicsPlugin;

  })(nv.PhysicsPlugin);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  nv.SoundEngine = (function(_super) {

    __extends(SoundEngine, _super);

    function SoundEngine(scene) {
      var _this = this;
      SoundEngine.__super__.constructor.call(this, scene);
      this.plugins = [];
      this.scene.on("sound:plugin:create", function(plugin) {
        return _this.plugins.push(plugin);
      });
      this.scene.on("sound:plugin:delete", function(plugin) {
        return _this.plugins = _this.plugins.filter(function(p) {
          return p.id !== plugin.id;
        });
      });
    }

    SoundEngine.prototype.update = function(dt) {
      var plugin, _i, _len, _ref, _results;
      _ref = this.plugins;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        plugin = _ref[_i];
        _results.push(plugin.update(dt));
      }
      return _results;
    };

    return SoundEngine;

  })(nv.Engine);

  nv.SoundPlugin = (function(_super) {

    __extends(SoundPlugin, _super);

    function SoundPlugin(scene, entity, options) {
      var dispatch, self;
      this.options = options;
      SoundPlugin.__super__.constructor.call(this, scene, entity);
      this.state = "stopped";
      this.sound = new Audio(this.options.asset);
      this.sound.onended = function() {
        this.sound.currentTime = 0;
        this.state = "stopped";
        if (this.options.repeat) {
          return this.play();
        }
      };
      self = this;
      dispatch = function() {
        switch (this.action) {
          case "play":
            return self.play();
          case "stop":
            return self.stop();
          case "pause":
            return self.pause();
        }
      };
      this.scene.on(this.options.event, dispatch.bind(this.options));
      if (this.options.autoplay) {
        this.play();
      }
    }

    SoundPlugin.prototype.update = function(dt) {
      if (!this.options.maxPlayTime) {
        return;
      }
      if (new Date().getTime() - this.playTime > this.options.maxPlayTime) {
        return this.stop();
      }
    };

    SoundPlugin.prototype.play = function() {
      if (this.state === "playing") {
        this.rewind();
      }
      this.playTime = new Date().getTime();
      if (this.options.startTime) {
        this.sound.currentTime = this.options.startTime;
      }
      this.sound.play();
      return this.state = "playing";
    };

    SoundPlugin.prototype.pause = function() {
      this.sound.pause();
      return this.state = "paused";
    };

    SoundPlugin.prototype.rewind = function() {
      this.pause();
      this.sound.currentTime = 0;
      return this.state = "stopped";
    };

    SoundPlugin.prototype.stop = function() {
      return this.rewind();
    };

    return SoundPlugin;

  })(nv.Plugin);

  nv.SoundFactory = (function() {

    function SoundFactory() {}

    SoundFactory.prototype.wire = function(scene, sounds) {
      var name, sound, _results;
      this.scene = scene;
      _results = [];
      for (name in sounds) {
        sound = sounds[name];
        _results.push(this._add(sound));
      }
      return _results;
    };

    SoundFactory.prototype._add = function(sound) {
      return this.scene.fire('sound:plugin:create', new nv.SoundPlugin(this.scene, null, sound));
    };

    return SoundFactory;

  })();

}).call(this);

(function() {
  var randRange, randVariation,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  randRange = function(min, max) {
    return Math.random() * (max - min) + min;
  };

  randVariation = function(center, variation) {
    return center + (variation * randRange(-0.5, 0.5));
  };

  nv.ParticleEngine = (function(_super) {

    __extends(ParticleEngine, _super);

    ParticleEngine.prototype.initializer = function(config, rootModel) {
      return nv.extend(config, {
        canvas: rootModel.canvas,
        width: rootModel.canvas.width,
        height: rootModel.canvas.height
      });
    };

    function ParticleEngine(scene, config) {
      ParticleEngine.__super__.constructor.call(this, scene);
      this.canvas = config.canvas;
      this.context = this.canvas.context;
      this.emitters = [];
    }

    ParticleEngine.prototype["event(engine:particle:register:emitter)"] = function(emitter) {
      this.emitters.push(emitter);
      return this.scene.fire("engine:rendering:create", emitter);
    };

    ParticleEngine.prototype["event(engine:particle:destroy:emitter)"] = function(emitter) {
      this.scene.fire("engine:rendering:destroy", emitter);
      return this.emitters.splice(this.emitters.indexOf(emitter), 1);
    };

    ParticleEngine.prototype.update = function(dt) {
      var emitter, _i, _len, _ref;
      _ref = this.emitters;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        emitter = _ref[_i];
        emitter.update(dt);
      }
      return this.emitters = this.emitters.filter(function(emitter) {
        return !emitter.complete;
      });
    };

    ParticleEngine.prototype.destroy = function() {
      var emitter, _i, _len, _ref;
      _ref = this.emitters;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        emitter = _ref[_i];
        emitter.destroy;
      }
      delete this.emitters;
      return ParticleEngine.__super__.destroy.apply(this, arguments);
    };

    return ParticleEngine;

  })(nv.Engine);

  nv.ParticleEmitter = (function() {

    ParticleEmitter.prototype.defaults = {
      position: new nv.Point(0, 0),
      particlesPerSecond: 100,
      maxParticles: 1024000,
      particleLife: 0.5,
      lifeVariation: 0.52,
      colors: new nv.Gradient([new nv.Color(255, 255, 255, 1), new nv.Color(0, 0, 0, 0)]),
      angle: 0,
      angleVariation: Math.PI * 2,
      minVelocity: 20,
      maxVelocity: 50,
      gravity: new nv.Point(0, 0),
      collider: null,
      bounceDamper: 0.5,
      on: false
    };

    function ParticleEmitter(scene, options) {
      this.scene = scene;
      this.options = nv.clone(this.defaults);
      this.options = nv.extend(this.options, options);
      this.particles = [];
      this.particleCounter = 0;
      this.complete = false;
      this.particlesThisFrame = 0;
      this.scene.fire("engine:particle:register:emitter", this);
    }

    ParticleEmitter.prototype.destroy = function() {
      this.options.on = false;
      this.scene.fire("engine:particle:destroy:emitter", this);
      return delete this.scene;
    };

    ParticleEmitter.prototype.set = function(key, value) {
      return this.options[key] = value;
    };

    ParticleEmitter.prototype.get = function(key) {
      return this.options[key];
    };

    ParticleEmitter.prototype.draw = function(context, canvas) {
      var particle, _i, _len, _ref, _results;
      _ref = this.particles;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        particle = _ref[_i];
        _results.push(particle.draw(context, canvas));
      }
      return _results;
    };

    ParticleEmitter.prototype.spawnParticle = function(offset) {
      var angle, life, position, speed, velocity;
      angle = randVariation(this.options.angle, this.options.angleVariation);
      speed = randRange(this.options.minVelocity, this.options.maxVelocity);
      life = randVariation(this.options.particleLife, this.options.particleLife * this.options.lifeVariation);
      velocity = new nv.Point().fromPolar(angle, speed);
      position = this.options.position.clone().add(velocity.times(offset));
      this.particles.push(new nv.Particle(this.options, position, velocity, life));
      return this.particleCounter++;
    };

    ParticleEmitter.prototype.update = function(dt) {
      var dead, deadParticle, i, index, particle, particlesToSpawn, _i, _j, _len, _len1, _ref;
      dead = [];
      _ref = this.particles;
      for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
        particle = _ref[index];
        particle.update(dt);
        if (particle.isDead()) {
          dead.push(particle);
        }
      }
      for (_j = 0, _len1 = dead.length; _j < _len1; _j++) {
        deadParticle = dead[_j];
        deadParticle.destroy();
        this.particles.splice(this.particles.indexOf(deadParticle), 1);
      }
      dead = void 0;
      if (this.options.on) {
        this.particlesThisFrame += this.options.particlesPerSecond * dt;
        i = 0;
        particlesToSpawn = this.particlesThisFrame;
        while (this.particlesThisFrame > 1) {
          i++;
          this.particlesThisFrame--;
          this.spawnParticle((1.0 + i) / particlesToSpawn * dt);
        }
      }
      if (this.options.maxParticles !== void 0 && this.particleCounter > this.options.maxParticles) {
        this.options.on = false;
        return this.complete = this.particles.length === 0;
      }
    };

    return ParticleEmitter;

  })();

  nv.Particle = (function() {

    function Particle(options, position, velocity, life) {
      this.options = options;
      this.position = position;
      this.velocity = velocity;
      this.life = life;
      this.maxLife = this.life;
    }

    Particle.prototype.isDead = function() {
      return this.life <= 0;
    };

    Particle.prototype.draw = function(context, canvas) {
      var color, lifePercent;
      if (this.isDead()) {
        return;
      }
      lifePercent = 1.0 - (this.life / this.maxLife);
      color = this.options.colors.getColor(lifePercent);
      context.save();
      context.globalAlpha = color.a;
      context.setFillStyle(color.toCanvasColor());
      context.fillRect(this.position.x - 1, this.position.y - 1, 3, 3);
      return context.restore();
    };

    Particle.prototype.update = function(dt) {
      this.velocity.add(this.options.gravity.times(dt));
      this.position.add(this.velocity.times(dt));
      return this.life -= dt;
    };

    Particle.prototype.destroy = function() {
      delete this.options;
      delete this.position;
      delete this.velocity;
      delete this.life;
      return delete this.maxLife;
    };

    return Particle;

  })();

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  nv.EditorEngine = (function(_super) {

    __extends(EditorEngine, _super);

    EditorEngine.prototype.initializer = function(config, rootModel) {};

    function EditorEngine(scene, config) {
      EditorEngine.__super__.constructor.call(this, scene, config);
      window.addEventListener('message', nv.bind(this, this.handleMessage));
    }

    EditorEngine.prototype["event(game:start)"] = function() {
      return this.sendMessage('load', '');
    };

    EditorEngine.prototype.handleMessage = function(event) {
      var message;
      console.log("MESSAGE: ", event);
      message = event.data;
      return this.scene.fire("engine:editor:" + message.type, message.data);
    };

    EditorEngine.prototype.sendMessage = function(type, message) {
      console.log('posting', type, message);
      return window.parent.postMessage({
        type: type,
        message: message
      }, window.location.href);
    };

    return EditorEngine;

  })(nv.Engine);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  nv.LiveEditEngine = (function(_super) {

    __extends(LiveEditEngine, _super);

    LiveEditEngine.prototype.initializer = function(config, rootModel) {
      var script,
        _this = this;
      script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'http://localhost:8888/socket.io/socket.io.js';
      script.addEventListener('load', function(event) {
        return _this.connect();
      });
      return document.querySelector('head').appendChild(script);
    };

    function LiveEditEngine(scene, config) {
      if (!this.connected) {
        this.connect();
      }
    }

    LiveEditEngine.prototype.connect = function() {
      if (!(typeof io === "undefined" || io === null)) {
        this.socket = io.connect('http://localhost:8888');
        this.socket.on('change', function(data) {
          return window.location.href = window.location.href;
        });
        return this.connected = true;
      }
    };

    return LiveEditEngine;

  })(nv.Engine);

}).call(this);

(function() {



}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.scenes = {};

  this.entities = {};

  this.models = {};

  this.renderers = {};

  this.Application = (function(_super) {

    __extends(Application, _super);

    function Application() {
      var start,
        _this = this;
      Application.__super__.constructor.call(this, nv.gameConfig);
      nv.configure({
        debug: true
      });
      start = function() {
        return _this.start('Main');
      };
      setTimeout(start, 0);
    }

    return Application;

  })(nv.Game);

}).call(this);

(function() {
  var renderers,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.renderers = renderers = {};

  renderers.StrokeText = (function(_super) {

    __extends(StrokeText, _super);

    function StrokeText(scene, entity) {
      this.alpha = 1;
      this.direction = "out";
      StrokeText.__super__.constructor.call(this, scene, entity);
    }

    StrokeText.prototype.draw = function(context, canvas) {
      var model, segments, x, y, _ref, _ref1;
      context.save();
      context.setFillStyle(this.entity.model.color);
      context.setStrokeStyle((_ref = this.entity.model.strokeColor) != null ? _ref : this.entity.model.color);
      context.setFont(this.entity.model.font);
      context.setStrokeWidth(this.entity.model.strokeWidth);
      context.shadowColor = (_ref1 = this.entity.model.strokeColor) != null ? _ref1 : this.entity.model.color;
      context.shadowBlur = this.entity.model.shadowBlur;
      x = this.entity.model.x;
      y = this.entity.model.y;
      context.setFillStyle("rgba(0, 0, 0, 0)");
      context.globalAlpha = this.alpha;
      segments = $.isArray(this.entity.model.text) ? this.entity.model.text : [this.entity.model.text];
      model = this.entity.model;
      $.each(segments, function() {
        var size, textWidth;
        if (typeof x !== "number") {
          size = context.canvas.getSize();
          switch (x) {
            case "left":
              x = 0;
              break;
            case "right":
            case "center":
              textWidth = context.measureText(this).width;
              switch (x) {
                case "right":
                  x = size.width - textWidth;
                  break;
                case "center":
                  x = (size.width * 0.5) - (textWidth * 0.5);
              }
              break;
            default:
              x = size.width * (parseFloat(x) / 100);
          }
        }
        context.fillText(this, x, y);
        context.strokeText(this, x, y);
        if (model.lineHeight) {
          return y += model.lineHeight;
        }
      });
      return context.restore();
    };

    StrokeText.prototype.update = function(dt) {
      if (this.entity.model.fade === true) {
        if (this.direction === "out") {
          this.alpha -= this.entity.model.fadeSpeed;
          if (!(this.alpha > 0 + this.entity.model.fadeSpeed)) {
            return this.direction = "in";
          }
        } else if (this.direction === "in") {
          this.alpha += this.entity.model.fadeSpeed;
          if (!(this.alpha < 1)) {
            return this.direction = "out";
          }
        }
      }
    };

    return StrokeText;

  })(nv.RenderingPlugin);

  renderers.Hud = (function(_super) {

    __extends(Hud, _super);

    function Hud(scene, entity) {
      Hud.__super__.constructor.call(this, scene, entity);
      this.camera = scene.getEngine(nv.RenderingEngine).camera;
    }

    Hud.prototype.draw = function(context, canvas) {
      var score, textWidth;
      context.save();
      context.shadowColor = this.entity.model.color;
      context.shadowBlur = 5;
      context.setStrokeStyle(this.entity.model.color);
      context.strokeRect(this.entity.model.x, this.entity.model.y, this.entity.model.width, this.entity.model.height);
      context.restore();
      context.save();
      context.translate(-this.camera.x, -this.camera.y);
      context.setFont(this.entity.model.font);
      context.setStrokeStyle(this.entity.model.color);
      score = this.entity.model.score.toString();
      textWidth = context.measureText(score).width;
      context.strokeText(score, this.entity.model.width - textWidth - 20, 50);
      $.each(this.entity.model.ships, function() {
        var data, points, self;
        data = [];
        self = this;
        points = this.points('ship');
        $.each(points, function() {
          return data.push(this.x + self.x, this.y + self.y);
        });
        data.push(points[0].x + this.x, points[0].y + this.y);
        context.setStrokeStyle(this.strokeColor);
        context.setStrokeWidth(this.strokeWidth);
        return context.path.apply(context, data);
      });
      return context.restore();
    };

    return Hud;

  })(nv.RenderingPlugin);

  renderers.Bullet = (function(_super) {

    __extends(Bullet, _super);

    function Bullet(scene, entity) {
      Bullet.__super__.constructor.call(this, scene, entity);
    }

    Bullet.prototype.draw = function(context, canvas) {
      var _this = this;
      return context.fillPath(function(context) {
        context.setFillStyle(_this.entity.model.color);
        return context.arc(_this.entity.model.x, _this.entity.model.y, _this.entity.model.radius, 0, Math.PI * 2, true);
      });
    };

    return Bullet;

  })(nv.RenderingPlugin);

  renderers.Ship = (function(_super) {

    __extends(Ship, _super);

    function Ship() {
      Ship.__super__.constructor.apply(this, arguments);
    }

    Ship.prototype.constuctor = function(scene, entity) {
      return Ship.__super__.constuctor.call(this, scene, entity);
    };

    return Ship;

  })(nv.PathRenderingPlugin);

  renderers.Background = (function(_super) {

    __extends(Background, _super);

    function Background(scene, entity) {
      var i, radius, renderingEngine, x, y;
      Background.__super__.constructor.call(this, scene, entity);
      this.canvas = new gleam.Canvas;
      this.canvas.setSize(700, 700);
      this.canvas.width = entity.model.width;
      this.canvas.height = entity.model.height;
      renderingEngine = scene.getEngine(nv.RenderingEngine);
      this.rootCanvas = renderingEngine.canvas;
      this.camera = renderingEngine.camera;
      i = 0;
      while (!(i > 100)) {
        i++;
        x = Math.random() * 700;
        y = Math.random() * 700;
        radius = (Math.random() * 2) + 1;
        this.canvas.context.fillPath(function(context) {
          var gradient;
          gradient = context.createRadialGradient(x, y, 0, x, y, radius);
          gradient.addColorStop(0, "white");
          gradient.addColorStop(0.4, "white");
          gradient.addColorStop(0.4, "white");
          gradient.addColorStop(1, "black");
          context.setFillStyle(gradient);
          return context.arc(x, y, radius, 0, Math.PI * 2, true);
        });
      }
    }

    Background.prototype.draw = function(context, canvas) {
      var camX, camY, curX, curY, startX, startY;
      context.globalCompositeOperation = "lighter";
      camX = -this.camera.x;
      camY = -this.camera.y;
      startX = camX + ((this.entity.model.x - camX) % this.entity.model.width);
      startY = camY + ((this.entity.model.y - camY) % this.entity.model.height);
      if (startX > camX) {
        startX -= this.entity.model.width;
      }
      if (startY > camY) {
        startY -= this.entity.model.height;
      }
      curX = startX;
      curY = startY;
      while (curX < camX + this.rootCanvas.width) {
        while (curY < camY + this.rootCanvas.height) {
          context.drawImage(this.canvas.source, curX, curY);
          curY += this.entity.model.height;
        }
        curY = startY;
        curX += this.entity.model.width;
      }
      return context.globalCompositeOperation = "source-over";
    };

    return Background;

  })(nv.RenderingPlugin);

}).call(this);

(function() {
  var models,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.models = models = {};

  models.PathObject = (function(_super) {

    __extends(PathObject, _super);

    function PathObject(options, defaultShape) {
      this.defaultShape = defaultShape != null ? defaultShape : "";
      if (options.shapes != null) {
        this.modelShapes = options.shapes;
      }
      delete options.shapes;
      PathObject.__super__.constructor.call(this, options);
    }

    PathObject.prototype.preparePath = function() {
      return {
        points: []
      };
    };

    PathObject.prototype.shouldDrawShape = function(shapeName) {
      return false;
    };

    PathObject.prototype.points = function(shapeName) {
      var shape;
      if (shapeName == null) {
        shapeName = this.defaultShape;
      }
      shape = this.prepareShape(this.modelShapes[shapeName]);
      return shape.points;
    };

    PathObject.prototype.shapes = function() {
      var shapeName, shapes;
      shapes = [];
      for (shapeName in this.modelShapes) {
        if (this.shouldDrawShape(shapeName)) {
          shapes.push(this.prepareShape(this.modelShapes[shapeName]));
        }
      }
      return shapes;
    };

    PathObject.prototype.translate = function(dx, dy) {
      this.x += dx;
      this.y += dy;
      return this;
    };

    PathObject.prototype.rotate = function(dr) {
      this.rotation += dr;
      return this;
    };

    PathObject.prototype.bounds = function() {
      var x1, x2, y1, y2;
      x1 = x2 = y1 = y2 = null;
      $.each(this.points(), function() {
        if (x1 === null || this.x < x1) {
          x1 = this.x;
        }
        if (x2 === null || this.x > x2) {
          x2 = this.x;
        }
        if (y1 === null || this.y < y1) {
          y1 = this.y;
        }
        if (y2 === null || this.y > y2) {
          return y2 = this.y;
        }
      });
      return new nv.Rect(x1, y1, x2, y2);
    };

    return PathObject;

  })(nv.Model);

  models.Ship = (function(_super) {

    __extends(Ship, _super);

    function Ship(options) {
      Ship.__super__.constructor.call(this, options, "ship");
      this.resetProps = {
        x: this.x,
        y: this.y,
        thrusters: this.thrusters,
        health: this.health,
        rotation: this.rotation,
        thrustVector: new nv.Point(0, 0)
      };
    }

    Ship.prototype.reset = function() {
      return this.setMany(this.resetProps);
    };

    Ship.prototype.shouldDrawShape = function(shapeName) {
      switch (shapeName) {
        case "ship":
          return true;
        case "thrusters":
          return this.thrusters;
        default:
          return false;
      }
    };

    Ship.prototype.prepareShape = function(object) {
      var cosine, model, path, shape, sine;
      shape = $.extend({}, object);
      model = this;
      cosine = Math.cos(this.rotation);
      sine = Math.sin(this.rotation);
      path = [];
      $.each(shape.points, function() {
        return path.push(new nv.Point(this.x * cosine - this.y * sine + model.x, this.x * sine + this.y * cosine + model.y));
      });
      shape.points = path;
      return shape;
    };

    return Ship;

  })(models.PathObject);

  models.Asteroid = (function(_super) {

    __extends(Asteroid, _super);

    function Asteroid(options) {
      Asteroid.__super__.constructor.call(this, options);
      this.wireframe = this.buildWireframe(this.scale * .5);
    }

    Asteroid.prototype.buildWireframe = function(scalar) {
      var points, pt;
      pt = new nv.Point(0, -this.height);
      points = [];
      points.push(pt.clone());
      points.push(pt.translate(30 * scalar, 20 * scalar).clone());
      points.push(pt.translate(5 * scalar, 30 * scalar).clone());
      points.push(pt.translate(-12 * scalar, 10 * scalar).clone());
      points.push(pt.translate(-33 * scalar, -10 * scalar).clone());
      points.push(pt.translate(-10 * scalar, -35 * scalar).clone());
      return points;
    };

    Asteroid.prototype.shapes = function() {
      return [
        {
          points: this.points(),
          strokeColor: this.strokeColor,
          strokeWidth: this.strokeWidth,
          fillStyle: this.fillStyle
        }
      ];
    };

    Asteroid.prototype.points = function() {
      var cosine, model, path, sine;
      cosine = Math.cos(this.rotation);
      sine = Math.sin(this.rotation);
      path = [];
      model = this;
      $.each(this.wireframe, function() {
        return path.push(new nv.Point(this.x * cosine - this.y * sine + model.x, this.x * sine + this.y * cosine + model.y));
      });
      return path;
    };

    Asteroid.prototype.translate = function(dx, dy) {
      this.x += dx;
      return this.y += dy;
    };

    Asteroid.prototype.rotate = function(dr) {
      return this.rotation += dr;
    };

    return Asteroid;

  })(models.PathObject);

  models.Bullet = (function(_super) {

    __extends(Bullet, _super);

    function Bullet(options) {
      Bullet.__super__.constructor.call(this, options);
      this.wireframe = this.buildWireframe();
    }

    Bullet.prototype.points = function() {
      var model, path;
      path = [];
      model = this;
      $.each(this.wireframe, function() {
        return path.push(new nv.Point(model.x, model.y));
      });
      return path;
    };

    Bullet.prototype.buildWireframe = function() {
      return [new nv.Point(0, 0)];
    };

    Bullet.prototype.translate = function(dx, dy) {
      this.x += dx;
      return this.y += dy;
    };

    return Bullet;

  })(nv.Model);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  entities.Background = (function(_super) {

    __extends(Background, _super);

    function Background(scene, follow, variance) {
      this.follow = follow;
      this.variance = variance;
      Background.__super__.constructor.call(this, scene, [renderers.Background], new models.Background);
    }

    Background.prototype.update = function(dt) {
      if (!!this.follow) {
        this.model.x = this.follow.model.x * this.variance;
        return this.model.y = this.follow.model.y * this.variance;
      }
    };

    return Background;

  })(nv.Entity);

  entities.Title = (function(_super) {

    __extends(Title, _super);

    function Title(scene) {
      Title.__super__.constructor.call(this, scene, [renderers.StrokeText], {
        color: "#000",
        strokeColor: "#0F0",
        x: 200,
        y: 320,
        font: "bold italic 50px sans-serif",
        text: "Novus",
        strokeWidth: 2,
        shadowBlur: 20,
        clickable: true
      });
      this.direction = "out";
    }

    Title.prototype.update = function(dt) {
      if (this.direction === "out") {
        this.model.shadowBlur -= 0.2;
        if (!(this.model.shadowBlur > 0)) {
          return this.direction = "in";
        }
      } else if (this.direction === "in") {
        this.model.shadowBlur += 0.2;
        if (!(this.model.shadowBlur < 20)) {
          return this.direction = "out";
        }
      }
    };

    return Title;

  })(nv.Entity);

  entities.ActionText = (function(_super) {

    __extends(ActionText, _super);

    function ActionText(scene) {
      ActionText.__super__.constructor.call(this, scene, [renderers.StrokeText], {
        color: "#0F0",
        x: 200,
        y: 400,
        font: "bold 20px sans-serif",
        text: "Press <Space> to Start",
        strokeWidth: 0,
        shadowBlur: 0,
        fade: true,
        fadeSpeed: 0.02
      });
    }

    ActionText.prototype.update = function(dt) {
      return this.plugins[0].update(dt);
    };

    return ActionText;

  })(nv.Entity);

  entities.Cursor = (function(_super) {

    __extends(Cursor, _super);

    function Cursor(scene) {
      Cursor.__super__.constructor.call(this, scene, [nv.DrawableRenderingPlugin], {
        drawable: new gleam.Square
      });
      this.gamepad = this.scene.gamepad;
    }

    Cursor.prototype.update = function(dt) {
      var state;
      state = this.gamepad.getState();
      this.model.drawable.x = state.mouse.x;
      return this.model.drawable.y = state.mouse.y;
    };

    return Cursor;

  })(nv.Entity);

  entities.WrappingEntity = (function(_super) {

    __extends(WrappingEntity, _super);

    function WrappingEntity(scene, plugins, model) {
      WrappingEntity.__super__.constructor.call(this, scene, plugins, model);
      this.canvas = this.scene.getEngine(nv.RenderingEngine).canvas;
    }

    WrappingEntity.prototype.wrap = function() {
      var dimensions;
      dimensions = this.canvas.getSize();
      if (this.model.x < 0) {
        this.model.x = dimensions.width;
      } else if (this.model.x > dimensions.width) {
        this.model.x = 0;
      }
      if (this.model.y < 0) {
        return this.model.y = dimensions.height;
      } else if (this.model.y > dimensions.height) {
        return this.model.y = 0;
      }
    };

    return WrappingEntity;

  })(nv.Entity);

  entities.Asteroid = (function(_super) {

    __extends(Asteroid, _super);

    function Asteroid(scene, plugins, model) {
      this["event(engine:collision:Bullet:Asteroid)"] = __bind(this["event(engine:collision:Bullet:Asteroid)"], this);
      this["event(engine:collision:Ship:Asteroid)"] = __bind(this["event(engine:collision:Ship:Asteroid)"], this);      Asteroid.__super__.constructor.call(this, scene, plugins, model);
    }

    Asteroid.prototype["event(engine:collision:Ship:Asteroid)"] = function(data) {
      if (data.target === this) {
        return this.handleCollision(data);
      }
    };

    Asteroid.prototype["event(engine:collision:Bullet:Asteroid)"] = function(data) {
      if (data.target === this) {
        return this.handleCollision(data);
      }
    };

    Asteroid.prototype.handleCollision = function(data) {
      var bounds, offset, options, size;
      if (data.target.model.get("dead") !== true) {
        this.scene.fire("entity:destroyed:Asteroid", data.target);
        this.scene.fire("entity:remove", data.target);
        this.emitter = new nv.ParticleEmitter(this.scene, {
          position: new nv.Point(data.target.model.get('x'), data.target.model.get('y')),
          particlesPerSecond: 100,
          maxParticles: 20,
          colors: new nv.Gradient([new nv.Color(255, 255, 255, 1), new nv.Color(125, 125, 125, 0.7), new nv.Color(0, 0, 0, 0)]),
          particleLife: 3,
          angleVariation: 6.28,
          minVelocity: 1,
          maxVelocity: 3,
          on: true
        });
        size = data.target.model.get('size') - 1;
        if (size !== 0) {
          bounds = data.target.model.bounds();
          offset = (bounds.x2 - bounds.x) / (6 - data.target.model.get('size'));
          options = {
            entity: "asteroid",
            x: data.target.model.get('x') - offset,
            y: data.target.model.get('y'),
            scale: size,
            direction: data.target.model.get('direction') - 0.3
          };
          this.scene.fire('entity:create', options);
          options = $.extend({}, options);
          options.x += offset * 2;
          options.direction += 0.6;
          this.scene.fire('entity:create', options);
        }
      }
      return data.target.model.set('dead', true);
    };

    Asteroid.prototype.update = function(dt) {
      this.model.rotation += this.model.rotationSpeed;
      this.model.translate(Math.sin(this.model.direction) * this.model.speed, Math.cos(this.model.direction) * this.model.speed);
      return this.wrap();
    };

    return Asteroid;

  })(entities.WrappingEntity);

  entities.Bullet = (function(_super) {

    __extends(Bullet, _super);

    function Bullet(scene, plugins, model) {
      this["event(engine:collision:Bullet:Asteroid)"] = __bind(this["event(engine:collision:Bullet:Asteroid)"], this);      Bullet.__super__.constructor.call(this, scene, plugins, model);
    }

    Bullet.prototype["event(engine:collision:Bullet:Asteroid)"] = function(data) {
      if (data.actor === this) {
        return this.scene.fire("entity:remove", data.actor);
      }
    };

    Bullet.prototype.update = function(dt) {
      this.model.translate(this.model.speed * Math.sin(this.model.angle) * dt, -1 * this.model.speed * Math.cos(this.model.angle) * dt);
      if (this.model.x < -100 || this.model.x > 900) {
        if (this.model.y < -100 || this.model.y > 900) {
          this.model.alive = false;
        }
      }
      this.model.life--;
      if (this.model.life === 0) {
        this.model.alive = false;
        return this.scene.fire("entity:remove", this);
      } else {
        return this.wrap();
      }
    };

    return Bullet;

  })(entities.WrappingEntity);

  entities.Hud = (function(_super) {

    __extends(Hud, _super);

    function Hud(scene, plugins, model) {
      this["event(entity:destroyed:Asteroid)"] = __bind(this["event(entity:destroyed:Asteroid)"], this);      Hud.__super__.constructor.call(this, scene, plugins, model);
    }

    Hud.prototype["event(entity:destroyed:Asteroid)"] = function(data) {
      if (!!data.model) {
        return this.model.score += [500, 300, 200, 100][data.model.size - 1];
      }
    };

    Hud.prototype.shipDestroyed = function() {
      this.model.ships.pop();
      this.model.lives--;
      return this.model.lives;
    };

    return Hud;

  })(nv.Entity);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  entities.Ship = (function(_super) {

    __extends(Ship, _super);

    function Ship(scene, plugins, model) {
      Ship.__super__.constructor.call(this, scene, plugins, model);
      this.maxVelocity = 3;
      this.emitter = new nv.ParticleEmitter(this.scene, {
        position: new nv.Point(-100, -100),
        particlesPerSecond: 100,
        colors: new nv.Gradient([new nv.Color(255, 100, 100, 1), new nv.Color(170, 50, 50, 1), new nv.Color(0, 0, 0, 0)]),
        particleLife: 0.3,
        lifeVariance: 0.4,
        angleVariation: 0.75,
        minVelocity: 1,
        maxVelocity: 1
      });
    }

    Ship.prototype["event(engine:gamepad:press:shoot)"] = function() {
      var options;
      options = {
        entity: "bullet",
        x: this.model.points()[0].x,
        y: this.model.points()[0].y,
        angle: this.model.rotation
      };
      return this.scene.fire("entity:create", options);
    };

    Ship.prototype["event(engine:collision:Ship:Asteroid)"] = function(data) {
      this.scene.fire("entity:destroyed:Ship", this);
      return this.scene.fire("entity:remove", this);
    };

    Ship.prototype.update = function(dt) {
      var anchor, state;
      state = this.scene.get('gamepad').getState();
      if (state.left) {
        this.model.rotate(-0.1);
      }
      if (state.right) {
        this.model.rotate(0.1);
      }
      if (state.up) {
        this.model.velocity = Math.min(this.model.velocity * 1.01 || 1, this.maxVelocity);
        if (!(this.model.velocity >= this.maxVelocity)) {
          this.model.thrustVector.translate(this.model.velocity * Math.sin(this.model.rotation) * dt * 4, -this.model.velocity * Math.cos(this.model.rotation) * dt * 4);
        }
      }
      this.model.thrusters = state.up;
      if (!this.model.thrusters) {
        this.model.velocity = 0;
      }
      this.model.translate(this.model.thrustVector.x, this.model.thrustVector.y);
      if (this.model.thrusters) {
        this.scene.fire("entity:thrust:Ship");
      }
      anchor = this.model.points("thrusters")[0];
      this.emitter.set('position', new nv.Point(anchor.x, anchor.y));
      if (this.model.thrusters) {
        this.emitter.set('on', true);
        this.emitter.set('angle', this.model.rotation + (Math.PI * 0.5));
      } else {
        this.emitter.set('on', false);
      }
      return this.wrap();
    };

    Ship.prototype.destroy = function() {
      this.emitter.destroy();
      return Ship.__super__.destroy.apply(this, arguments);
    };

    return Ship;

  })(entities.WrappingEntity);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  scenes.Game = (function(_super) {

    __extends(Game, _super);

    function Game(name, game, rootModel) {
      var hud,
        _this = this;
      Game.__super__.constructor.call(this, name, game, rootModel);
      hud = this.getEntity(entities.Hud);
      this.on("entity:destroyed:Ship", function(ship) {
        var remaining;
        remaining = hud.shipDestroyed();
        if (remaining > 0) {
          return _this.fire("entity:create", {
            entity: "ship"
          });
        } else if (remaining === 0) {
          _this.game.closeScene("Game");
          return _this.game.openScene('Gameover', _this.canvas);
        }
      });
      this.send("engine:timing:start");
    }

    Game.prototype.destroy = function() {
      return Game.__super__.destroy.apply(this, arguments);
    };

    return Game;

  })(nv.Scene);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  scenes.Gameover = (function(_super) {

    __extends(Gameover, _super);

    function Gameover(name, game, rootModel) {
      var _this = this;
      Gameover.__super__.constructor.call(this, name, game, rootModel);
      this.on("engine:gamepad:press:shoot", function() {
        _this.game.closeScene("Gameover");
        return _this.game.openScene('Game');
      });
      this.send("engine:timing:start");
    }

    Gameover.prototype.destroy = function() {
      return Gameover.__super__.destroy.apply(this, arguments);
    };

    return Gameover;

  })(nv.Scene);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  scenes.Main = (function(_super) {

    __extends(Main, _super);

    function Main(name, game, rootModel) {
      var _this = this;
      Main.__super__.constructor.call(this, name, game, rootModel);
      this.on("engine:gamepad:press:shoot", function() {
        _this.fire("scene:close");
        return _this.game.openScene('Game');
      });
      this.send("engine:timing:start");
    }

    Main.prototype.update = function(dt) {
      return Main.__super__.update.call(this, dt);
    };

    Main.prototype.destroy = function() {
      this.send("engine:timing:stop");
      return Main.__super__.destroy.apply(this, arguments);
    };

    return Main;

  })(nv.Scene);

}).call(this);

(function() {

  nv.gameConfig = {
    canvas: {
      height: 745,
      width: 500,
      responsive: true,
      css: {
        background: '000',
        margin: '0 auto 0 auto',
        display: 'block'
      }
    },
    enginesToLoad: [nv.RenderingEngine, nv.GamepadEngine, nv.PhysicsEngine, nv.TimingEngine, nv.DebugEngine, nv.SoundEngine, nv.ParticleEngine],
    scenes: {
      main: {
        config: {
          gamepad: {
            keys: {
              shoot: nv.Key.Spacebar
            },
            trackMouse: true
          }
        },
        enginesUsed: [nv.RenderingEngine, nv.GamepadEngine, nv.SoundEngine, nv.TimingEngine, nv.DebugEngine, nv.ParticleEngine],
        entities: {
          background_layer1: {
            include: "background_layer1"
          },
          background_layer2: {
            include: "background_layer2"
          },
          title: {
            entity: nv.Entity,
            plugins: [renderers.StrokeText],
            later: "effects.ShadowBlurAnimator",
            model: {
              options: {
                color: "#000",
                strokeColor: "#0F0",
                x: "center",
                y: 320,
                font: "bold italic 50px sans-serif",
                text: "Novus",
                strokeWidth: 2,
                shadowBlur: 20,
                shadowBlurIncrement: 0.2
              }
            }
          },
          action_text: {
            entity: nv.Entity,
            plugins: [renderers.StrokeText],
            later: "effects.GlobalAlphaAnimator",
            model: {
              options: {
                color: "#0F0",
                x: "center",
                y: 400,
                font: "20px sans-serif",
                text: "Press <Space> to Start",
                strokeWidth: 0,
                shadowBlur: 0,
                fade: true,
                fadeSpeed: 0.02
              }
            }
          },
          asteroid: {
            include: "asteroid",
            count: 9
          },
          start_button: {
            entity: nv.Entity,
            plugins: [nv.TouchTargetPlugin],
            model: {
              initializers: {
                bounds: function() {
                  return new nv.Rect(10, 10, 100, 100);
                }
              },
              options: {
                action: "shoot"
              }
            }
          }
        }
      },
      game: {
        config: {
          gamepad: {
            keys: {
              left: nv.Key.A,
              right: nv.Key.D,
              up: nv.Key.W,
              down: nv.Key.S,
              shoot: nv.Key.Spacebar
            },
            trackMouse: false
          }
        },
        enginesUsed: [nv.RenderingEngine, nv.GamepadEngine, nv.PhysicsEngine, nv.TimingEngine, nv.DebugEngine, nv.SoundEngine, nv.ParticleEngine],
        soundfx: {
          shoot: {
            asset: "/assets/sounds/pew_pew.wav",
            event: "engine:gamepad:press:shoot",
            action: "play"
          },
          collision: {
            asset: "/assets/sounds/depth_charge.wav",
            event: "engine:collision:Bullet:Asteroid",
            action: "play"
          },
          thrusters: {
            asset: "/assets/sounds/bullet_whizzing.wav",
            event: "entity:thrust:Ship",
            action: "play",
            maxPlayTime: 350,
            startTime: 0.15
          }
        },
        entities: {
          background_layer1: {
            include: "background_layer1"
          },
          background_layer2: {
            include: "background_layer2"
          },
          hud: {
            entity: entities.Hud,
            plugins: [renderers.Hud],
            model: {
              initializers: {
                ship: function() {
                  return new models.Ship({
                    x: 20,
                    y: 20,
                    rotation: 0,
                    strokeColor: '#FFF',
                    strokeWidth: 2,
                    shapes: {
                      ship: {
                        points: [new nv.Point(0, -12), new nv.Point(8, 12), new nv.Point(0, 9.6), new nv.Point(-8, 12)]
                      }
                    }
                  });
                },
                ships: function() {
                  return [$.extend({}, this.ship), ($.extend({}, this.ship)).translate(20, 0), ($.extend({}, this.ship)).translate(40, 0)];
                },
                width: function(scene) {
                  return scene.rootModel.get('canvas').width;
                },
                height: function(scene) {
                  return scene.rootModel.get('canvas').height;
                }
              },
              options: {
                color: '#FFF',
                font: "40px sans-serif",
                x: 0,
                y: 0,
                lives: 4,
                score: 0
              }
            }
          },
          ship: {
            include: "ship"
          },
          asteroid: {
            include: "asteroid",
            count: 2
          },
          bullet: {
            include: "bullet",
            count: 0
          }
        }
      },
      gameover: {
        config: {
          gamepad: {
            keys: {
              shoot: nv.Key.Spacebar
            },
            trackMouse: false
          }
        },
        enginesUsed: [nv.RenderingEngine, nv.GamepadEngine, nv.SoundEngine, nv.TimingEngine, nv.DebugEngine, nv.ParticleEngine],
        entities: {
          background_layer1: {
            include: "background_layer1"
          },
          background_layer2: {
            include: "background_layer2"
          },
          title: {
            entity: nv.Entity,
            plugins: [renderers.StrokeText],
            later: "effects.ShadowBlurAnimator",
            model: {
              options: {
                color: "#000",
                strokeColor: "#0F0",
                x: "center",
                y: 320,
                font: "bold italic 50px sans-serif",
                text: "High Scores",
                strokeWidth: 2,
                shadowBlur: 20,
                shadowBlurIncrement: 0.2
              }
            }
          },
          highscores: {
            entity: nv.Entity,
            plugins: [renderers.StrokeText],
            later: "effects.ShadowBlurAnimator",
            model: {
              options: {
                color: "#000",
                strokeColor: "#0F0",
                x: "center",
                y: 420,
                font: "30px sans-serif",
                text: ["STV        10,000\n", "DAN         7,400\n", "ARN         5,000\n", "BEN         3,200\n", "DAN         3,000\n", "DKO         2,550"],
                lineHeight: 40,
                strokeWidth: 2,
                shadowBlur: 20,
                shadowBlurIncrement: 0.2
              }
            }
          },
          action_text: {
            entity: nv.Entity,
            plugins: [renderers.StrokeText],
            later: "effects.GlobalAlphaAnimator",
            model: {
              options: {
                color: "#0F0",
                x: "center",
                y: 700,
                font: "20px sans-serif",
                text: "Press <Space> to Play Again",
                strokeWidth: 0,
                shadowBlur: 0,
                fade: true,
                fadeSpeed: 0.02
              }
            }
          },
          asteroid: {
            include: "asteroid",
            count: 9
          }
        }
      }
    },
    entities: {
      background_layer1: {
        entity: nv.Entity,
        plugins: [renderers.Background],
        model: {
          options: {
            x: 0,
            y: 0,
            width: 500,
            height: 500
          }
        }
      },
      background_layer2: {
        entity: nv.Entity,
        plugins: [renderers.Background],
        model: {
          options: {
            x: 0,
            y: 0,
            width: 500,
            height: 500
          }
        }
      },
      asteroid: {
        entity: entities.Asteroid,
        plugins: [nv.PathRenderingPlugin, nv.PathPhysicsPlugin],
        model: {
          klass: models.Asteroid,
          initializers: {
            scale: function() {
              return Math.ceil(Math.random() * 4);
            },
            x: function(scene) {
              return scene.rootModel.get('canvas').getSize().width * Math.random();
            },
            y: function(scene) {
              return scene.rootModel.get('canvas').getSize().width * Math.random();
            },
            size: function() {
              return this.scale;
            },
            width: function() {
              return this.scale * 12;
            },
            height: function() {
              return this.scale * 12;
            },
            direction: function() {
              return (Math.random() * Math.PI) - (Math.PI / 2);
            },
            speed: function() {
              return Math.random() + 0.3;
            },
            rotationSpeed: function() {
              return ((Math.random() / 10) - 0.05) / 8;
            }
          },
          options: {
            rotation: 0,
            physicsObjectType: 'passive',
            strokeColor: '#FFF',
            strokeWidth: 3,
            fillStyle: 'rgba(0,0,0,0.8)'
          }
        }
      },
      ship: {
        entity: entities.Ship,
        plugins: [renderers.Ship, nv.PathPhysicsPlugin, nv.GravityPhysicsPlugin],
        model: {
          klass: models.Ship,
          initializers: {
            thrustVector: function() {
              return new nv.Point(0, 0);
            },
            x: function(scene) {
              return scene.rootModel.get('canvas').getSize().width / 2;
            },
            y: function(scene) {
              return scene.rootModel.get('canvas').getSize().height / 2;
            }
          },
          options: {
            velocity: 0,
            health: 100,
            shootDelay: 10,
            width: 16,
            height: 24,
            rotation: 0,
            thrusters: false,
            physicsObjectType: 'both',
            shapes: {
              ship: {
                strokeColor: '#FFF',
                strokeWidth: 2,
                fillStyle: '#000',
                points: [new nv.Point(0, -12), new nv.Point(8, 12), new nv.Point(0, 9.6), new nv.Point(-8, 12)]
              },
              thrusters: {
                strokeColor: 'orange',
                strokeWidth: 2,
                fillStyle: 'yellow',
                points: [new nv.Point(0, 13.6), new nv.Point(4, 16), new nv.Point(0, 31.2), new nv.Point(-4, 16)]
              }
            }
          }
        }
      },
      bullet: {
        entity: entities.Bullet,
        plugins: [renderers.Bullet, nv.PathPhysicsPlugin],
        model: {
          klass: models.Bullet,
          options: {
            x: 0,
            y: 0,
            color: "#FF7600",
            speed: 400,
            radius: 3,
            alive: true,
            life: 100,
            angle: 0,
            physicsObjectType: "active"
          }
        }
      }
    }
  };

}).call(this);

(function() {

  nv.ready(function() {
    return this.app = new Application;
  });

}).call(this);
