import React, { FC } from 'react';
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
import { Link } from 'react-router-dom';
import { Formik } from 'formik';

import { MESSAGES } from '../../i18n/types';
import { ROUTES } from '../../router/types';
import setSignInSchema from '../../schemas/setSignInSchema';
import setSignUpSchema from '../../schemas/setSignUpSchema';
import { SIGN_FORM } from '../../schemas/types';
import userAPI from '../../services/UserService';

import './style.scss';

interface SignFormProps {
	formType: MESSAGES.SIGN_IN | MESSAGES.SIGN_UP;
}

interface SignFormValues {
	[SIGN_FORM.USERNAME]: string;
	[SIGN_FORM.PASSWORD]: string;
	[SIGN_FORM.PASSWORD_CONFIRMATION]: string;
}

const initValues: SignFormValues = {
	[SIGN_FORM.USERNAME]: '',
	[SIGN_FORM.PASSWORD]: '',
	[SIGN_FORM.PASSWORD_CONFIRMATION]: '',
};

const SignForm: FC<SignFormProps> = ({ formType }) => {
	const [createUser, { isLoading: isLoadingCreate }] =
		userAPI.useCreateUserMutation();
	const [loginUser, { isLoading: isLoadingAuth }] =
		userAPI.useLoginUserMutation();

	const intl = useIntl();

	const currentValidationSchema =
		formType === MESSAGES.SIGN_IN
			? setSignInSchema(intl)
			: setSignUpSchema(intl);

	const handleRegistration = async (values: SignFormValues) => {
		const { username, password } = values;

		await createUser({ username, password });
		loginUser({ username, password });
	};

	const handleLogin = (values: SignFormValues) => {
		const { username, password } = values;

		loginUser({ username, password });
	};

	return (
		<Formik
			initialValues={initValues}
			validationSchema={currentValidationSchema}
			onSubmit={
				formType === MESSAGES.SIGN_IN ? handleLogin : handleRegistration
			}
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
									<FormattedMessage id={formType} />
								</h2>
								<FloatingLabel
									className="sign__label"
									controlId="floatingUsername"
									label={intl.formatMessage({ id: MESSAGES.USERNAME })}
								>
									<Form.Control
										className="pb-2 pt-4"
										isInvalid={
											touched[SIGN_FORM.USERNAME] &&
											!!errors[SIGN_FORM.USERNAME]
										}
										name={SIGN_FORM.USERNAME}
										placeholder={intl.formatMessage({ id: MESSAGES.USERNAME })}
										type="text"
										value={values[SIGN_FORM.USERNAME]}
										onChange={handleChange}
									/>
									<Form.Control.Feedback tooltip type="invalid">
										{errors[SIGN_FORM.USERNAME]}
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
								{formType === MESSAGES.SIGN_UP && (
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
								)}

								<Form.Group className="d-flex justify-content-start align-items-center flex-wrap">
									<Button
										className="sign__btn mb-3"
										disabled={isLoadingCreate || isLoadingAuth}
										type="submit"
										variant="outline-primary"
									>
										{isLoadingCreate || isLoadingAuth ? (
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
											<FormattedMessage id={formType} />
										)}
									</Button>

									<p className="mt-0 mb-3">
										{formType === MESSAGES.SIGN_IN ? (
											<>
												<FormattedMessage id={MESSAGES.NO_ACCOUNT} />
												?&nbsp;
												<Link to={ROUTES.SIGN_UP}>
													<FormattedMessage id={MESSAGES.SIGN_UP} />
												</Link>
											</>
										) : (
											<Link to={ROUTES.SIGN_IN}>
												<FormattedMessage id={MESSAGES.BACK} />
											</Link>
										)}
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

export default SignForm;
