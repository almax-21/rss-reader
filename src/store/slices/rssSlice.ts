import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NewPostsData, PostIDs } from '../../types';
import { getRSSData } from '../async-actions/getRSSData';
import updatePostsData from '../async-actions/updatePostsData';
import {
	FEED_LOADED_STATES,
	POST_STATES,
	POST_TYPE,
	RSSData,
	RssState,
} from '../types';

const initialState: RssState = {
	isLoading: false,
	feedLoadedState: FEED_LOADED_STATES.NULL,
	errorMessage: '',
	feeds: {
		entities: {},
		ids: [],
		activeFeedId: null,
	},
	posts: {
		byFeedId: {},
		filter: {
			state: POST_STATES.ALL,
			query: '',
		},
	},
	urlDataset: [],
};

const rssSlice = createSlice({
	name: 'rss',
	initialState,
	reducers: {
		updateActiveFeed: (state, action: PayloadAction<string>) => {
			state.feeds.activeFeedId = action.payload;
		},
		deleteFeed: (state, action: PayloadAction<string>) => {
			const newFeedIDs = state.feeds.ids.filter((id) => id !== action.payload);

			if (state.feeds.activeFeedId === action.payload) {
				state.feeds.activeFeedId = newFeedIDs[0] ?? null;
			}

			state.feeds.ids = newFeedIDs;
			state.urlDataset = state.urlDataset.filter(
				({ feedId }) => feedId !== action.payload
			);

			delete state.feeds.entities[action.payload];
			delete state.posts.byFeedId[action.payload];
		},
		setPostRead: (state, action: PayloadAction<PostIDs>) => {
			const { id, feedId } = action.payload;

			state.posts.byFeedId[feedId] = state.posts.byFeedId[feedId].map(
				(post) => {
					return post.id === id ? { ...post, state: POST_STATES.READ } : post;
				}
			);
		},
		switchFilterState: (state, action: PayloadAction<POST_TYPE>) => {
			state.posts.filter.state = action.payload;
		},
		updateFilterQuery: (state, action: PayloadAction<string>) => {
			state.posts.filter.query = action.payload;
		},
	},
	extraReducers: {
		[getRSSData.pending.type]: (state) => {
			state.isLoading = true;
			state.feedLoadedState = FEED_LOADED_STATES.NULL;
			state.errorMessage = '';
		},
		[getRSSData.fulfilled.type]: (state, action: PayloadAction<RSSData>) => {
			const { feed, posts } = action.payload;

			state.isLoading = false;
			state.feedLoadedState = FEED_LOADED_STATES.SUCCESS;

			state.feeds.entities[feed.id] = feed;
			state.feeds.ids = [feed.id, ...state.feeds.ids];

			state.feeds.activeFeedId = feed.id;

			state.posts.byFeedId[feed.id] = posts;

			const feedUrlData = { feedId: feed.id, url: feed.url };
			state.urlDataset.push(feedUrlData);
		},
		[getRSSData.rejected.type]: (state, action: PayloadAction<string>) => {
			state.isLoading = false;
			state.feedLoadedState = FEED_LOADED_STATES.ERROR;
			state.errorMessage = action.payload;
		},
		[updatePostsData.fulfilled.type]: (
			state,
			action: PayloadAction<NewPostsData>
		) => {
			const { feedId, newPosts } = action.payload;

			state.posts.byFeedId[feedId].unshift(...newPosts);
		},
	},
});

export const {
	updateActiveFeed,
	deleteFeed,
	setPostRead,
	switchFilterState,
	updateFilterQuery,
} = rssSlice.actions;

export default rssSlice.reducer;
