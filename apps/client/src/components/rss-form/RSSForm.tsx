import React, { FC, useEffect, useMemo, useRef } from 'react';
import {
	Button,
	CloseButton,
	Col,
	FloatingLabel,
	Form,
	Row,
} from 'react-bootstrap';
import { FormattedMessage, useIntl } from 'react-intl';
import { Formik, FormikProps } from 'formik';

import useTypedDispatch from '../../hooks/redux/useTypedDispatch';
import useTypedSelector from '../../hooks/redux/useTypedSelector';
import { MESSAGES } from '../../i18n/types';
import setRSSFormSchema from '../../schemas/setRSSFormSchema';
import { RSS_FORM } from '../../schemas/types';
import getContentFromRssSource from '../../store/async-actions/getContentFromRssSource';
import {
	selectRssMeta,
	selectUrls,
} from '../../store/selectors/rssMetaSelectors';
import { selectSettings } from '../../store/selectors/settingsSelectors';
import { getTextValuesFromObject } from '../../utils/text';
import MySpinner from '../UI/MySpinner';

import './style.scss';

interface RSSFormValues {
	[RSS_FORM.URL]: string;
}

const initValues: RSSFormValues = {
	[RSS_FORM.URL]: '',
};

export const RSSForm: FC = () => {
	const { isLoadingFromRssSource, isLoadingFromApi } =
		useTypedSelector(selectRssMeta);

	const isContentLoading = isLoadingFromRssSource || isLoadingFromApi;

	const urls = useTypedSelector(selectUrls);

	const { lang, isDarkTheme } = useTypedSelector(selectSettings);

	const dispatch = useTypedDispatch();
	const intl = useIntl();

	const formikRef = useRef<FormikProps<RSSFormValues>>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const urlCountRef = useRef<number>(-1);

	const validationSchema = useMemo(
		() => setRSSFormSchema(urls, intl),
		[urls, lang]
	);

	useEffect(() => {
		const newUrlCount = urls.length;

		if (urlCountRef.current < newUrlCount) {
			formikRef?.current?.setFieldValue(RSS_FORM.URL, '');
		}

		urlCountRef.current = newUrlCount;
	}, [urls]);

	const handleSubmit = (values: RSSFormValues) => {
		const feedUrl = values[RSS_FORM.URL];

		dispatch(getContentFromRssSource(feedUrl));
	};

	return (
		<Formik
			initialValues={initValues}
			innerRef={formikRef}
			validateOnBlur={false}
			validateOnChange={false}
			validationSchema={validationSchema}
			onSubmit={handleSubmit}
		>
			{({
				handleSubmit,
				handleChange,
				values,
				isValid,
				errors: validationErrors,
				resetForm,
			}) => {
				const handleResetForm = () => {
					resetForm();

					if (inputRef.current) {
						inputRef.current.focus();
					}
				};

				return (
					<Form noValidate onSubmit={handleSubmit}>
						<fieldset>
							<legend className="visually-hidden">
								<h2>
									<FormattedMessage id={MESSAGES.ADD_NEW_FEED} />
								</h2>
							</legend>
							<Form.Group as={Row} className="mb-3">
								<Col className="position-relative" md="9">
									<FloatingLabel
										controlId="floatingInput"
										label={intl.formatMessage({ id: MESSAGES.RSS_INPUT })}
									>
										<Form.Control
											ref={inputRef}
											className="rss__input pb-2 pt-4"
											isInvalid={!isValid}
											name={RSS_FORM.URL}
											placeholder={intl.formatMessage({
												id: MESSAGES.RSS_INPUT,
											})}
											type="text"
											value={values[RSS_FORM.URL]}
											onChange={handleChange}
										/>
										<Form.Control.Feedback type="invalid">
											{validationErrors[RSS_FORM.URL]}
										</Form.Control.Feedback>
									</FloatingLabel>
									{values[RSS_FORM.URL] && (
										<CloseButton
											aria-label={intl.formatMessage({ id: MESSAGES.CLEAR })}
											className="rss__btn rss__btn--close"
											variant={isDarkTheme ? 'white' : undefined}
											onClick={handleResetForm}
										/>
									)}
								</Col>
								<Col md="3" sm="5" xs="9">
									<Button
										className="d-flex justify-content-center align-items-center w-100 h-100"
										disabled={isContentLoading}
										size="lg"
										type="submit"
										variant="primary"
									>
										{isContentLoading ? (
											<MySpinner />
										) : (
											<FormattedMessage id={MESSAGES.ADD} />
										)}
									</Button>
								</Col>
							</Form.Group>
							<p className="visually-hidden" role="alert">
								{!isValid && getTextValuesFromObject(validationErrors)}
							</p>
						</fieldset>
					</Form>
				);
			}}
		</Formik>
	);
};
