import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getRSSFeed } from '../async-actions/getRSSFeed';
import { FEED_LOADED_STATE, RSSFeedData, RssState } from '../types';

const initialState: RssState = {
	isLoading: false,
	feedLoadedState: FEED_LOADED_STATE.NULL,
	errorMessage: '',
	urls: [],
	feeds: {},
	posts: [],
	allFeedIds: [],
};

const rssSlice = createSlice({
	name: 'rss',
	initialState,
	reducers: {},
	extraReducers: {
		[getRSSFeed.pending.type]: (state) => {
			state.isLoading = true;
			state.feedLoadedState = FEED_LOADED_STATE.NULL;
			state.errorMessage = '';
		},
		[getRSSFeed.fulfilled.type]: (
			state,
			action: PayloadAction<RSSFeedData>
		) => {
			const { id, title, description, posts, url } = action.payload;

			state.isLoading = false;
			state.feedLoadedState = FEED_LOADED_STATE.SUCCESS;

			state.urls = [...state.urls, url];
			state.feeds[id] = { id, title, description };
			state.posts = [...posts, ...state.posts];
			state.allFeedIds = [id, ...state.allFeedIds];
		},
		[getRSSFeed.rejected.type]: (state, action: PayloadAction<string>) => {
			state.isLoading = false;
			state.feedLoadedState = FEED_LOADED_STATE.ERROR;
			state.errorMessage = action.payload;
		},
	},
});

export default rssSlice;
