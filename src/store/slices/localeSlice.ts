import { LOCALES } from '../../i18n/locales';
import { LocaleType } from '../../i18n/types';
import { createSlice,PayloadAction } from '@reduxjs/toolkit';

const initialState: LocaleType = LOCALES.RUSSIAN;

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