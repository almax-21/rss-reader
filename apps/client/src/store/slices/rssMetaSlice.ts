import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import deleteFeed from '../async-actions/deleteFeed';
import getDataFromApi from '../async-actions/getAllContentFromApi';
import getContentFromRssSource from '../async-actions/getContentFromRssSource';
import reloadFeed from '../async-actions/reloadFeed';
import { ApiContentData, ApiFeedData, RssState } from '../types';

import { logoutUser } from './userSlice';

const initialState: RssState = {
	isLoadingFromApi: false,
	isLoadingFromRssSource: false,
	isFeedDeleteInProcess: false,
	isFeedReloadInProcess: false,
	urlDataset: [],
};

const rssMetaSlice = createSlice({
	name: 'rssMeta',
	initialState,
	reducers: {},
	extraReducers: {
		[getDataFromApi.pending.type]: (state) => {
			state.isLoadingFromApi = true;
		},
		[getDataFromApi.fulfilled.type]: (
			state,
			action: PayloadAction<ApiContentData>
		) => {
			const { feeds } = action.payload;

			state.isLoadingFromApi = false;

			feeds.forEach((feed) => {
				const feedUrlData = { feedId: feed._id, url: feed.url };
				state.urlDataset.push(feedUrlData);
			});
		},
		[getDataFromApi.rejected.type]: (state) => {
			state.isLoadingFromApi = false;
		},
		[getContentFromRssSource.pending.type]: (state) => {
			state.isLoadingFromRssSource = true;
		},
		[getContentFromRssSource.fulfilled.type]: (
			state,
			action: PayloadAction<ApiFeedData>
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
				({ feedId }) => feedId !== action.payload
			);
		},
		[deleteFeed.rejected.type]: (state) => {
			state.isFeedDeleteInProcess = false;
		},
		[reloadFeed.pending.type]: (state) => {
			state.isFeedReloadInProcess = true;
		},
		[reloadFeed.fulfilled.type]: (state) => {
			state.isFeedReloadInProcess = false;
		},
		[reloadFeed.rejected.type]: (state) => {
			state.isFeedReloadInProcess = false;
		},
		[logoutUser.type]: (state) => {
			state.urlDataset = [];
		},
	},
});

export default rssMetaSlice.reducer;
