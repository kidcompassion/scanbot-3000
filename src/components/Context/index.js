import  React, { Component } from 'react';

export const AppContext = React.createContext('app');

export class AppProvider extends Component {
	constructor(props){
		super(props);

		this.state = {
			cameraApproved:false,
			availableDevices: [],
			actions:{
				getAvailableDevices: this.getAvailableDevices,
				getUserMedia: this.getUserMedia
			}

		}

	}


	getAvailableDevices = () => {

		navigator.mediaDevices.enumerateDevices()
			.then((stream)=>{
				console.log(stream);
			})
			.catch((err)=>{
				console.log(err);

			})
	}

	getUserMedia = () => {
		//https://stackoverflow.com/questions/57095478/html5-getusermedia-cannot-set-property-srcobject-of-null
		const mediaType = {video: { width: 1280, height: 720 }};
		navigator.mediaDevices.getUserMedia(mediaType)
			.then(stream => this.videoTag.current.srcObject = stream)
    		.catch(console.log);
	}





	render(){
		return(
			<AppContext.Provider
				value={{
					state:this.state
				}}
			>{this.props.children}
			</AppContext.Provider>
			)
	}

}
