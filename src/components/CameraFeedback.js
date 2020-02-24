import React from 'react';

class CameraFeedback extends React.Component{
	render(){
		return(
			<div className="alert alert-primary" role="alert">
				Please allow the browser to user your camera
			</div>
		);
	}
}

export default CameraFeedback;