import React, { FC, useEffect, useMemo, useRef } from 'react';
import { Button, Card, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';

import useTypedSelector from '../../hooks/redux/useTypedSelector';
import { MESSAGES } from '../../i18n/types';
import { ROUTES } from '../../router/types';
import setSignInSchema from '../../schemas/setSignInSchema';
import { SIGN_FORM } from '../../schemas/types';
import userAPI from '../../services/UserService';
import { selectLocale } from '../../store/selectors/localeSelectors';
import MySpinner from '../UI/MySpinner';

import { SignInFormValues } from './types';

import './style.scss';

const initValues: SignInFormValues = {
	[SIGN_FORM.USERNAME]: '',
	[SIGN_FORM.PASSWORD]: '',
};

const SignInForm: FC = () => {
	const [loginUser, { isLoading, error: loginError }] =
		userAPI.useLoginUserMutation();

	const usernameInputRef = useRef<HTMLInputElement | null>(null);
	const loginErrorRef = useRef<string>('');

	const locale = useTypedSelector(selectLocale);
	const intl = useIntl();

	const validationSchema = useMemo(() => setSignInSchema(intl), [locale]);

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

	useEffect(() => {
		usernameInputRef?.current?.focus();
	}, []);

	const handleLogin = (values: SignInFormValues) => {
		const { username, password } = values;

		loginUser({ username, password });
	};

	return (
		<Formik
			initialValues={initValues}
			validationSchema={validationSchema}
			onSubmit={handleLogin}
		>
			{({
				handleSubmit,
				handleChange,
				values,
				touched,
				errors: validationErrors,
			}) => {
				const isUsernameValidationError =
					touched[SIGN_FORM.USERNAME] && !!validationErrors[SIGN_FORM.USERNAME];

				const isInvalidUsername =
					isUsernameValidationError || !!loginErrorRef.current;

				const isPasswordValidationError =
					touched[SIGN_FORM.PASSWORD] && !!validationErrors[SIGN_FORM.PASSWORD];

				const isInvalidPassowrd =
					isPasswordValidationError || !!loginErrorRef.current;

				return (
					<Card className="shadow">
						<Card.Body as={Row} className="align-items-start p-4">
							<Col className="sign__logo" md="5">
								<img
									alt={intl.formatMessage({ id: MESSAGES.APP_LOGO })}
									height="284"
									src="./icons/app-icon-384x384.png"
									width="284"
								/>
							</Col>
							<Col>
								<Form
									className="d-flex flex-column justify-content-around"
									onSubmit={handleSubmit}
								>
									<h2 className="mb-4">
										<FormattedMessage id={MESSAGES.SIGN_IN} />
									</h2>

									<FloatingLabel
										className="sign__label"
										controlId="floatingUsername"
										label={intl.formatMessage({ id: MESSAGES.USERNAME })}
									>
										<Form.Control
											ref={usernameInputRef}
											className="pb-2 pt-4"
											isInvalid={isInvalidUsername}
											name={SIGN_FORM.USERNAME}
											placeholder={intl.formatMessage({
												id: MESSAGES.USERNAME,
											})}
											type="text"
											value={values[SIGN_FORM.USERNAME]}
											onChange={handleChange}
										/>
										{loginErrorRef.current ? null : (
											<Form.Control.Feedback tooltip type="invalid">
												{validationErrors[SIGN_FORM.USERNAME]}
											</Form.Control.Feedback>
										)}
									</FloatingLabel>

									<FloatingLabel
										className="sign__label"
										controlId="floatingPassword"
										label={intl.formatMessage({ id: MESSAGES.PASSWORD })}
									>
										<Form.Control
											className="pb-2 pt-4"
											isInvalid={isInvalidPassowrd}
											name={SIGN_FORM.PASSWORD}
											placeholder={intl.formatMessage({
												id: MESSAGES.PASSWORD,
											})}
											type="password"
											value={values[SIGN_FORM.PASSWORD]}
											onChange={handleChange}
										/>
										<Form.Control.Feedback tooltip type="invalid">
											{validationErrors[SIGN_FORM.PASSWORD] ||
												loginErrorRef.current}
										</Form.Control.Feedback>
									</FloatingLabel>
									<Form.Group className="d-flex justify-content-start align-items-center flex-wrap">
										<Button
											className="sign__btn mb-3"
											disabled={isLoading}
											type="submit"
											variant="outline-primary"
										>
											{isLoading ? (
												<MySpinner size="sm" />
											) : (
												<FormattedMessage id={MESSAGES.SIGN_IN} />
											)}
										</Button>

										<p className="mt-0 mb-3">
											<FormattedMessage id={MESSAGES.NO_ACCOUNT} />
											?&nbsp;
											<Link to={ROUTES.SIGN_UP}>
												<FormattedMessage id={MESSAGES.SIGN_UP} />
											</Link>
										</p>
									</Form.Group>
								</Form>
							</Col>
						</Card.Body>
					</Card>
				);
			}}
		</Formik>
	);
};

export default SignInForm;
