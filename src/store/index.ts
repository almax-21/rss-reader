import { loadingBarReducer } from 'react-redux-loading-bar';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';

import feedsReducer from './slices/feedsSlice';
import localeReducer from './slices/localeSlice';
import postsReducer from './slices/postsSlice';
import rssReducer from './slices/rssSlice';

export const rootReducer = combineReducers({
	locale: localeReducer,
	loadingBar: loadingBarReducer,
	rss: rssReducer,
	feeds: feedsReducer,
	posts: postsReducer,
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		devTools: true,
	});
};
