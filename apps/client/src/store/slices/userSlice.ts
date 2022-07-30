import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { LocaleType } from '@/i18n/types';
import type { User } from '@/models/User';
import userAPI from '@/services/UserService';

import type { UserState } from '../types';

const initialState: UserState = {
	isAuth: false,
	userData: {
		id: '',
		token: '',
		username: '',
		lang: '' as LocaleType,
	},
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logoutUser: (state) => {
			state.isAuth = false;
			state.userData = {
				id: '',
				token: '',
				username: '',
				lang: '' as LocaleType,
			};
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			userAPI.endpoints.createUser.matchFulfilled,
			(state, action: PayloadAction<User>) => {
				state.userData = action.payload;
			},
		);
		builder.addMatcher(
			userAPI.endpoints.authUser.matchFulfilled,
			(state, action: PayloadAction<User>) => {
				state.isAuth = true;
				state.userData = action.payload;
			},
		);
	},
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
