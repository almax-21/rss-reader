import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LocaleType } from '../../i18n/types';
import { IUser } from '../../models/IUser';
import userAPI from '../../services/UserService';
import { UserState } from '../types';

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
			(state, action: PayloadAction<IUser>) => {
				state.userData = action.payload;
			}
		);
		builder.addMatcher(
			userAPI.endpoints.loginUser.matchFulfilled,
			(state, action: PayloadAction<IUser>) => {
				state.isAuth = true;
				state.userData = action.payload;
			}
		);
		builder.addMatcher(
			userAPI.endpoints.authUser.matchFulfilled,
			(state, action: PayloadAction<IUser>) => {
				state.isAuth = true;
				state.userData = action.payload;
			}
		);
	},
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
