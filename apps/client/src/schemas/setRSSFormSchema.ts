import { ReactNode } from 'react';
import { IntlShape } from '@formatjs/intl';
import * as Yup from 'yup';

import { MESSAGES } from '../i18n/types';
import { FEEDS_LIMIT } from '../types/constants';

import { RSS_FORM } from './types';

const setRSSFormSchema = (
	urls: string[],
	intl: IntlShape<string | ReactNode>
) => {
	return Yup.object().shape({
		[RSS_FORM.URL]: Yup.string()
			.trim()
			.required(intl.formatMessage({ id: MESSAGES.ERROR_EMPTY }))
			.url(intl.formatMessage({ id: MESSAGES.ERROR_INVALID_URL }))
			.test({
				name: 'there should be no duplicate links',
				message: intl.formatMessage({ id: MESSAGES.ERROR_RSS_ALREADY_EXIST }),
				test: (url: string | undefined): boolean => {
					if (!url) {
						return false;
					}

					const isUrlAlreadyExist = urls.includes(url);

					return isUrlAlreadyExist ? false : true;
				},
			})
			.test({
				name: 'feeds limit reached',
				message: intl.formatMessage({ id: MESSAGES.ERROR_MAX_LIMIT_REACHED }),
				test: (): boolean => {
					const isMaxLimitReached = urls.length >= FEEDS_LIMIT;

					return isMaxLimitReached ? false : true;
				},
			}),
	});
};

export default setRSSFormSchema;
