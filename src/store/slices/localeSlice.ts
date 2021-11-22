import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LOCALES } from '../../i18n/locales';
import { LocaleType } from '../../i18n/types';

const BROWSER_LANGUAGE: LocaleType = navigator
	.language
	.split('-')[0] as LocaleType;

const initialState: LocaleType = Object.values(LOCALES).includes(
	BROWSER_LANGUAGE
)
	? BROWSER_LANGUAGE
	: LOCALES.ENGLISH;

const localeSlice = createSlice({
	name: 'locale',
	initialState,
	reducers: {
		setLocale(state, action: PayloadAction<LocaleType>) {
			return action.payload;
		},
	},
});

export default localeSlice;
