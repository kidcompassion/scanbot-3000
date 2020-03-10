(this["webpackJsonpscanbot-3000"]=this["webpackJsonpscanbot-3000"]||[]).push([[0],{10:function(e,t,a){e.exports=a(17)},15:function(e,t,a){},16:function(e,t,a){},17:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),s=a(9),c=a.n(s),r=(a(15),a(2)),l=a(3),i=a(6),u=a(4),d=a(5),m=o.a.createContext("app");n.Component;var h,f=a(7),p=a(1),b=a.n(p),g=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).videoOn=function(){navigator.mediaDevices.getUserMedia({video:{width:1280,height:720},facingMode:"environment"}).then((function(e){a.videoTag.current.srcObject=e,a.setState({localstream:e})})).catch(console.log)},a.takeSnapshot=function(){var e,t=Object(f.a)(a),n=document.querySelector("img")||document.createElement("img"),o=document.querySelector("video"),s=o.offsetWidth,c=o.offsetHeight,r=document.querySelector(".snapshot");(e=e||document.createElement("canvas")).width=s,e.height=c,e.getContext("2d").drawImage(o,0,0,s,c),n.src=e.toDataURL("image/jpeg",1),r.appendChild(n),n.getAttribute("src"),b.a.init({inputStream:{name:"Live",type:"LiveStream",target:document.querySelector("#scanner-container"),constraints:{width:480,height:320,facingMode:"environment"}},decoder:{readers:["code_39_reader","code_128_reader","ean_reader","ean_8_reader","code_39_vin_reader","codabar_reader","upc_reader","upc_e_reader","i2of5_reader"],debug:{showCanvas:!0,showPatches:!0,showFoundPatches:!0,showSkeleton:!0,showLabels:!0,showPatchLabels:!0,showRemainingPatchLabels:!0,boxFromPatches:{showTransformed:!0,showTransformedBox:!0,showBB:!0}}}},(function(e){e?console.log(e):(console.log("Initialization finished. Ready to start"),b.a.start(),t.setState({scannerIsRunning:!0}))})),b.a.onProcessed((function(e){var t=b.a.canvas.ctx.overlay,a=b.a.canvas.dom.overlay;void 0!==e&&(e.boxes&&(t.clearRect(0,0,parseInt(a.getAttribute("width")),parseInt(a.getAttribute("height"))),e.boxes.filter((function(t){return t!==e.box})).forEach((function(e){b.a.ImageDebug.drawPath(e,{x:0,y:1},t,{color:"green",lineWidth:2})}))),e.box&&b.a.ImageDebug.drawPath(e.box,{x:0,y:1},t,{color:"#00F",lineWidth:2}),e.codeResult&&e.codeResult.code&&b.a.ImageDebug.drawPath(e.line,{x:"x",y:"y"},t,{color:"red",lineWidth:3}))})),b.a.onDetected((function(e){document.querySelector(".component--sensor").style.display="none",document.querySelector(".snapshot img").style.display="block",t.setState({scanResults:e}),console.log(t.state),b.a.stop()}))},a.videoOff=function(){a.state.localstream.getTracks()[0].stop(),console.log("Vid off"),b.a.stop()},a.state={localstream:null,videoStream:null,scannerIsRunning:!1,scanResults:null},a.videoTag=o.a.createRef(),a.takeSnapshot=a.takeSnapshot.bind(Object(f.a)(a)),a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-12 col-md-6"},o.a.createElement("div",{id:"interactive",className:"viewport snapshot"},o.a.createElement("video",{className:"component--sensor",ref:this.videoTag,autoPlay:!0}),o.a.createElement("div",{className:"imgSnapshot"})),o.a.createElement("div",{className:"col-12 mt-4 text-center"},o.a.createElement("button",{className:"btn btn-info",onClick:this.takeSnapshot},"Take snapshot"),o.a.createElement("button",{className:"btn btn-danger ml-2",onClick:this.videoOff},"Turn off camera"))),o.a.createElement("div",{className:"col-12 col-md-6 pt-4"},o.a.createElement("h2",null,"Results"),this.state.scanResults?o.a.createElement("p",null,"Code: ",this.state.scanResults.codeResult.code):"",this.state.scanResults?o.a.createElement("p",null,"Format: ",this.state.scanResults.codeResult.format):"",this.state.scanResults?o.a.createElement("p",null,"Start: ",this.state.scanResults.codeResult.start):"",this.state.scanResults?o.a.createElement("p",null,"End: ",this.state.scanResults.codeResult.end):""))}}]),t}(o.a.Component),v=function(e){function t(){return Object(r.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"alert alert-primary text-center",role:"alert"},"Please allow the browser to user your camera")}}]),t}(o.a.Component),w=(h=g,function(e){return o.a.createElement(m.Consumer,null,(function(t){return o.a.createElement(h,Object.assign({},e,{context:t}))}))}),y=function(e){function t(){return Object(r.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"component--cameraui container"},o.a.createElement(v,null),o.a.createElement(w,null))}}]),t}(o.a.Component);a(16);var E=function(){return o.a.createElement("div",{className:"App"},o.a.createElement(y,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(E,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[10,1,2]]]);
//# sourceMappingURL=main.84216758.chunk.js.map