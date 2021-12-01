import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NewPostsData, PostIdData } from '../../types';
import { getRSSData } from '../async-actions/getRSSData';
import updatePostsData from '../async-actions/updatePostsData';
import { POST_STATES, POST_TYPE, PostsState, RSSData } from '../types';

import { deleteFeed } from './feedsSlice';

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
		setPostRead: (state, action: PayloadAction<PostIdData>) => {
			const { id, feedId } = action.payload;

			state.byFeedId[feedId] = state.byFeedId[feedId].map((post) => {
				return post.id === id ? { ...post, state: POST_STATES.READ } : post;
			});
		},
		setAllActivePostsRead: (state, action: PayloadAction<string>) => {
			const activeFeedId = action.payload;

			state.byFeedId[activeFeedId] = state.byFeedId[activeFeedId].map(
				(post) => ({ ...post, state: POST_STATES.READ })
			);
		},
		switchFilterState: (state, action: PayloadAction<POST_TYPE>) => {
			state.filter.state = action.payload;
		},
		updateFilterQuery: (state, action: PayloadAction<string>) => {
			state.filter.query = action.payload;
		},
	},
	extraReducers: {
		[getRSSData.fulfilled.type]: (state, action: PayloadAction<RSSData>) => {
			const { feed, posts } = action.payload;

			state.byFeedId[feed.id] = posts;
		},
		[updatePostsData.fulfilled.type]: (
			state,
			action: PayloadAction<NewPostsData>
		) => {
			const { feedId, newPosts } = action.payload;

			state.byFeedId[feedId].unshift(...newPosts);
		},
		[deleteFeed.type]: (state, action: PayloadAction<string>) => {
			delete state.byFeedId[action.payload];
		},
	},
});

export const {
	setPostRead,
	setAllActivePostsRead,
	switchFilterState,
	updateFilterQuery,
} = postsSlice.actions;

export default postsSlice.reducer;
