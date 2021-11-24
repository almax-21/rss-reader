import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getRSSData } from '../async-actions/getRSSData';
import { FEED_LOADED_STATE, RSSData, RssState } from '../types';

const initialState: RssState = {
	isLoading: false,
	feedLoadedState: FEED_LOADED_STATE.NULL,
	errorMessage: '',
	feeds: {
		entities: {},
		ids: [],
	},
	allPosts: [],
	urlDataColl: [],
};

const rssSlice = createSlice({
	name: 'rss',
	initialState,
	reducers: {
		setPostRead: (state, action: PayloadAction<string>) => {
			state.allPosts = state.allPosts.map((post) => {
				return post.id === action.payload ? { ...post, isRead: true } : post;
			});
		},
		deleteFeed: (state, action: PayloadAction<string>) => {
			delete state.feeds.entities[action.payload];
			state.feeds.ids = state.feeds.ids.filter((id) => id !== action.payload);

			state.allPosts = state.allPosts.filter(
				({ feedId }) => feedId !== action.payload
			);

			state.urlDataColl = state.urlDataColl.filter(
				({ feedId }) => feedId !== action.payload
			);
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

			const feedUrlData = { feedId: feed.id, url: feed.url };
			state.urlDataColl.push(feedUrlData);
		},
		[getRSSData.rejected.type]: (state, action: PayloadAction<string>) => {
			state.isLoading = false;
			state.feedLoadedState = FEED_LOADED_STATE.ERROR;
			state.errorMessage = action.payload;
		},
	},
});

export const { setPostRead, deleteFeed } = rssSlice.actions;

export default rssSlice.reducer;
