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
		this.takeSnapshot = this.takeSnapshot.bind(this);
	}

	/**
	 * videoOn
	 * Grab the camera stream
	 */
	videoOn = () =>{
		const mediaType = {
							video: { 
								width: 1280, 
								height: 720 
							},
							facingMode: { 
								exact: 'environment'
							}
						}; // Preferred capture size
		
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
		const currComponent = this;
		
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
	 
		 // console.log(img.getAttribute('src'));
		  

		// TO DO Break Quagga functionality into it's own method once we know it works

		
				Quagga.init({
					inputStream: {
						name: "Live",
						type: "LiveStream",
						target: document.querySelector('#scanner-container'),
						constraints: {
							width: 480,
							height: 320,
							facingMode: "environment"
						},
					},
					decoder: {
						readers: [
							"code_128_reader",
							"ean_reader",
							"ean_8_reader",
							"code_39_reader",
							"code_39_vin_reader",
							"codabar_reader",
							"upc_reader",
							"upc_e_reader",
							"i2of5_reader"
						],
						debug: {
							showCanvas: true,
							showPatches: true,
							showFoundPatches: true,
							showSkeleton: true,
							showLabels: true,
							showPatchLabels: true,
							showRemainingPatchLabels: true,
							boxFromPatches: {
								showTransformed: true,
								showTransformedBox: true,
								showBB: true
							}
						}
					},
	
				}, function (err) {
					if (err) {
						console.log(err);
						return
					}
	
					console.log("Initialization finished. Ready to start");
					Quagga.start();
	
					// Set flag to is running
					currComponent.setState({
						scannerIsRunning:true
					});
				});
	
				Quagga.onProcessed(function (result) {
					//console.log('does this ever fire'); //loop
					var drawingCtx = Quagga.canvas.ctx.overlay,
					drawingCanvas = Quagga.canvas.dom.overlay;
					//console.log(result);
					if (result !== undefined) {
						if (result.boxes) {
							drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
							result.boxes.filter(function (box) {
								return box !== result.box;
							}).forEach(function (box) {
								Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: "green", lineWidth: 2 });
							});
						}
	
						if (result.box) {
							//console.log('resultbox', result.box);
							Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#00F", lineWidth: 2 });
						}
	
						if (result.codeResult && result.codeResult.code) {
							//console.log('coderesult', result);
							Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
						}
					}
				});
	
	
				Quagga.onDetected(function (result) {
					document.querySelector('.component--sensor').style.display = 'none';
					document.querySelector('.snapshot img').style.display = 'block';
					//console.log('how about does this ever fire');
					console.log("Barcode detected and processed : [" + result.codeResult.code + "]", result);
					Quagga.stop();
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
								<div className="imgSnapshot"></div>
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