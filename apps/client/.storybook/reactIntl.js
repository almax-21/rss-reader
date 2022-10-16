import { LOCALES } from '../src/i18n/locales';
import { messages } from '../src/i18n/messages';

const locales = [LOCALES.ENGLISH, LOCALES.RUSSIAN];

const reactIntl = {
  defaultLocale: LOCALES.ENGLISH,
  locales,
  messages,
	formats: {},
};

export default reactIntl;
