import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getRSSData } from '../async-actions/getRSSData';
import { RSSData, RssState } from '../types';

import { deleteFeed } from './feedsSlice';

const initialState: RssState = {
	isLoading: false,
	urlDataset: [],
};

const rssSlice = createSlice({
	name: 'rss',
	initialState,
	reducers: {},
	extraReducers: {
		[getRSSData.pending.type]: (state) => {
			state.isLoading = true;
		},
		[getRSSData.fulfilled.type]: (state, action: PayloadAction<RSSData>) => {
			const { feed } = action.payload;

			state.isLoading = false;

			const feedUrlData = { feedId: feed.id, url: feed.url };
			state.urlDataset.push(feedUrlData);
		},
		[getRSSData.rejected.type]: (state) => {
			state.isLoading = false;
		},
		[deleteFeed.type]: (state, action: PayloadAction<string>) => {
			state.urlDataset = state.urlDataset.filter(
				({ feedId }) => feedId !== action.payload
			);
		},
	},
});

export default rssSlice.reducer;
