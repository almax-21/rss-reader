import { ReactNode } from 'react';
import { IntlShape } from '@formatjs/intl';
import * as Yup from 'yup';

import { MESSAGES } from '@/i18n/types';

import { SIGN_FORM } from './types';

export const setSignInSchema = (intl: IntlShape<string | ReactNode>) => {
	return Yup.object().shape({
		[SIGN_FORM.USERNAME]: Yup.string().required(
			intl.formatMessage({ id: MESSAGES.ERROR_EMPTY })
		),
		[SIGN_FORM.PASSWORD]: Yup.string().required(
			intl.formatMessage({ id: MESSAGES.ERROR_EMPTY })
		),
	});
};
