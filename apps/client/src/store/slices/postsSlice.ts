import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IPost } from '../../models/IPost';
import { NewPostsData, PostIdData } from '../../types';
import deleteFeed from '../async-actions/deleteFeed';
import getDataFromApi from '../async-actions/getAllContentFromApi';
import getContentFromRssSource from '../async-actions/getContentFromRssSource';
import setAllActivePostsRead from '../async-actions/setAllActivePostsRead';
import setPostRead from '../async-actions/setPostRead';
import updatePostsData from '../async-actions/updatePostsData';
import {
	ApiContentData,
	ApiFeedData,
	POST_STATES,
	POST_TYPE,
	PostsState,
} from '../types';

import { logoutUser } from './userSlice';

const initialState: PostsState = {
	byFeedId: {},
	filter: {
		state: POST_STATES.ALL,
		query: '',
	},
};

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		switchFilterState: (state, action: PayloadAction<POST_TYPE>) => {
			state.filter.state = action.payload;
		},
		updateFilterQuery: (state, action: PayloadAction<string>) => {
			state.filter.query = action.payload;
		},
	},
	extraReducers: {
		[getDataFromApi.fulfilled.type]: (
			state,
			action: PayloadAction<ApiContentData>
		) => {
			const { posts } = action.payload;

			posts.reverse().forEach((post: IPost) => {
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
		[updatePostsData.fulfilled.type]: (
			state,
			action: PayloadAction<NewPostsData>
		) => {
			const { feedId, newPosts } = action.payload;

			state.byFeedId[feedId].unshift(...newPosts.reverse());
		},
		[deleteFeed.fulfilled.type]: (state, action: PayloadAction<string>) => {
			delete state.byFeedId[action.payload];
		},
		[logoutUser.type]: (state) => {
			state.byFeedId = {};
			state.filter = {
				state: POST_STATES.ALL,
				query: '',
			};
		},
	},
});

export const { switchFilterState, updateFilterQuery } = postsSlice.actions;

export default postsSlice.reducer;
