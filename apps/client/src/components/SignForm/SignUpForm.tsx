/* eslint @typescript-eslint/no-explicit-any: "off" */

import React, { FC, useRef } from 'react';
import {
	Button,
	Card,
	Col,
	FloatingLabel,
	Form,
	Row,
	Spinner,
} from 'react-bootstrap';
import { FormattedMessage, useIntl } from 'react-intl';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { Formik } from 'formik';

import { MESSAGES } from '../../i18n/types';
import { ROUTES } from '../../router/types';
import setSignUpSchema from '../../schemas/setSignUpSchema';
import { SIGN_FORM } from '../../schemas/types';
import userAPI from '../../services/UserService';

import { SignUpFormValues } from './types';

import './style.scss';

const initValues: SignUpFormValues = {
	[SIGN_FORM.USERNAME]: '',
	[SIGN_FORM.PASSWORD]: '',
	[SIGN_FORM.PASSWORD_CONFIRMATION]: '',
};

const SignUpForm: FC = () => {
	const [createUser, { isLoading: isLoading, error: registrationError }] =
		userAPI.useCreateUserMutation();

	const registrationErrorRef = useRef<string>('');

	const router = useHistory();
	const intl = useIntl();

	if (registrationError) {
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

	const handleRegistration = (values: SignUpFormValues) => {
		const { username, password } = values;

		createUser({ username, password }).then((res) => {
			if ('error' in res) {
				return;
			}

			router.push(ROUTES.SIGN_IN);
		});
	};

	return (
		<Formik
			initialValues={initValues}
			validationSchema={setSignUpSchema(intl)}
			onSubmit={handleRegistration}
		>
			{({ handleSubmit, handleChange, values, touched, errors }) => (
				<Card>
					<Card.Body as={Row} className="align-items-center p-4">
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
									<FormattedMessage id={MESSAGES.SIGN_UP} />
								</h2>

								<FloatingLabel
									className="sign__label"
									controlId="floatingUsername"
									label={intl.formatMessage({ id: MESSAGES.USERNAME })}
								>
									<Form.Control
										className="pb-2 pt-4"
										isInvalid={
											(touched[SIGN_FORM.USERNAME] &&
												!!errors[SIGN_FORM.USERNAME]) ||
											!!registrationErrorRef.current
										}
										name={SIGN_FORM.USERNAME}
										placeholder={intl.formatMessage({ id: MESSAGES.USERNAME })}
										type="text"
										value={values[SIGN_FORM.USERNAME]}
										onChange={handleChange}
									/>
									<Form.Control.Feedback tooltip type="invalid">
										{errors[SIGN_FORM.USERNAME] || registrationErrorRef.current}
									</Form.Control.Feedback>
								</FloatingLabel>

								<FloatingLabel
									className="sign__label"
									controlId="floatingPassword"
									label={intl.formatMessage({ id: MESSAGES.PASSWORD })}
								>
									<Form.Control
										className="pb-2 pt-4"
										isInvalid={
											touched[SIGN_FORM.PASSWORD] &&
											!!errors[SIGN_FORM.PASSWORD]
										}
										name={SIGN_FORM.PASSWORD}
										placeholder={intl.formatMessage({ id: MESSAGES.PASSWORD })}
										type="password"
										value={values[SIGN_FORM.PASSWORD]}
										onChange={handleChange}
									/>
									<Form.Control.Feedback tooltip type="invalid">
										{errors[SIGN_FORM.PASSWORD]}
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
										isInvalid={
											touched[SIGN_FORM.PASSWORD_CONFIRMATION] &&
											!!errors[SIGN_FORM.PASSWORD_CONFIRMATION]
										}
										name={SIGN_FORM.PASSWORD_CONFIRMATION}
										placeholder={intl.formatMessage({
											id: MESSAGES.PASSWORD_CONFIRMATION,
										})}
										type="password"
										value={values[SIGN_FORM.PASSWORD_CONFIRMATION]}
										onChange={handleChange}
									/>
									<Form.Control.Feedback tooltip type="invalid">
										{errors[SIGN_FORM.PASSWORD_CONFIRMATION]}
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
											<Spinner
												animation="border"
												aria-hidden="true"
												as="span"
												role="status"
												size="sm"
											>
												<span className="visually-hidden">
													<FormattedMessage id={MESSAGES.LOADING} />
												</span>
											</Spinner>
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
			)}
		</Formik>
	);
};

export default SignUpForm;
