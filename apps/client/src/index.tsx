import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import 'regenerator-runtime/runtime';

import { App } from './components/App';
import { setupStore } from './store';
import registerServiceWorker from './swRegistration';

const store = setupStore();

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('react-root')
);

registerServiceWorker();
