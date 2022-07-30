import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { LOCALES } from '@/i18n/locales';
import type { LocaleType } from '@/i18n/types';
import type { User } from '@/models/User';
import userAPI from '@/services/UserService';
import { AUTO_UPDATE_KEY, DARK_THEME_KEY } from '@/types/constants';

import type { SettingsState } from '../types';

const initDarkThemeState = Boolean(localStorage.getItem(DARK_THEME_KEY));
const initAutoUpdateState = Boolean(localStorage.getItem(AUTO_UPDATE_KEY));

const BROWSER_LANGUAGE = navigator.language.split('-')[0] as LocaleType;

const initLang: LocaleType = Object.values(LOCALES).includes(BROWSER_LANGUAGE)
	? BROWSER_LANGUAGE
	: LOCALES.ENGLISH;

const initialState: SettingsState = {
	isDarkTheme: initDarkThemeState,
	isAutoUpdate: initAutoUpdateState,
	lang: initLang,
	isSwitchLangInProcess: false,
};

const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		setIsDarkTheme: (state, action: PayloadAction<boolean>) => {
			state.isDarkTheme = action.payload;
		},
		setIsAutoUpdate: (state, action: PayloadAction<boolean>) => {
			state.isAutoUpdate = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(userAPI.endpoints.switchLang.matchPending, (state) => {
			state.isSwitchLangInProcess = true;
		});
		builder.addMatcher(
			userAPI.endpoints.switchLang.matchFulfilled,
			(state, action: PayloadAction<LocaleType>) => {
				state.isSwitchLangInProcess = false;
				state.lang = action.payload;
			},
		);
		builder.addMatcher(userAPI.endpoints.switchLang.matchRejected, (state) => {
			state.isSwitchLangInProcess = false;
		});
		builder.addMatcher(
			userAPI.endpoints.authUser.matchFulfilled,
			(state, action: PayloadAction<User>) => {
				const { lang } = action.payload;

				state.lang = lang;
			},
		);
	},
});

export const { setIsDarkTheme, setIsAutoUpdate } = settingsSlice.actions;

export default settingsSlice.reducer;
