import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LOCALES } from '../../i18n/locales';
import { LocaleType } from '../../i18n/types';
import { IUser } from '../../models/IUser';
import userAPI from '../../services/UserService';
import { LangState } from '../types';

const BROWSER_LANGUAGE = navigator.language.split('-')[0] as LocaleType;

const initLang: LocaleType = Object.values(LOCALES).includes(BROWSER_LANGUAGE)
	? BROWSER_LANGUAGE
	: LOCALES.ENGLISH;

const initialState: LangState = {
	lang: initLang,
	isSwitchLangInProcess: false,
};

const langSlice = createSlice({
	name: 'lang',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addMatcher(
			userAPI.endpoints.switchLang.matchPending,
			(state) => {
				state.isSwitchLangInProcess = true;
			}
		);
		builder.addMatcher(
			userAPI.endpoints.switchLang.matchFulfilled,
			(state, action: PayloadAction<LocaleType>) => {
				state.isSwitchLangInProcess = false;
				state.lang = action.payload;
			}
		);
		builder.addMatcher(
			userAPI.endpoints.switchLang.matchRejected,
			(state) => {
				state.isSwitchLangInProcess = false;
			}
		);
		builder.addMatcher(
			userAPI.endpoints.loginUser.matchFulfilled,
			(state, action: PayloadAction<IUser>) => {
				const { lang } = action.payload;

				state.lang = lang;
			}
		);
		builder.addMatcher(
			userAPI.endpoints.authUser.matchFulfilled,
			(state, action: PayloadAction<IUser>) => {
				const { lang } = action.payload;

				state.lang = lang;
			}
		);
	},
});

export default langSlice.reducer;
