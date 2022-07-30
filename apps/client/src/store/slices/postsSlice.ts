import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { Post } from '@/models/Post';
import type { NewPostsData, PostIdData, SORT_TYPE } from '@/types';
import { SORTS } from '@/types';

import {
	deleteFeed,
	getAllContentFromApi,
	getContentFromRssSource,
	reloadFeed,
	setAllActivePostsRead,
	setPostRead,
	updateFeedsData,
} from '../async-actions';
import type {
	ApiContentData,
	ApiFeedData,
	POST_STATE_TYPE,
	PostsState} from '../types';
import {
	POST_STATES
} from '../types';

import { logoutUser } from './userSlice';

const initialState: PostsState = {
	byFeedId: {},
	filter: {
		query: '',
		state: POST_STATES.ALL,
		sortType: SORTS.NEW_FIRST,
	},
};

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		updateFilterQuery: (state, action: PayloadAction<string>) => {
			state.filter.query = action.payload;
		},
		switchSortType: (state, action: PayloadAction<SORT_TYPE>) => {
			state.filter.sortType = action.payload;
		},
		switchFilterState: (state, action: PayloadAction<POST_STATE_TYPE>) => {
			state.filter.state = action.payload;
		},
	},
	extraReducers: {
		[getAllContentFromApi.fulfilled.type]: (
			state,
			action: PayloadAction<ApiContentData>
		) => {
			const { posts } = action.payload;

			posts.reverse().forEach((post: Post) => {
				const { feedId } = post;

				state.byFeedId[feedId] = state.byFeedId[feedId] ?? [];

				state.byFeedId[feedId].push(post);
			});
		},
		[getContentFromRssSource.fulfilled.type]: (
			state,
			action: PayloadAction<ApiFeedData>
		) => {
			const { feed, posts } = action.payload;

			state.byFeedId[feed._id] = posts.reverse();
		},
		[setPostRead.fulfilled.type]: (
			state,
			action: PayloadAction<PostIdData>
		) => {
			const { _id, feedId } = action.payload;

			state.byFeedId[feedId] = state.byFeedId[feedId].map((post) => {
				return post._id === _id ? { ...post, state: POST_STATES.READ } : post;
			});
		},
		[setAllActivePostsRead.fulfilled.type]: (
			state,
			action: PayloadAction<string>
		) => {
			const activeFeedId = action.payload;

			state.byFeedId[activeFeedId] = state.byFeedId[activeFeedId].map(
				(post) => ({ ...post, state: POST_STATES.READ })
			);
		},
		[updateFeedsData.fulfilled.type]: (
			state,
			action: PayloadAction<NewPostsData>
		) => {
			const { feedId, newPosts } = action.payload;

			state.byFeedId[feedId].unshift(...newPosts.reverse());
		},
		[reloadFeed.fulfilled.type]: (
			state,
			action: PayloadAction<NewPostsData>
		) => {
			const { feedId, newPosts } = action.payload;

			state.byFeedId[feedId] = newPosts.reverse();
		},
		[deleteFeed.fulfilled.type]: (state, action: PayloadAction<string>) => {
			delete state.byFeedId[action.payload];
		},
		[logoutUser.type]: (state) => {
			state.byFeedId = {};
			state.filter = {
				query: '',
				state: POST_STATES.ALL,
				sortType: SORTS.NEW_FIRST,
			};
		},
	},
});

export const { updateFilterQuery, switchSortType, switchFilterState } =
	postsSlice.actions;

export default postsSlice.reducer;
