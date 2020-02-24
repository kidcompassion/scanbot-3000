import React from 'react';
import { WithAppContext } from '../WithAppContext';
import CameraSensor from './CameraSensor';
import CameraFeedback from './CameraFeedback';

const WithSensorContext = WithAppContext(CameraSensor);




class CameraUI extends React.Component{


	render(){
		return(
			<div className="component--cameraui container">
				
					<CameraFeedback />
				
				
					<WithSensorContext />
				
			</div>
		)
	}

}

export default CameraUI;