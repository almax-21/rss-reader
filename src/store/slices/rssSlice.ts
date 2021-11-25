import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PostIDs } from '../../types';
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
	activeFeedId: null,
	postsByFeedId: {},
	urlDataColl: [],
};

const rssSlice = createSlice({
	name: 'rss',
	initialState,
	reducers: {
		setPostRead: (state, action: PayloadAction<PostIDs>) => {
			const { id, feedId } = action.payload;

			state.postsByFeedId[feedId] = state.postsByFeedId[feedId].map((post) => {
				return post.id === id ? { ...post, isRead: true } : post;
			});
		},
		updateActiveFeed: (state, action: PayloadAction<string>) => {
			state.activeFeedId = action.payload;
		},
		deleteFeed: (state, action: PayloadAction<string>) => {
			delete state.feeds.entities[action.payload];
			const newFeedIDs = state.feeds.ids.filter((id) => id !== action.payload);
			state.feeds.ids = newFeedIDs;

			delete state.postsByFeedId[action.payload];

			state.urlDataColl = state.urlDataColl.filter(
				({ feedId }) => feedId !== action.payload
			);

			if (state.activeFeedId === action.payload) {
				state.activeFeedId = newFeedIDs[0] ?? null;
			}
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

			state.activeFeedId = feed.id;

			state.postsByFeedId[feed.id] = posts;

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

export const { setPostRead, updateActiveFeed, deleteFeed } = rssSlice.actions;

export default rssSlice.reducer;
