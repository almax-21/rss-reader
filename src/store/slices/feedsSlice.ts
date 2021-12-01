import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getRSSData } from '../async-actions/getRSSData';
import { FeedsState, RSSData } from '../types';

const initialState: FeedsState = {
	entities: {},
	ids: [],
	activeFeedId: '',
};

const feedsSlice = createSlice({
	name: 'feeds',
	initialState,
	reducers: {
		updateActiveFeed: (state, action: PayloadAction<string>) => {
			state.activeFeedId = action.payload;
		},
		updateFeedsOrder: (state, action: PayloadAction<string[]>) => {
			state.ids = [...action.payload];
		},
		deleteFeed: (state, action: PayloadAction<string>) => {
			const newFeedIDs = state.ids.filter((id) => id !== action.payload);

			if (state.activeFeedId === action.payload) {
				state.activeFeedId = newFeedIDs[0] ?? '';
			}

			delete state.entities[action.payload];
			state.ids = newFeedIDs;
		},
	},
	extraReducers: {
		[getRSSData.fulfilled.type]: (state, action: PayloadAction<RSSData>) => {
			const { feed } = action.payload;

			state.entities[feed.id] = feed;
			state.ids = [feed.id, ...state.ids];
			state.activeFeedId = feed.id;
		},
	},
});

export const { updateActiveFeed, updateFeedsOrder, deleteFeed } =
	feedsSlice.actions;

export default feedsSlice.reducer;
