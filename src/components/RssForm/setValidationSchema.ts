import axios from 'axios';

import { ReactNode } from 'react';
import { IntlShape } from '@formatjs/intl';
import { MESSAGES } from '../../i18n/types';
import { RSS_URL } from './constants';

import * as Yup from 'yup';

const setValidationSchema = (
	intl: IntlShape<string | ReactNode>,
	urls: string[]
) => {
	const validUrlSchema = Yup.string()
		.required(intl.formatMessage({ id: MESSAGES.ERROR_EMPTY }))
		.url(intl.formatMessage({ id: MESSAGES.ERROR_INVALID_URL }));

	return Yup.object().shape({
		[RSS_URL]: validUrlSchema.test({
			test: async function (value: string | undefined) {
				if (value && urls.includes(value)) {
					return this.createError({
						message: intl.formatMessage({ id: MESSAGES.ERROR_ALREADY_EXIST }),
					});
				}

				if (!validUrlSchema.isValidSync(value)) {
					return false;
				}

				const isNetworkError: boolean = await new Promise((resolve) => {
					axios
						.head(value)
						.then(() => resolve(false))
						.catch(() => resolve(true));
				});

				return isNetworkError
					? this.createError({
							message: intl.formatMessage({ id: MESSAGES.ERROR_NETWORK }),
					  })
					: true;
			},
		}),
	});
};

export default setValidationSchema;
