import { loadingBarReducer } from 'react-redux-loading-bar';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';

import userAPI from '../services/UserService';

import feedsReducer from './slices/feedsSlice';
import localeReducer from './slices/localeSlice';
import postsReducer from './slices/postsSlice';
import rssReducer from './slices/rssSlice';
import userReducer from './slices/userSlice';

export const rootReducer = combineReducers({
	locale: localeReducer,
	user: userReducer,
	rss: rssReducer,
	feeds: feedsReducer,
	posts: postsReducer,
	[userAPI.reducerPath]: userAPI.reducer,
	loadingBar: loadingBarReducer,
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(userAPI.middleware),
		devTools: true,
	});
};