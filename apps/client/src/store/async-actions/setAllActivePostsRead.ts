import { createAsyncThunk } from '@reduxjs/toolkit';

import { MESSAGES } from '@/i18n/types';
import PostService from '@/services/PostService';

import {
	notificationReqFailure,
	notificationReqPending,
} from '../slices/notificationSlice';

export const setAllActivePostsRead = createAsyncThunk(
	'posts/setAllActivePostsRead',
	async (feedId: string, thunkAPI) => {
		try {
			thunkAPI.dispatch(notificationReqPending());

			await PostService.setAllActivePostsRead(feedId);

			return feedId;
		} catch (err) {
			const message = (err as Error).message;

			navigator.onLine
				? thunkAPI.dispatch(notificationReqFailure(MESSAGES.ERROR_UNKNOWN))
				: thunkAPI.dispatch(notificationReqFailure(MESSAGES.ERROR_NETWORK));

			return thunkAPI.rejectWithValue(message);
		}
	}
);
