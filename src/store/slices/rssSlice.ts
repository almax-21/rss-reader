import { getRSSFeed } from '../async-actions/getRSSFeed';
import { RssFeedData, RssState } from '../types';
import { createSlice,PayloadAction } from '@reduxjs/toolkit';

const initialState: RssState = {
	isLoading: false,
	isSuccessfullyLoaded: false,
	error: '',
	urls: [],
	feeds: {},
	posts: [],
	allIds: [],
};

const rssSlice = createSlice({
	name: 'rss',
	initialState,
	reducers: {},
	extraReducers: {
		[getRSSFeed.pending.type]: (state) => {
			state.isLoading = true;
			state.isSuccessfullyLoaded = false;
			state.error = '';
		},
		[getRSSFeed.fulfilled.type]: (
			state,
			action: PayloadAction<RssFeedData>
		) => {
			const { id, title, description, posts, url } = action.payload;

			state.isLoading = false;
			state.isSuccessfullyLoaded = true;

			state.urls = [...state.urls, url];
			state.feeds[id] = { id, title, description };
			state.posts = [...posts, ...state.posts];
			state.allIds = [id, ...state.allIds];
		},
		[getRSSFeed.rejected.type]: (state, action: PayloadAction<string>) => {
			state.isLoading = false;
			state.error = action.payload;
		},
	},
});

export default rssSlice;
