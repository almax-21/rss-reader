/* eslint-disable react/display-name */

import type { ComponentType } from 'react';
import React from 'react';
import { IntlProvider } from 'react-intl';

import { LOCALES } from '@/i18n/locales';
import { messages } from '@/i18n/messages';

import type { BaseProps } from './types';

function withIntl<T extends BaseProps>(Component: ComponentType<T>) {
	return (props = {} as T) => {
		const lang = LOCALES.ENGLISH;

		return (
			<IntlProvider locale={lang} messages={messages[lang]}>
				<Component {...props} />
			</IntlProvider>
		);
	};
}

export default withIntl;
