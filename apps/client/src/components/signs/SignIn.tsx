import React, { FC, useContext, useMemo, useRef } from 'react';
import { useIntl } from 'react-intl';

import { AuthContext } from '../../contexts/AuthContext';
import useTypedSelector from '../../hooks/redux/useTypedSelector';
import { MESSAGES } from '../../i18n/types';
import setSignInSchema from '../../schemas/setSignInSchema';
import { SIGN_FORM } from '../../schemas/types';
import userAPI from '../../services/UserService';
import { selectSettings } from '../../store/selectors/settingsSelectors';

import { SignForm } from './sign-form';
import { SIGN_FORM_TYPES, SignFormValues } from './types';

import './style.scss';

const initialValues: SignFormValues = {
	[SIGN_FORM.USERNAME]: '',
	[SIGN_FORM.PASSWORD]: '',
};

export const SignIn: FC = () => {
	const [loginUser, { isLoading, error: loginError }] =
		userAPI.useLoginUserMutation();

	const loginErrorRef = useRef<string>('');

	const authContext = useContext(AuthContext);

	const { lang } = useTypedSelector(selectSettings);
	const intl = useIntl();

	const validationSchema = useMemo(() => setSignInSchema(intl), [lang]);

	if (loginError && 'status' in loginError) {
		const statusCode = loginError.status;

		if (statusCode === 400 || statusCode === 404) {
			loginErrorRef.current = intl.formatMessage({
				id: MESSAGES.ERROR_INCORRECT_USERNAME_PASSWORD,
			});
		}
	} else {
		loginErrorRef.current = '';
	}

	const handleLogin = (values: SignFormValues) => {
		const { username, password } = values;

		loginUser({ username, password }).then((res) => {
			if ('error' in res) {
				return;
			}

			authContext?.refetchAuthQuery();
		});
	};

	return (
		<SignForm
			apiError={loginErrorRef.current}
			handleSubmit={handleLogin}
			initialValues={initialValues}
			isLoading={isLoading}
			type={SIGN_FORM_TYPES.SIGN_IN}
			validationSchema={validationSchema}
		/>
	);
};
