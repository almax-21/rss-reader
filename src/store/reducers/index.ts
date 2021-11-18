import { combineReducers } from '@reduxjs/toolkit';
import localeSlice from './localeSlice';
import rssSlice from './rssSlice';

const rootReducer = combineReducers({
	locale: localeSlice.reducer,
	rss: rssSlice.reducer,
});

export default rootReducer;
