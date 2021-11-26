import React, { FC, useEffect, useRef } from 'react';
import {
	Button,
	Col,
	FloatingLabel,
	Form,
	Row,
	Spinner,
} from 'react-bootstrap';
import { FormattedMessage, useIntl } from 'react-intl';
import { Formik, FormikProps } from 'formik';

import useTypedDispatch from '../../hooks/redux/useTypedDispatch';
import useTypedSelector from '../../hooks/redux/useTypedSelector';
import { MESSAGES } from '../../i18n/types';
import { getRSSData } from '../../store/async-actions/getRSSData';
import { selectUrls } from '../../store/selectors/rss';

import { RSS_URL } from './constants';
import setValidationSchema from './setValidationSchema';

import './style.scss';

interface FormValues {
	[RSS_URL]: string;
}

const initValues: FormValues = {
	[RSS_URL]: '',
};

const RSSForm: FC = () => {
	const { urls, isLoading } = useTypedSelector(selectUrls);
	const dispatch = useTypedDispatch();
	const intl = useIntl();

	const formikRef = useRef<FormikProps<FormValues>>(null);
	const rssInputRef = useRef<HTMLInputElement>(null);
	const urlCountRef = useRef<number>(-1);

	useEffect(() => {
		const newUrlCount = urls.length;

		if (urlCountRef.current < newUrlCount) {
			formikRef?.current?.setFieldValue(RSS_URL, '');
			rssInputRef?.current?.focus();
		}

		urlCountRef.current = newUrlCount;
	}, [urls]);

	const handleSubmit = (values: FormValues) => {
		const feedUrl = values[RSS_URL];

		dispatch(getRSSData({ feedUrl, intl }));
	};

	return (
		<Formik
			onSubmit={handleSubmit}
			validationSchema={setValidationSchema(urls, intl)}
			initialValues={initValues}
			validateOnChange={false}
			validateOnBlur={false}
			innerRef={formikRef}
		>
			{({
				handleSubmit,
				handleChange,
				values,
				isValid,
				errors: validationFormErrors,
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
								<Form.Control.Feedback type="invalid">
									{validationFormErrors[RSS_URL]}
								</Form.Control.Feedback>
							</FloatingLabel>
						</Col>
						<Col xs="9" sm="5" md="3">
							<Button
								className="w-100 h-100"
								type="submit"
								variant="primary"
								size="lg"
								disabled={isLoading}
							>
								{isLoading ? (
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
	);
};

export default RSSForm;
