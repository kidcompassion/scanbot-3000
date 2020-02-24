import React from 'react';
import { AppContext } from './components/Context';

export function WithAppContext(Component){
	return function WrapperComponent(props) {
        return (
            <AppContext.Consumer>
                {context => <Component {...props} context={context} />}
            </AppContext.Consumer>
        );
    };
}


