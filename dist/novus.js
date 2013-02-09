(function(){var a;this.nv=(a=this.nv)!=null?a:{}}).call(this),function(){nv.Controller=function(){function a(a){this.asset=a}return a.prototype.update=function(a){},a}()}.call(this),function(){nv.Entity=function(){function a(a){this.plugins=a}return a}()}.call(this),function(){nv.Model=function(){function a(a,b,c){}return a.prototype.setMany=function(a){var b,c;c=[];for(b in a)c.push(this[b]=a[b]);return c},a.prototype.persist=function(){return window.localStorage[this.name]=this},a.prototype.load=function(){return this.setMany(window.localStorage[this.name])},a}()}.call(this),function(){nv.ObjectRenderer=function(){function a(a,b){this.glcanvas=a,this.asset=b,this.glcanvas.addDrawable(this)}return a.prototype.draw=function(a){},a.prototype.destroy=function(){return this.glcanvas.removeDrawable(this)},a}(),nv.ObjectListRenderer=function(){function a(a,b){var c=this;this.assets=b,this.classname=this.constructor.toString(),this.assetCounter=0,a.addDrawable(this),$.each(this.assets,function(a){return c.acquireAsset(a)})}return a.prototype.acquireAsset=function(a){return a.id=this.classname+this.assetCounter++,a},a.prototype.add=function(a){return this.assets.push(this.acquireAsset(a)),a},a.prototype.remove=function(a){return this.assets=this.assets.filter(function(b){return b.id!==a.id})},a.prototype.draw=function(a){},a}()}.call(this),function(){nv.Scene=function(){function a(){this.controllers=[],this.models={},this.renderers=[]}return a.prototype.addController=function(a){return this.controllers.push(a)},a.prototype.removeController=function(a){return this.controllers.splice(this.controllers.indexOf(a),1)},a.prototype.addModel=function(a,b){return this.models[a]=b},a.prototype.getModel=function(a){return this.models[a]},a.prototype.removeModel=function(a){return delete this.models[a]},a.prototype.addRenderer=function(a){return this.renderers.push(a)},a.prototype.removeRenderer=function(a){return this.renderers.splice(this.renderers.indexOf(a),1)},a.prototype.update=function(a){var b,c,d,e,f;e=this.controllers,f=[];for(c=0,d=e.length;c<d;c++)b=e[c],f.push(b.update(a));return f},a}()}.call(this),function(){nv.Point=function(){function a(a,b){this.x=a,this.y=b}return a.prototype.clone=function(){return new nv.Point(this.x,this.y)},a.prototype.translate=function(a,b){return this.x+=a,this.y+=b,this},a}(),nv.Rect=function(){function a(a,b,c,d){this.x=a,this.y=b,this.width=c,this.height=d}return a.prototype.clone=function(){return new nv.Rect(this.x,this.y,this.width,this.height)},a.prototype.contains=function(a){return a.x>=this.x&&a.x<=this.x+this.width&&a.y>=this.y&&a.y<=this.y+this.height},a.prototype.translate=function(a,b){return this.x+=a,this.y+=b},a}()}.call(this),function(){var a;window.nv=(a=window.nv)!=null?a:{},window.nv.Key={Backspace:8,Tab:9,Enter:13,Shift:16,Control:17,PauseBreak:19,CapsLock:20,Esc:27,Spacebar:32,PageUp:33,PageDown:34,End:35,Home:36,Left:37,Up:38,Right:39,Down:40,Insert:45,Delete:46,Keyb0:48,Keyb1:49,Keyb2:50,Keyb3:51,Keyb4:52,Keyb5:53,Keyb6:54,Keyb7:55,Keyb8:56,Keyb9:57,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90,Numpad0:96,Numpad1:97,Numpad2:98,Numpad3:99,Numpad4:100,Numpad5:101,Numpad6:102,Numpad7:103,Numpad8:104,Numpad9:105,NumpadStar:106,NumpadPlus:107,NumpadMinus:109,NumpadPeriod:110,NumpadSlash:111,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,F13:124,F14:125,F15:126,NumLck:144,ScrLck:145,SemiColon:186,Equal:187,Comma:188,Minus:189,Period:190,Question:191,BackQuote:192,LeftBrace:219,Pipe:220,RightBrace:221,SingleQuote:222}}.call(this),function(){var a,b,c=[].slice;nv.extend=function(a){var b,c;c=[];for(b in a)c.push(this[b]=a[b]);return c},nv.extend({log:function(){var a,b,c,d;d=[];for(b=0,c=arguments.length;b<c;b++)a=arguments[b],d.push(console.log(a));return d},bind:function(a,b){return function(){return b.call.apply(b,[a].concat(c.call(arguments)))}},keydown:function(a,b){return $(document).on("keydown",function(c){if(c.keyCode===a)return b()})},keyup:function(a,b){return $(document).on("keyup",function(c){if(c.keyCode===a)return b()})}}),b=function(){function a(){this.gamepad=navigator.webkitGamepad,this.state={},this.listeners={}}return a.prototype.aliasKey=function(a,b){var c=this;return nv.keydown(b,function(){return c.fireButton(a)}),nv.keyup(b,function(){return c.state[a]=!1})},a.prototype.fireButton=function(a){var b,c,d,e,f;this.state[a]=!0,c=this.listeners[a];if(c instanceof Array){f=[];for(d=0,e=c.length;d<e;d++)b=c[d],f.push(b(a));return f}},a.prototype.onButtonPress=function(a,b){var c;return c=this.listeners[a],c||(c=[]),c.push(b),this.listeners[a]=c,b},a.prototype.offButtonPress=function(a,b){var c;return c=this.listeners[a],c.indexOf(b(!0))&&c.splice(c.indexOf(b),1),this.listeners[a]=c,b},a.prototype.getState=function(){return this.state},a}(),nv.gamepad=function(){return new b},a=function(){function a(){this.following=null,this.x=0,this.y=0,this.offsetX=0,this.offsetY=0,this.zoomValue=1}return a.prototype.follow=function(a,b,c){return this.following=a,this.offsetX=b,this.offsetY=c},a.prototype.zoom=function(a,b){var c,d,e=this;return b?(d=Date.now(),c=this.zoomValue,this.onUpdate=function(f){var g,h;h=Date.now(),g=h-d,e.zoomValue=(a-c)*(g/b)+c;if(g>b)return e.onUpdate=null,e.zoomValue=a}):this.zoomValue=a},a.prototype.update=function(a,b,c){var d;return this.following&&(d=c.size(),this.offsetX=d.width/2,this.offsetY=d.height/2,this.x=-this.following.x*this.zoomValue+this.offsetX,this.y=-this.following.y*this.zoomValue+this.offsetY),this.onUpdate&&this.onUpdate(a),b.translate(this.x,this.y),b.scale(this.zoomValue,this.zoomValue)},a}(),nv.camera=function(){return new a}}.call(this),function(){var a;a=function(){function a(){this.listeners=[]}return a.prototype.on=function(a,b){var c;return c=this.listeners[a],c instanceof Array||(c=[]),c.push(b),this.listeners[a]=c,this},a.prototype.fire=function(a,b){var c,d,e,f,g;b=b!=null?b:{},b.data=b,b.type=a,d=this.listeners[a];if(d instanceof Array){g=[];for(e=0,f=d.length;e<f;e++)c=d[e],g.push(c(b));return g}},a.prototype.off=function(a,b){return!this.listeners[a]instanceof Array||this.listeners[a].indexOf(b(!0))&&this.listeners[a].splice(this.listeners[a].indexOf(b),1),this},a}(),window.EventDispatcher=a}.call(this),function(){var a,b={}.hasOwnProperty,c=function(a,c){function e(){this.constructor=a}for(var d in c)b.call(c,d)&&(a[d]=c[d]);return e.prototype=c.prototype,a.prototype=new e,a.__super__=c.prototype,a};a=function(a){function b(){var a=this;this.listeners={},this.connection=this.connectToChannel("novus"),this.connection.on("connect",function(){return console.log("Connected!")}),this.connection.on("join",function(a){return console.log(a)}),this.connection.on("message",function(b){return a.handleMessage(b)})}return c(b,a),b.prototype.handleMessage=function(a){console.log(a);if(a.id)return this.fire(a.id,a)},b.prototype.send=function(a,b){return b.id=a,this.connection.emit("message",b)},b.prototype.connectToChannel=function(a){return io.connect("http://pubsub.pubnub.com",{channel:a,publish_key:"pub-c54880a5-ba99-4836-a084-08f57b4b5333",subscribe_key:"sub-3129de73-8f26-11e1-94c8-1543525cae6d",ssl:!1})},b.prototype.auth=function(a){var b=this;return $.post("http://localhost:3000",{user:a},function(a){var c;return c=JSON.parse(a).token,b.connection=b.connectToChannel(c),b.connection.send("Hello server!")})},b}(EventDispatcher),window.nub=function(){return new a}}.call(this),function(){var a,b,c,d,e,f,g,h,i,j,k,l,m,n;c=(d=(e=(g=(h=(i=window.requestAnimationFrame)!=null?i:window.webkitRequestAnimationFrame)!=null?h:window.mozRequestAnimationFrame)!=null?g:window.oRequestAnimationFrame)!=null?e:window.msRequestAnimationFrame)!=null?d:function(a){return setTimeout(a,17)},a=(j=(k=(l=(m=(n=(f=window.cancelRequestAnimationFrame)!=null?f:window.webkitCancelAnimationFrame)!=null?n:window.webkitCancelRequestAnimationFrame)!=null?m:window.mozCancelRequestAnimationFrame)!=null?l:window.oCancelRequestAnimationFrame)!=null?k:window.msCancelRequestAnimationFrame)!=null?j:clearTimeout,b=function(a){return new b.prototype.init(a)},b.prototype={init:function(a){return typeof a=="string"&&(a=document.querySelector(a)),a=a!=null?a:document.createElement("canvas"),b.prototype.extend.call(a,b.prototype),a.context=b.context(a.getContext("2d")),a.objects=[],a.requestFrameKey=null,a.updating=!1,a},size:function(a,b){var c;return a!=null&&b!=null?(this.width=a,this.height=b,this):c={width:this.width,height:this.height}},fullscreen:function(){var a=this;return this.size(window.innerWidth,window.innerHeight),window.addEventListener("resize",function(b){return a.size(window.innerWidth,window.innerHeight)})},background:function(a){return this.style.background=a},draw:function(a){return a.draw(this.context,this)},addDrawable:function(a){return this.objects.push(a)},removeDrawable:function(a){return this.objects.splice(this.objects.indexOf(a),1)},drawObjects:function(){var a,b,c,d,e;d=this.objects,e=[];for(b=0,c=d.length;b<c;b++)a=d[b],e.push(this.draw(a));return e},startDrawUpdate:function(a,b){var d,e,f=this;return this.updating=!0,d=Date.now(),e=function(){var a,g,h;g=Date.now(),a=g-d,a/=1e3,h=b(a),f.context.save(),f.context.clear(),f.camera&&f.camera.update(a,f.context,f),f.drawObjects(),f.context.restore(),d=g;if(f.cancel)return f.cancel=!1;if(!!f.updating)return f.requestFrameKey=c(e)},this.requestFrameKey=c(e)},stopDrawUpdate:function(){return this.updating=!1,this.cancel=!0,a(this.requestFrameKey)},extend:function(a){var b;for(b in a)this[b]=a[b];return this}},b.prototype.init.prototype=b.prototype,window.gl=b,b.prototype.extend.call(b,{implement:function(a){return b.prototype.extend.call(b,a)},context:function(a){return b.prototype.extend.call(a,b.context.prototype),a}}),b.prototype.extend.call(b.context.prototype,{color:function(a){return this.fillStyle=a},strokeColor:function(a){return this.strokeStyle=a},strokeWidth:function(a){return this.lineWidth=a},setFont:function(a){return this.font=a},fillPath:function(a){return this.beginPath(),a(this),this.fill(),this.closePath()},line:function(){this.beginPath(),this.moveTo(Array.prototype.shift.call(arguments),Array.prototype.shift.call(arguments));while(arguments.length>0)this.lineTo(Array.prototype.shift.call(arguments),Array.prototype.shift.call(arguments));return this.stroke(),this.closePath()},rotateAround:function(a,b,c,d){return this.save(),this.translate(a,b),this.rotate(c),this.translate(-a,-b),d(),this.restore()},clear:function(){return this.clearRect(0,0,this.canvas.width,this.canvas.height)}}),b.implement({drawable:function(a){return b.prototype.extend.call(this,a),b.prototype.extend.call(this.prototype,a),this}}),b.implement({square:function(a){var c;return c={color:"#CCC",width:10,height:10,x:10,y:10},b.prototype.extend.call(c,a),b.drawable.call(this,c),this}}),b.prototype.extend.call(b.square.prototype,{draw:function(a){return a.color(this.color),a.fillRect(this.x,this.y,this.width,this.height)}}),b.implement({text:function(a){var c;return c={color:"#CCC",x:10,y:10,font:"bold 20px sans-serif",textBaseline:"bottom",text:"Lorem Ipsum"},b.prototype.extend.call(c,a),b.drawable.call(this,c),this}}),b.prototype.extend.call(b.text.prototype,{draw:function(a){return a.color(this.color),a.setFont(this.font),a.textBaseline=this.textBaseline,a.fillText(this.text,this.x,this.y)}}),b.implement({sprite:function(a){var c,d=this;return c={src:"",x:10,y:10,width:null,height:null},b.prototype.extend.call(c,a),b.drawable.call(this,c),this.loaded=!1,this.image=new Image,this.image.onload=function(){return d.width||(d.width=d.image.width),d.height||(d.height=d.image.height),d.loaded=!0},this.image.src=this.src,this}}),b.prototype.extend.call(b.sprite.prototype,{draw:function(a){return a.drawImage(this.image,this.x,this.y,this.width,this.height)}})}.call(this),function(){var a;a=function(){function a(){}return a.prototype.html='<div id="debug"></div>',a.prototype.log=function(){var a;return a=arguments,console.log(arguments)},a}(),$(function(){return nv.Debug=new a,nv.log=nv.Debug.log})}.call(this),function(){var a,b,c,d,e,f,g={}.hasOwnProperty,h=function(a,b){function d(){this.constructor=a}for(var c in b)g.call(b,c)&&(a[c]=b[c]);return d.prototype=b.prototype,a.prototype=new d,a.__super__=b.prototype,a};b=function(){function a(){var a,b,c,d;this.canvas=gl().size(700,700),this.x=0,this.y=0,this.width=this.canvas.width,this.height=this.canvas.height,a=0;while(!(a>100))a++,c=Math.random()*700,d=Math.random()*700,b=Math.random()*2+.5,this.canvas.context.fillPath(function(a){return a.color("#FFFFFF"),a.arc(c,d,b,0,Math.PI*2,!0)})}return a}(),c=function(){function a(a,b){this.angle=b,this.x=a.x,this.y=a.y,this.id=null,this.speed=400,this.radius=3,this.alive=!0,this.life=100}return a}(),f=function(){function a(){this.id=null,this.x=0,this.y=30,this.width=12,this.height=18,this.rotation=0,this.speed=5,this._path=[],this._wireframe=[],this.initPath()}return a.prototype.initPath=function(){return this._wireframe=[new nv.Point(0,-this.height/2),new nv.Point(this.width/2,this.height/2),new nv.Point(-this.width/2,this.height/2)],this._updatePath()},a.prototype._updatePath=function(){var a,b,c,d;return a=Math.cos(this.rotation),d=Math.sin(this.rotation),b=[],c=this,$.each(this._wireframe,function(){return b.push(new nv.Point(this.x*a-this.y*d+c.x,this.x*d+this.y*a+c.y))}),console.log(b[0].x,b[0].y,b[1].x,b[1].y,b[2].x,b[2].y),this._path=b},a.prototype.nose=function(){return this._path[0]},a.prototype.path=function(){return this._path},a.prototype.rotate=function(a){return this.rotation+=a,this._updatePath()},a.prototype.translate=function(a,b){return this.x+=a,this.y+=b,this._updatePath()},a}(),a=function(){function a(a,b){this.id=null,this.x=a*Math.random(),this.y=b*Math.random(),this.width=12,this.height=12,this.rotation=0,this.speed=Math.random()+.3,this.direction=Math.random()*Math.PI-Math.PI/2}return a}(),e=function(){function a(a){this.glcanvas=a,this.x=0,this.y=0,this.width=this.glcanvas.size().width,this.height=this.glcanvas.size().height,this.color="#FFF",this.lives=3,this.score=1e5}return a}(),d=function(a){function b(){this.title="Asteroids",this.actionText="Press <Space> to Start.",this.options={difficulty:"easy"}}return h(b,a),b}(nv.Model),$(function(){return nv.models={Background:b,Ship:f,Bullet:c,Asteroid:a,Hud:e,Global:d}})}.call(this),function(){var a,b,c,d,e={}.hasOwnProperty,f=function(a,b){function d(){this.constructor=a}for(var c in b)e.call(b,c)&&(a[c]=b[c]);return d.prototype=b.prototype,a.prototype=new d,a.__super__=b.prototype,a};b=function(a){function b(a,c){this.ship=a,this.glcanvas=c,b.__super__.constructor.apply(this,arguments),this.assets=[],this.shotDelay=10}return f(b,a),b.prototype.update=function(a,b){var c,e,f=this;return e=b.getState(),e.shoot&&this.shotDelay===0&&(console.log(this.ship.nose(),this.ship.rotation),c=new nv.models.Bullet(this.ship.nose(),this.ship.rotation),this.assets.push(c),$(document).trigger("new:bullet",{asset:c}),this.shotDelay=10),this.shotDelay&&this.shotDelay--,$.each(this.assets,function(b,c){c.x+=c.speed*Math.sin(c.angle)*a,c.y-=c.speed*Math.cos(c.angle)*a;if(c.x<-100||c.x>900)if(c.y<-100||c.y>900)c.alive=!1;return c.life--,c.life>0||(c.alive=!1),d(c,f.glcanvas)}),this.assets=this.assets.filter(function(a){return a.alive})},b}(nv.Controller),d=function(a,b){var c;c=b.size(),a.x<0?a.x=c.width:a.x>c.width&&(a.x=0);if(a.y<0)return a.y=c.height;if(a.y>c.height)return a.y=0},a=function(a){function b(a,c){this.assets=a,this.glcanvas=c,b.__super__.constructor.apply(this,arguments)}return f(b,a),b.prototype.update=function(a){var b=this;return $.each(this.assets,function(a,c){return c.x+=Math.sin(c.direction)*c.speed,c.y+=Math.cos(c.direction)*c.speed,d(c,b.glcanvas)})},b}(nv.Controller),c=function(a){function b(a,c){this.glcanvas=c,b.__super__.constructor.apply(this,arguments),this.speed=5,this.shootDelay=10}return f(b,a),b.prototype.update=function(a,b){var c;return c=b.getState(),c.left&&this.asset.rotate(-0.1),c.right&&this.asset.rotate(.1),c.up&&this.asset.translate(this.speed*Math.sin(this.asset.rotation),-this.speed*Math.cos(this.asset.rotation)),c.down&&this.asset.translate(-this.speed/2*Math.sin(this.asset.rotation),this.speed/2*Math.cos(this.asset.rotation)),d(this.asset,this.glcanvas)},b}(nv.Controller),$(function(){return nv.controllers={ShipController:c,BulletController:b,AsteroidController:a}})}.call(this),function(){var a,b,c,d,e,f,g={}.hasOwnProperty,h=function(a,b){function d(){this.constructor=a}for(var c in b)g.call(b,c)&&(a[c]=b[c]);return d.prototype=b.prototype,a.prototype=new d,a.__super__=b.prototype,a};b=function(a){function b(a,c){this.glcanvas=a,b.__super__.constructor.apply(this,arguments)}return h(b,a),b.prototype.draw=function(a,b){var c,d,e,f,g,h,i;c=-this.glcanvas.camera.x,d=-this.glcanvas.camera.y,g=c+(this.asset.x-c)%this.asset.width,h=d+(this.asset.y-d)%this.asset.height,g>c&&(g-=this.asset.width),h>d&&(h-=this.asset.height),e=g,f=h,i=[];while(e<c+this.glcanvas.width){while(f<d+this.glcanvas.height)a.drawImage(this.asset.canvas,e,f),f+=this.asset.height;f=h,i.push(e+=this.asset.width)}return i},b}(nv.ObjectRenderer),c=function(a){function b(a,c){var d=this;b.__super__.constructor.apply(this,arguments),$(document).on("new:bullet",function(a){return d.add(a.data.asset)})}return h(b,a),b.prototype.draw=function(a){return $.each(this.assets,function(b,c){var d=this;return a.fillPath(function(a){return a.color("#ff7600"),a.arc(c.x,c.y,c.radius,0,Math.PI*2,!0)})}),this.assets=this.assets.filter(function(a){return a.alive})},b}(nv.ObjectListRenderer),f=function(a){function b(a,c){b.__super__.constructor.apply(this,arguments),this.color="#FFF",this.strokeWidth=2}return h(b,a),b.prototype.draw=function(a){var b,c=this;return a.strokeColor(this.color),a.strokeWidth(this.strokeWidth),a.rotateAround(this.asset.x+this.asset.width/2,this.asset.y+this.asset.height/2,this.asset.rotation,function(){return a.line(c.asset.x,c.asset.y+c.asset.height,c.asset.x+c.asset.width/2,c.asset.y,c.asset.x+c.asset.width,c.asset.y+c.asset.height,c.asset.x,c.asset.y+c.asset.height)}),b=this.asset.path(),a.beginPath(),a.strokeColor("#929"),a.strokeWidth(10),a.moveTo(b[0].x,b[0].y),$.each(b,function(){return a.lineTo(this.x,this.y)}),a.lineTo(b[0].x,b[0].y),a.stroke(),a.closePath()},b}(nv.ObjectRenderer),a=function(a){function b(a,c){b.__super__.constructor.apply(this,arguments),this.color="#FFF",this.strokeWidth=2}return h(b,a),b.prototype.draw=function(a){var b=this;return $.each(this.assets,function(c,d){return a.fillPath(function(a){return a.color("rgba(0, 0, 0, 0)"),a.strokeColor(b.color),a.strokeWidth(2),a.line(d.x,d.y,d.x+30,d.y+20,d.x+35,d.y+50,d.x+23,d.y+60,d.x-10,d.y+50,d.x-20,d.y+15,d.x,d.y)})})},b}(nv.ObjectListRenderer),d=function(a){function b(a,c){this.glcanvas=a,b.__super__.constructor.apply(this,arguments),this.ship=new nv.models.Ship,this.shipRenderer=new nv.renderers.ShipRenderer(this.glcanvas,this.ship)}return h(b,a),b.prototype.draw=function(a){var b,c;a.strokeColor(this.color),a.strokeRect(this.asset.x,this.asset.y,this.asset.width,this.asset.height),a.fillStyle="#F00",a.font="italic bold 30px sans-serif",a.textBaseline="bottom",a.fillText("Asteroids",-this.glcanvas.camera.x+20,-this.glcanvas.camera.y+50),a.fillStyle="#FFF",a.font="bold 30px sans-serif",a.textBaseline="bottom",b=this.glcanvas.size(),a.fillText(this.asset.score,-this.glcanvas.camera.x+b.width-120,-this.glcanvas.camera.y+b.height-10),c=this.asset.lives;while(c--)this.ship.x=-this.glcanvas.camera.x+180+c*30,this.ship.y=-this.glcanvas.camera.y+25,this.shipRenderer.draw(a);return this},b}(nv.ObjectRenderer),e=function(a){function b(a,c){this.glcanvas=a,this.model=c,b.__super__.constructor.apply(this,arguments),this.title=new gl.text({color:"#F00",x:200,y:200,font:"bold 20px sans-serif",text:this.model.title}),this.actionText=new gl.text({color:"#F00",x:200,y:300,font:"bold 20px sans-serif",text:this.model.actionText})}return h(b,a),b.prototype.draw=function(a){return this.title.draw(a),this.actionText.draw(a)},b}(nv.ObjectRenderer),$(function(){return nv.renderers={ShipRenderer:f,BulletRenderer:c,BackgroundRenderer:b,AsteroidRenderer:a,HudRenderer:d,MainRenderer:e}})}.call(this),function(){var a,b,c={}.hasOwnProperty,d=function(a,b){function e(){this.constructor=a}for(var d in b)c.call(b,d)&&(a[d]=b[d]);return e.prototype=b.prototype,a.prototype=new e,a.__super__=b.prototype,a};b=function(a){function b(a,c,d){var e;this.glcanvas=a,this.gamepad=c,this.callback=d,b.__super__.constructor.apply(this,arguments),this.addModel("Global",(e=window.global)!=null?e:new nv.models.Global),this.addModel("Bg",new nv.models.Background),this.addModel("Bg2",new nv.models.Background),this.addRenderer(new nv.renderers.MainRenderer(this.glcanvas,this.getModel("Global"))),this.addRenderer(new nv.renderers.BackgroundRenderer(this.glcanvas,this.getModel("Bg"))),this.addRenderer(new nv.renderers.BackgroundRenderer(this.glcanvas,this.getModel("Bg2"))),this.glcanvas.camera=nv.camera(),this.glcanvas.startDrawUpdate(10,nv.bind(this,this.update))}return d(b,a),b.prototype.update=function(a){var b;b=this.gamepad.getState();if(b.shoot)return this.destroy()},b.prototype.destroy=function(){var a,b,c,d;d=this.renderers;for(b=0,c=d.length;b<c;b++)a=d[b],a.destroy();this.glcanvas.stopDrawUpdate();if(!!this.callback)return this.callback()},b}(nv.Scene),a=function(a){function b(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p=this;this.gamepad=b,this.bg=new nv.models.Background,this.bg2=new nv.models.Background,this.ship=new nv.models.Ship,c=new nv.models.Asteroid(500,500),d=new nv.models.Asteroid(500,500),e=new nv.models.Asteroid(500,500),l=new nv.models.Hud(a),f=new nv.controllers.AsteroidController([c,d,e],a),n=new nv.controllers.ShipController(this.ship,a),j=new nv.controllers.BulletController(this.ship,a),this.controllers=[j,f,n],i=new nv.renderers.BackgroundRenderer(a,this.bg,this.ship),h=new nv.renderers.BackgroundRenderer(a,this.bg2,this.ship),o=new nv.renderers.ShipRenderer(a,this.ship),g=new nv.renderers.AsteroidRenderer(a,[c,d,e]),m=new nv.renderers.HudRenderer(a,l),k=new nv.renderers.BulletRenderer(a,[]),this.renderers=[i,h,o,g,m,k],a.camera=nv.camera(),a.camera.follow(this.ship,250,250),a.camera.zoom(.5),a.camera.zoom(1,2e3),a.startDrawUpdate(60,function(a){return p.update.call(p,a)})}return d(b,a),b.prototype.update=function(a){var b,c,d,e;e=this.controllers;for(c=0,d=e.length;c<d;c++)b=e[c],b.update(a,this.gamepad);return this.bg.x=-this.ship.x*.05,this.bg.y=-this.ship.y*.05,this.bg2.x=-this.ship.x*.01,this.bg2.y=-this.ship.y*.01},b}(nv.Scene),$(function(){var c,d,e;return c=document.querySelector("canvas"),e=gl(c),c===void 0&&document.body.appendChild(e.canvas),e.size(500,500),e.background("#000"),e.fullscreen(),d=nv.gamepad(),d.aliasKey("left",nv.Key.A),d.aliasKey("right",nv.Key.D),d.aliasKey("up",nv.Key.W),d.aliasKey("down",nv.Key.S),d.aliasKey("shoot",nv.Key.Spacebar),new b(e,d,function(){return new a(e,d)})})}.call(this)