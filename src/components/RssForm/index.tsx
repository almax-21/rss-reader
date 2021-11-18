import React, { FC, ReactNode } from 'react';
import axios from 'axios';

import { FormattedMessage, useIntl } from 'react-intl';
import { MESSAGES } from '../../i18n/types';
import { IntlShape } from '@formatjs/intl';

import useTypedSelector from '../../hooks/useTypedSelector';
import rssSlice from '../../store/reducers/rssSlice';
import useTypedDispatch from '../../hooks/useTypedDispatch';

import * as Yup from 'yup';
import { Formik } from 'formik';
import {
	Form,
	Button,
	Row,
	Col,
	FloatingLabel,
	Spinner,
} from 'react-bootstrap';

import './RssForm.scss';

const RSS_URL = 'RSS_URL';

interface FormValues {
	[RSS_URL]: string;
}

const initValues: FormValues = {
	[RSS_URL]: '',
};

const setValidationSchema = (
	intl: IntlShape<string | ReactNode>,
	urls: string[]
) => {
	const validUrlSchema = Yup.string()
		.required(intl.formatMessage({ id: MESSAGES.ERROR_EMPTY }))
		.url(intl.formatMessage({ id: MESSAGES.ERROR_INVALID_URL }));

	return Yup.object().shape({
		[RSS_URL]: validUrlSchema.test({
			test: async function (value: string | undefined) {
				if (value && urls.includes(value)) {
					return this.createError({
						message: intl.formatMessage({ id: MESSAGES.ERROR_ALREADY_EXIST }),
					});
				}

				if (!validUrlSchema.isValidSync(value)) {
					return false;
				}

				const isNetworkError: boolean = await new Promise((resolve) => {
					axios
						.head(value)
						.then(() => resolve(false))
						.catch(() => resolve(true));
				});

				return isNetworkError
					? this.createError({
							message: intl.formatMessage({ id: MESSAGES.ERROR_NETWORK }),
					  })
					: true;
			},
		}),
	});
};

const RssForm: FC = () => {
	const { urls } = useTypedSelector((state) => state.rss);
	const { addUrl } = rssSlice.actions;
	const dispatch = useTypedDispatch();

	const intl = useIntl();

	const handleSubmit = async (values: FormValues) => {
		const newUrl = values[RSS_URL];
		dispatch(addUrl(newUrl));
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
