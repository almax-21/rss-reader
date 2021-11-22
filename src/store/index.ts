import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';

import localeSlice from './slices/localeSlice';
import rssSlice from './slices/rssSlice';

export const rootReducer = combineReducers({
	locale: localeSlice.reducer,
	rss: rssSlice.reducer,
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		devTools: true,
	});
};
