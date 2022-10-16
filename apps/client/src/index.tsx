import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { App } from '@/components/app';
import { setupStore } from '@/store';

import registerServiceWorker from './swRegistration';

const store = setupStore();

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root'),
);

registerServiceWorker();
