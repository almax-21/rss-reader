import { combineReducers } from '@reduxjs/toolkit';
import rssSlice from './rssSlice';

const rootReducer = combineReducers({
  rss: rssSlice.reducer,
});

export default rootReducer;
