import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from './store/store';
import './index.scss';

export const store = configureStore();

ReactDOM.render(
	<React.Fragment>
		<Provider store={store}>
			<App />
		</Provider>
	</React.Fragment>,
	document.getElementById('root')
);
