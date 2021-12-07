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
import setRSSFormSchema from '../../schemas/setRSSFormSchema';
import { RSS_FORM } from '../../schemas/types';
import { getRSSData } from '../../store/async-actions/getRSSData';
import { selectUrls } from '../../store/selectors/rssSelectors';

import './style.scss';

interface RSSFormValues {
	[RSS_FORM.URL]: string;
}

const initValues: RSSFormValues = {
	[RSS_FORM.URL]: '',
};

const RSSForm: FC = () => {
	const { urls, isLoading } = useTypedSelector(selectUrls);
	const dispatch = useTypedDispatch();
	const intl = useIntl();

	const formikRef = useRef<FormikProps<RSSFormValues>>(null);
	const rssInputRef = useRef<HTMLInputElement>(null);
	const urlCountRef = useRef<number>(-1);

	useEffect(() => {
		const newUrlCount = urls.length;

		if (urlCountRef.current < newUrlCount) {
			formikRef?.current?.setFieldValue(RSS_FORM.URL, '');
			rssInputRef?.current?.focus();
		}

		urlCountRef.current = newUrlCount;
	}, [urls]);

	const handleSubmit = (values: RSSFormValues) => {
		const feedUrl = values[RSS_FORM.URL];

		dispatch(getRSSData(feedUrl));
	};

	return (
		<Formik
			initialValues={initValues}
			innerRef={formikRef}
			validateOnBlur={false}
			validateOnChange={false}
			validationSchema={setRSSFormSchema(urls, intl)}
			onSubmit={handleSubmit}
		>
			{({
				handleSubmit,
				handleChange,
				values,
				isValid,
				errors: validationFormErrors,
			}) => (
				<Form noValidate className="pb-4" onSubmit={handleSubmit}>
					<Form.Group as={Row} className="mb-2">
						<Col className="text-dark" md="9">
							<FloatingLabel
								controlId="floatingInput"
								label={intl.formatMessage({ id: MESSAGES.RSS_INPUT })}
							>
								<Form.Control
									ref={rssInputRef}
									className="rss-input pb-2 pt-4"
									isInvalid={!isValid}
									name={RSS_FORM.URL}
									placeholder={intl.formatMessage({ id: MESSAGES.RSS_INPUT })}
									type="text"
									value={values[RSS_FORM.URL]}
									onChange={handleChange}
								/>
								<Form.Control.Feedback type="invalid">
									{validationFormErrors[RSS_FORM.URL]}
								</Form.Control.Feedback>
							</FloatingLabel>
						</Col>
						<Col md="3" sm="5" xs="9">
							<Button
								className="w-100 h-100"
								disabled={isLoading}
								size="lg"
								type="submit"
								variant="primary"
							>
								{isLoading ? (
									<Spinner
										animation="border"
										aria-hidden="true"
										as="span"
										role="status"
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
						https://3dnews.ru/news/rss/
					</Form.Text>
				</Form>
			)}
		</Formik>
	);
};

export default RSSForm;
