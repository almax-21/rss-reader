import { loadingBarReducer } from 'react-redux-loading-bar';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';

import userAPI from '../services/UserService';

import feedsReducer from './slices/feedsSlice';
import notificationReducer from './slices/notificationSlice';
import postsReducer from './slices/postsSlice';
import rssMetaReducer from './slices/rssMetaSlice';
import settingsReducer from './slices/settingsSlice';
import userReducer from './slices/userSlice';

export const rootReducer = combineReducers({
	user: userReducer,
	[userAPI.reducerPath]: userAPI.reducer,
	settings: settingsReducer,
	rssMeta: rssMetaReducer,
	feeds: feedsReducer,
	posts: postsReducer,
	notification: notificationReducer,
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
