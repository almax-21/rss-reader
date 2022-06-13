import React, { FC, FormEvent, useEffect, useRef, useState } from 'react';
import { Button, Card, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import { ObjectSchema } from 'yup';

import { MySpinner } from '@/components/UI/my-spinner';
import SvgIcon from '@/components/UI/SvgIcon';
import { SVG_ICON_VARIANTS } from '@/components/UI/SvgIcon/types';
import useTypedSelector from '@/hooks/redux/useTypedSelector';
import { MESSAGES } from '@/i18n/types';
import { ROUTES } from '@/router/types';
import { SIGN_FORM } from '@/schemas/types';
import { selectSettings } from '@/store/selectors/settingsSelectors';
import { getTextValuesFromObject } from '@/utils/text';

import { SIGN_FORM_TYPES, SignFormType, SignFormValues } from './types';

import './style.scss';

interface SignFormProps {
	type: SignFormType;
	initialValues: SignFormValues;
	validationSchema: ObjectSchema<any>;
	isLoading: boolean;
	handleSubmit: (values: SignFormValues) => void;
	apiError: string;
}

export const SignForm: FC<SignFormProps> = ({
	type,
	initialValues,
	validationSchema,
	isLoading,
	handleSubmit,
	apiError,
}) => {
	const [triedToSubmit, setTriedToSubmit] = useState(false);

	const { isDarkTheme } = useTypedSelector(selectSettings);

	const intl = useIntl();

	const usernameInputRef = useRef<HTMLInputElement | null>(null);

	const isApiError = !!apiError;
	const isSignInFormType = type === SIGN_FORM_TYPES.SIGN_IN;
	const isSignUpFormType = type === SIGN_FORM_TYPES.SIGN_UP;

	useEffect(() => {
		usernameInputRef?.current?.focus();
	}, []);

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={handleSubmit}
		>
			{({
				handleSubmit: formikSubmitHandler,
				handleChange,
				values,
				touched,
				isValid,
				errors: validationErrors,
			}) => {
				const isUsernameValidationError =
					touched[SIGN_FORM.USERNAME] && !!validationErrors[SIGN_FORM.USERNAME];

				const isInvalidUsername = isUsernameValidationError || isApiError;

				const isPasswordValidationError =
					touched[SIGN_FORM.PASSWORD] && !!validationErrors[SIGN_FORM.PASSWORD];

				const isInvalidPassword =
					isPasswordValidationError || (isSignInFormType && isApiError);

				const isInvalidPasswordConfirmation =
					touched[SIGN_FORM.PASSWORD_CONFIRMATION] &&
					!!validationErrors[SIGN_FORM.PASSWORD_CONFIRMATION];

				const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
					evt.preventDefault();

					formikSubmitHandler();
					setTriedToSubmit(true);
				};

				return (
					<Card className="sign shadow">
						<Card.Body as={Row} className="align-items-start p-4">
							<Col className="sign__logo" md="5">
								{isSignInFormType ? (
									<img
										alt={intl.formatMessage({ id: MESSAGES.APP_LOGO })}
										height="284"
										src="./icons/app-icon-384x384.png"
										width="284"
									/>
								) : (
									<SvgIcon
										fill="#0d6efd"
										height="284"
										variant={SVG_ICON_VARIANTS.SUCCESS}
										width="284"
									/>
								)}
							</Col>
							<Col>
								<Form onSubmit={handleSubmit}>
									<fieldset className="d-flex flex-column justify-content-around">
										<legend className="mb-4">
											<h2>
												<FormattedMessage id={type} />
											</h2>
										</legend>

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
											{isSignInFormType ? (
												!isApiError && (
													<Form.Control.Feedback tooltip type="invalid">
														{validationErrors[SIGN_FORM.USERNAME]}
													</Form.Control.Feedback>
												)
											) : (
												<Form.Control.Feedback tooltip type="invalid">
													{validationErrors[SIGN_FORM.USERNAME] || apiError}
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
												isInvalid={isInvalidPassword}
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
													(isSignInFormType && apiError)}
											</Form.Control.Feedback>
										</FloatingLabel>

										{isSignUpFormType && (
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
										)}
										<Form.Group className="d-flex justify-content-start align-items-center flex-wrap">
											<Button
												className="sign__btn mb-3"
												disabled={isLoading}
												type="submit"
												variant="outline-primary"
											>
												{isLoading ? (
													<MySpinner
														small
														isDark={!isDarkTheme}
													/>
												) : (
													<FormattedMessage id={type} />
												)}
											</Button>

											<p className="mt-0 mb-3">
												{isSignInFormType ? (
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
										{/* a11y */}
										<p className="visually-hidden" role="alert">
											{triedToSubmit &&
												!isValid &&
												getTextValuesFromObject(validationErrors)}
										</p>
									</fieldset>
								</Form>
							</Col>
						</Card.Body>
					</Card>
				);
			}}
		</Formik>
	);
};
