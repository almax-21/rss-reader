import localeSlice from './slices/localeSlice';
import rssSlice from './slices/rssSlice';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';

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
