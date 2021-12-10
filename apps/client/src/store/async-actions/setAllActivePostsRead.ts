import { createAsyncThunk } from '@reduxjs/toolkit';

import PostService from '../../services/PostService';

const setAllActivePostsRead = createAsyncThunk(
	'posts/setAllActivePostsRead',
	async (feedId: string, thunkAPI) => {
		try {
			await PostService.setAllActivePostsRead(feedId);

			return feedId;
		} catch (err) {
			const message = (err as Error).message;

			console.error(message);
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export default setAllActivePostsRead;
