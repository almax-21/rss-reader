import { ReactNode } from 'react';
import { IntlShape } from '@formatjs/intl';
import * as Yup from 'yup';

import { MESSAGES } from '@/i18n/types';

import { PASSWORD_LENGTH, SIGN_FORM, USERNAME_LENGTH } from './types';

export const setSignUpSchema = (intl: IntlShape<string | ReactNode>) => {
	return Yup.object().shape({
		[SIGN_FORM.USERNAME]: Yup.string()
			.required(intl.formatMessage({ id: MESSAGES.ERROR_EMPTY }))
			.test({
				name: 'username length',
				message: intl.formatMessage({ id: MESSAGES.ERROR_USERNAME_LENGTH }),
				test: (username: string | undefined) => {
					if (!username) {
						return false;
					}

					return (
						username.length > USERNAME_LENGTH.MIN &&
						username.length < USERNAME_LENGTH.MAX
					);
				},
			}),
		[SIGN_FORM.PASSWORD]: Yup.string()
			.required(intl.formatMessage({ id: MESSAGES.ERROR_EMPTY }))
			.test({
				name: 'password length',
				message: intl.formatMessage({ id: MESSAGES.ERROR_PASSWORD_LENGTH }),
				test: (password: string | undefined) => {
					if (!password) {
						return false;
					}

					return password.length > PASSWORD_LENGTH.MIN;
				},
			}),
		[SIGN_FORM.PASSWORD_CONFIRMATION]: Yup.string()
			.required(intl.formatMessage({ id: MESSAGES.ERROR_EMPTY }))
			.oneOf(
				[Yup.ref(SIGN_FORM.PASSWORD), null],
				intl.formatMessage({ id: MESSAGES.ERROR_PASSWORD_NOT_MATCH })
			),
	});
};
