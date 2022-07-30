import type { FC } from 'react';
import React, { useMemo, useRef } from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

import { useTypedSelector } from '@/hooks';
import { MESSAGES } from '@/i18n/types';
import { ROUTES } from '@/router/types';
import { setSignUpSchema } from '@/schemas';
import { SIGN_FORM } from '@/schemas/types';
import userAPI from '@/services/UserService';
import { selectSettings } from '@/store/selectors/settingsSelectors';

import { SignForm } from '../SignForm';
import type { SignFormValues } from '../types';
import { SIGN_FORM_TYPES } from '../types';

const initialValues: SignFormValues = {
	[SIGN_FORM.USERNAME]: '',
	[SIGN_FORM.PASSWORD]: '',
	[SIGN_FORM.PASSWORD_CONFIRMATION]: '',
};

export const SignUp: FC = () => {
	const [createUser, { isLoading, isError, error: registrationError }] =
		userAPI.useCreateUserMutation();

	const registrationErrorRef = useRef<string>('');

	const router = useHistory();
	const { lang } = useTypedSelector(selectSettings);
	const intl = useIntl();

	const validationSchema = useMemo(() => setSignUpSchema(intl), [lang]);

	if (registrationError && 'data' in registrationError) {
		const statusCode = (registrationError as FetchBaseQueryError).status;
		const isUserExistError =
			(registrationError as any).data.message === 'User already exists';

		if (statusCode === 400 && isUserExistError) {
			registrationErrorRef.current = intl.formatMessage({
				id: MESSAGES.ERROR_USER_ALREADY_EXIST,
			});
		} else {
			registrationErrorRef.current = '';
		}
	}

	const handleRegistration = (values: SignFormValues) => {
		const { username, password } = values;

		createUser({ username, password, lang }).then((res) => {
			if ('error' in res) {
				return;
			}

			router.push(ROUTES.SIGN_IN);
		});
	};

	return (
		<>
			<SignForm
				apiError={registrationErrorRef.current}
				handleSubmit={handleRegistration}
				initialValues={initialValues}
				isLoading={isLoading}
				type={SIGN_FORM_TYPES.SIGN_UP}
				validationSchema={validationSchema}
			/>
			{/* a11y */}
			<p className="visually-hidden" role="alert">
				{isError && registrationErrorRef.current}
			</p>
		</>
	);
};
