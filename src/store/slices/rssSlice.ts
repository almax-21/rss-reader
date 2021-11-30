import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getRSSData } from '../async-actions/getRSSData';
import { FEED_LOADED_STATES, RSSData, RssState } from '../types';

import { deleteFeed } from './feedsSlice';

const initialState: RssState = {
	isLoading: false,
	feedLoadedState: FEED_LOADED_STATES.NULL,
	errorMessage: '',
	urlDataset: [],
};

const rssSlice = createSlice({
	name: 'rss',
	initialState,
	reducers: {},
	extraReducers: {
		[getRSSData.pending.type]: (state) => {
			state.isLoading = true;
			state.feedLoadedState = FEED_LOADED_STATES.NULL;
			state.errorMessage = '';
		},
		[getRSSData.fulfilled.type]: (state, action: PayloadAction<RSSData>) => {
			const { feed } = action.payload;

			state.isLoading = false;
			state.feedLoadedState = FEED_LOADED_STATES.SUCCESS;

			const feedUrlData = { feedId: feed.id, url: feed.url };
			state.urlDataset.push(feedUrlData);
		},
		[getRSSData.rejected.type]: (state, action: PayloadAction<string>) => {
			state.isLoading = false;
			state.feedLoadedState = FEED_LOADED_STATES.ERROR;
			state.errorMessage = action.payload;
		},
		[deleteFeed.type]: (state, action: PayloadAction<string>) => {
			state.urlDataset = state.urlDataset.filter(
				({ feedId }) => feedId !== action.payload
			);
		},
	},
});

export default rssSlice.reducer;
