import React from 'react';
import Quagga from 'quagga';


class CameraSensor extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			localstream: null,
			videoStream: null,
			scannerIsRunning: false
		}
		// This sets up a spot for the triggered video stream to show
		this.videoTag = React.createRef()
	}

	/**
	 * videoOn
	 * Grab the camera stream
	 */
	videoOn = () =>{
		const mediaType = {video: { width: 1280, height: 720 }}; // Preferred capture size
		
		// Get user media is the HTML5 api that lets us use the camera
		navigator.mediaDevices.getUserMedia(mediaType)
			.then(stream => {
					this.videoTag.current.srcObject = stream
					this.setState({
						'localstream': stream,
					});
				})
    		.catch(console.log);
	}


	/**
	 * takeSnapshot
	 * Renders screencap from video stream to page
	 */
	takeSnapshot = () => {
		// https://gist.github.com/anantn/1852070
		const img = document.querySelector('img') || document.createElement('img');
		const video = document.querySelector('video');
		const width = video.offsetWidth
		const height = video.offsetHeight;
		let imgResult = null;

       	const snapShotReview = document.querySelector('.snapshot');
		let canvas;
		 canvas = canvas || document.createElement('canvas');
		canvas.width = width;
		canvas.height = height;

		const context = canvas.getContext('2d');
		context.drawImage(video, 0, 0, width, height);

		img.src = canvas.toDataURL('image/jpeg', 1.0);
		
		snapShotReview.appendChild(img);	
		
		imgResult = img.getAttribute('src');
	 
		  console.log(img.getAttribute('src'));
		  

		// TO DO Break Quagga functionality into it's own method once we know it works

		Quagga.init({
			inputStream : {
				name : "Live",
				type : "LiveStream",
				 // Or '#yourElement' (optional)
				target: document.querySelector('#interactive') 
			},
			decoder : {
				readers : ["code_128_reader"]
			}
		}, function(err) {
			if (err) {
				console.log(err);
				return
			}
			console.log("Initialization finished. Ready to start");
			Quagga.start();
			/*this.setState({
				scannerIsRunning: true
			});*/
		});

		Quagga.onProcessed(function (result) {
			var drawingCtx = Quagga.canvas.ctx.overlay,
			drawingCanvas = Quagga.canvas.dom.overlay;

			if (result) {
				if (result.boxes) {
					drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
					result.boxes.filter(function (box) {
						return box !== result.box;
					}).forEach(function (box) {
						Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: "green", lineWidth: 2 });
					});
				}

				if (result.box) {
					Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#00F", lineWidth: 2 });
				}

				if (result.codeResult && result.codeResult.code) {
					Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
				}
			}
		});


		Quagga.onDetected(function (result) {
			console.log("Barcode detected and processed : [" + result.codeResult.code + "]", result);
		});
	




	}



	decodeBar = () => {
		Quagga.decodeSingle({
			decoder: {
				readers: ["code_128_reader"] // List of active readers
			},
			locate: true, // try to locate the barcode in the image
			// You can set the path to the image in your server
			// or using it's base64 data URI representation data:image/jpg;base64, + data
			src: '/barcode_image.jpg'
		}, function(result){
			if(result.codeResult) {
				console.log("result", result.codeResult.code);
			} else {
				console.log("not detected");
			}
		});

	}


	/**
	 * videoOff
	 * Turns off the camera
	 */
	videoOff = () => {
		  this.state.localstream.getTracks()[0].stop();
		  console.log("Vid off");


		  //TO DO put quagga stop into dedicated method once we know it works
		  Quagga.stop();
	}


	render(){
		return(
			<div className="row">
				<div className = "col-6">
					
				
				<div id="interactive" className="viewport snapshot">
				<video 
						className="component--sensor"
				        ref={this.videoTag}
				        autoPlay
				      	/>
				</div>
				</div>
				<div className = "col-8 mx-auto">
					<button onClick={this.videoOn}>
						Turn on Camera
					</button>

					<button onClick={this.takeSnapshot}>
						Take snapshot
					</button>

					<button onClick={this.videoOff}>
						Turn off camera
					</button>
				</div>
			</div>
			)
	}
}

export default CameraSensor;