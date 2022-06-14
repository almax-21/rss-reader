import { createAsyncThunk } from '@reduxjs/toolkit';

import { MESSAGES } from '@/i18n/types';
import FeedService from '@/services/FeedService';

import { notificationReqFailure } from '../slices/notificationSlice';

export const getAllContentFromApi = createAsyncThunk(
	'content/getAllContentFromApi',
	async (token: string, thunkAPI) => {
		try {
			const apiResponse = await FeedService.downloadContentData(token);

			return apiResponse.data;
		} catch (err) {
			const message = (err as Error).message;

			navigator.onLine
				? thunkAPI.dispatch(notificationReqFailure(MESSAGES.ERROR_UNKNOWN))
				: thunkAPI.dispatch(notificationReqFailure(MESSAGES.ERROR_NETWORK));

			return thunkAPI.rejectWithValue(message);
		}
	}
);
