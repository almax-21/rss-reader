import '@/styles/main.scss';
import { LOCALES } from '@/i18n/locales';
import reactIntl from './reactIntl';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
	reactIntl,
  locale: reactIntl.defaultLocale,
  locales: {
		[LOCALES.ENGLISH]: {title: "English", left: '🇬🇧'},
		[LOCALES.RUSSIAN]: {title: "Русский", left: '🇷🇺'},
	},
	backgrounds: {
    default: 'light',
    values: [
      {
        name: 'light',
        value: '#ffffff',
      },
      {
        name: 'dark',
        value: '#212529',
      },
      {
        name: 'gray',
        value: '#6c757d',
      },
    ],
  },
}
