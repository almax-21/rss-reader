import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import {
	deleteFeed,
	getAllContentFromApi,
	getContentFromRssSource,
} from '@/store/async-actions';

import type { ApiContentData, ApiFeedData, RssState } from '../types';

import { logoutUser } from './userSlice';

const initialState: RssState = {
	isLoadingFromApi: false,
	isLoadingFromRssSource: false,
	isFeedDeleteInProcess: false,
	urlDataset: [],
};

const rssMetaSlice = createSlice({
	name: 'rssMeta',
	initialState,
	reducers: {},
	extraReducers: {
		[getAllContentFromApi.pending.type]: (state) => {
			state.isLoadingFromApi = true;
		},
		[getAllContentFromApi.fulfilled.type]: (
			state,
			action: PayloadAction<ApiContentData>,
		) => {
			const { feeds } = action.payload;

			state.isLoadingFromApi = false;

			feeds.forEach((feed) => {
				const feedUrlData = { feedId: feed._id, url: feed.url };
				state.urlDataset.push(feedUrlData);
			});
		},
		[getAllContentFromApi.rejected.type]: (state) => {
			state.isLoadingFromApi = false;
		},
		[getContentFromRssSource.pending.type]: (state) => {
			state.isLoadingFromRssSource = true;
		},
		[getContentFromRssSource.fulfilled.type]: (
			state,
			action: PayloadAction<ApiFeedData>,
		) => {
			const { feed } = action.payload;

			state.isLoadingFromRssSource = false;

			const feedUrlData = { feedId: feed._id, url: feed.url };
			state.urlDataset.push(feedUrlData);
		},
		[getContentFromRssSource.rejected.type]: (state) => {
			state.isLoadingFromRssSource = false;
		},
		[deleteFeed.pending.type]: (state) => {
			state.isFeedDeleteInProcess = true;
		},
		[deleteFeed.fulfilled.type]: (state, action: PayloadAction<string>) => {
			state.isFeedDeleteInProcess = false;

			state.urlDataset = state.urlDataset.filter(
				({ feedId }) => feedId !== action.payload,
			);
		},
		[deleteFeed.rejected.type]: (state) => {
			state.isFeedDeleteInProcess = false;
		},
		[logoutUser.type]: (state) => {
			state.urlDataset = [];
		},
	},
});

export default rssMetaSlice.reducer;
