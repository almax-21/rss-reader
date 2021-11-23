import { loadingBarReducer } from 'react-redux-loading-bar';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';

import localeReducer from './slices/localeSlice';
import rssReducer from './slices/rssSlice';

export const rootReducer = combineReducers({
	locale: localeReducer,
	loadingBar: loadingBarReducer,
	rss: rssReducer,
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		devTools: true,
	});
};
