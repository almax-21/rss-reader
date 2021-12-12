import React, { FC, useEffect, useMemo, useRef } from 'react';
import { Button, Card, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import { FormattedMessage, useIntl } from 'react-intl';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { Formik } from 'formik';

import useTypedSelector from '../../hooks/redux/useTypedSelector';
import { MESSAGES } from '../../i18n/types';
import { ROUTES } from '../../router/types';
import setSignUpSchema from '../../schemas/setSignUpSchema';
import { SIGN_FORM } from '../../schemas/types';
import userAPI from '../../services/UserService';
import { selectLang } from '../../store/selectors/langSelectors';
import Icon from '../UI/Icon';
import MySpinner from '../UI/MySpinner';

import { SignUpFormValues } from './types';

import './style.scss';

const initValues: SignUpFormValues = {
	[SIGN_FORM.USERNAME]: '',
	[SIGN_FORM.PASSWORD]: '',
	[SIGN_FORM.PASSWORD_CONFIRMATION]: '',
};

const SignUpForm: FC = () => {
	const [createUser, { isLoading, error: registrationError }] =
		userAPI.useCreateUserMutation();

	const usernameInputRef = useRef<HTMLInputElement | null>(null);
	const registrationErrorRef = useRef<string>('');

	const router = useHistory();
	const { lang } = useTypedSelector(selectLang);
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

	useEffect(() => {
		usernameInputRef?.current?.focus();
	}, []);

	const handleRegistration = (values: SignUpFormValues) => {
		const { username, password } = values;

		createUser({ username, password, lang }).then((res) => {
			if ('error' in res) {
				return;
			}

			router.push(ROUTES.SIGN_IN);
		});
	};

	return (
		<Formik
			initialValues={initValues}
			validationSchema={validationSchema}
			onSubmit={handleRegistration}
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
					isUsernameValidationError || !!registrationErrorRef.current;

				const isInvalidPassowrd =
					touched[SIGN_FORM.PASSWORD] && !!validationErrors[SIGN_FORM.PASSWORD];

				const isInvalidPasswordConfirmation =
					touched[SIGN_FORM.PASSWORD_CONFIRMATION] &&
					!!validationErrors[SIGN_FORM.PASSWORD_CONFIRMATION];

				return (
					<Card className="shadow">
						<Card.Body as={Row} className="align-items-start p-4">
							<Col className="sign__logo" md="5">
								<Icon
									fill="#0d6efd"
									height="284"
									variant="success"
									width="284"
								/>
							</Col>
							<Col>
								<Form
									className="d-flex flex-column justify-content-around"
									onSubmit={handleSubmit}
								>
									<h2 className="mb-4">
										<FormattedMessage id={MESSAGES.SIGN_UP} />
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
										<Form.Control.Feedback tooltip type="invalid">
											{validationErrors[SIGN_FORM.USERNAME] ||
												registrationErrorRef.current}
										</Form.Control.Feedback>
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
											{validationErrors[SIGN_FORM.PASSWORD]}
										</Form.Control.Feedback>
									</FloatingLabel>

									<FloatingLabel
										className="sign__label"
										controlId="floatingRepeatPassword"
										label={intl.formatMessage({
											id: MESSAGES.PASSWORD_CONFIRMATION,
										})}
									>
										<Form.Control
											className="pb-2 pt-4"
											isInvalid={isInvalidPasswordConfirmation}
											name={SIGN_FORM.PASSWORD_CONFIRMATION}
											placeholder={intl.formatMessage({
												id: MESSAGES.PASSWORD_CONFIRMATION,
											})}
											type="password"
											value={values[SIGN_FORM.PASSWORD_CONFIRMATION]}
											onChange={handleChange}
										/>
										<Form.Control.Feedback tooltip type="invalid">
											{validationErrors[SIGN_FORM.PASSWORD_CONFIRMATION]}
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
												<FormattedMessage id={MESSAGES.SIGN_UP} />
											)}
										</Button>

										<p className="mt-0 mb-3">
											<Link to={ROUTES.SIGN_IN}>
												<FormattedMessage id={MESSAGES.BACK} />
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

export default SignUpForm;
