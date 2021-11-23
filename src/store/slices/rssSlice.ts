import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RSSData } from '../../types';
import { getRSSData } from '../async-actions/getRSSData';
import { FEED_LOADED_STATE, RssState } from '../types';

const initialState: RssState = {
	isLoading: false,
	feedLoadedState: FEED_LOADED_STATE.NULL,
	errorMessage: '',
	feeds: {
		entities: {},
		ids: [],
	},
	allPosts: [],
	urls: [],
};

const rssSlice = createSlice({
	name: 'rss',
	initialState,
	reducers: {
		setPostRead: (state, action: PayloadAction<string>) => {
			state.allPosts = state.allPosts.map((post) => {
				return post.id === action.payload
					? { ...post, isRead: true }
					: post;
			});
		},
	},
	extraReducers: {
		[getRSSData.pending.type]: (state) => {
			state.isLoading = true;
			state.feedLoadedState = FEED_LOADED_STATE.NULL;
			state.errorMessage = '';
		},
		[getRSSData.fulfilled.type]: (state, action: PayloadAction<RSSData>) => {
			const { feed, posts } = action.payload;

			state.isLoading = false;
			state.feedLoadedState = FEED_LOADED_STATE.SUCCESS;

			state.feeds.entities[feed.id] = feed;
			state.feeds.ids = [feed.id, ...state.feeds.ids];

			state.allPosts = [...posts, ...state.allPosts];

			state.urls.push(feed.url);
		},
		[getRSSData.rejected.type]: (state, action: PayloadAction<string>) => {
			state.isLoading = false;
			state.feedLoadedState = FEED_LOADED_STATE.ERROR;
			state.errorMessage = action.payload;
		},
	},
});

export const { setPostRead } = rssSlice.actions;

export default rssSlice.reducer;
