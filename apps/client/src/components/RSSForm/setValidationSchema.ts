import { ReactNode } from 'react';
import { IntlShape } from '@formatjs/intl';
import * as Yup from 'yup';

import { MESSAGES } from '../../i18n/types';

import { RSS_URL } from './constants';

const setValidationSchema = (
	urls: string[],
	intl: IntlShape<string | ReactNode>
) => {
	return Yup.object().shape({
		[RSS_URL]: Yup.string()
			.trim()
			.required(intl.formatMessage({ id: MESSAGES.ERROR_EMPTY }))
			.url(intl.formatMessage({ id: MESSAGES.ERROR_INVALID_URL }))
			.test({
				name: 'there should be no duplicate links',
				message: intl.formatMessage({ id: MESSAGES.ERROR_ALREADY_EXIST }),
				test: (value: string | undefined): boolean =>
					!(value && urls.includes(value)),
			}),
	});
};

export default setValidationSchema;
