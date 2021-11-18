import React, { FC, useEffect, useRef } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';
import { MESSAGES } from '../../i18n/types';

import useTypedSelector from '../../hooks/useTypedSelector';
import rssSlice from '../../store/reducers/rssSlice';
import useTypedDispatch from '../../hooks/useTypedDispatch';

import { Formik, FormikHelpers } from 'formik';
import {
	Form,
	Button,
	Row,
	Col,
	FloatingLabel,
	Spinner,
} from 'react-bootstrap';
import { RSS_URL } from './constants';
import setValidationSchema from './setValidationSchema';

import './RssForm.scss';

interface FormValues {
	[RSS_URL]: string;
}

const initValues: FormValues = {
	[RSS_URL]: '',
};

const RssForm: FC = () => {
	const { urls } = useTypedSelector((state) => state.rss);
	const { addUrl } = rssSlice.actions;
	const dispatch = useTypedDispatch();

	const intl = useIntl();

	const rssInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (rssInputRef.current) {
			rssInputRef.current.focus();
		}
	}, [urls]);

	const handleSubmit = async (
		values: FormValues,
		{ resetForm }: FormikHelpers<FormValues>
	) => {
		const newUrl = values[RSS_URL];

		dispatch(addUrl(newUrl));
		resetForm();
	};

	return (
		<>
			<Formik
				onSubmit={handleSubmit}
				validationSchema={setValidationSchema(intl, urls)}
				initialValues={initValues}
				validateOnChange={false}
				validateOnBlur={false}
			>
				{({
					handleSubmit,
					handleChange,
					values,
					isValid,
					isSubmitting,
					errors,
				}) => (
					<Form noValidate onSubmit={handleSubmit} className="pb-4">
						<Form.Group as={Row} className="mb-2">
							<Col md="9" className="text-dark">
								<FloatingLabel
									controlId="floatingInput"
									label={intl.formatMessage({ id: MESSAGES.RSS_INPUT })}
								>
									<Form.Control
										type="text"
										name={RSS_URL}
										value={values[RSS_URL]}
										onChange={handleChange}
										isInvalid={!isValid}
										className="rss-input pb-2 pt-4"
										placeholder={intl.formatMessage({ id: MESSAGES.RSS_INPUT })}
										ref={rssInputRef}
									/>
									<Form.Control.Feedback type={isValid ? 'valid' : 'invalid'}>
										{errors[RSS_URL]}
									</Form.Control.Feedback>
								</FloatingLabel>
							</Col>
							<Col xs="9" sm="5" md="3">
								<Button
									className="w-100 h-100"
									type="submit"
									variant="primary"
									size="lg"
									disabled={isSubmitting}
								>
									{isSubmitting ? (
										<Spinner
											as="span"
											animation="border"
											role="status"
											aria-hidden="true"
										>
											<span className="visually-hidden">
												<FormattedMessage id={MESSAGES.LOADING} />
											</span>
										</Spinner>
									) : (
										<FormattedMessage id={MESSAGES.ADD} />
									)}
								</Button>
							</Col>
						</Form.Group>
						<Form.Text>
							<FormattedMessage id={MESSAGES.EXAMPLE} />:
							https://ru.hexlet.io/lessons.rss
						</Form.Text>
					</Form>
				)}
			</Formik>
			<pre>{JSON.stringify(urls, null, 2)}</pre>
		</>
	);
};

export default RssForm;
