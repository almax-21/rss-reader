import React, { FC, useEffect, useMemo, useRef } from 'react';
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
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
import MySpinner from '../UI/MySpinner';

import './style.scss';

interface RSSFormValues {
	[RSS_FORM.URL]: string;
}

const initValues: RSSFormValues = {
	[RSS_FORM.URL]: '',
};

const RSSForm: FC = () => {
	const { isLoadingFromRssSource, isLoadingFromApi } =
		useTypedSelector(selectRssMeta);

	const isContentLoading = isLoadingFromRssSource || isLoadingFromApi;

	const urls = useTypedSelector(selectUrls);

	const lang = useTypedSelector(selectSettings);

	const dispatch = useTypedDispatch();
	const intl = useIntl();

	const formikRef = useRef<FormikProps<RSSFormValues>>(null);
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
				errors: validationFormErrors,
			}) => (
				<Form noValidate onSubmit={handleSubmit}>
					<Form.Group as={Row} className="mb-3">
						<Col md="9">
							<FloatingLabel
								controlId="floatingInput"
								label={intl.formatMessage({ id: MESSAGES.RSS_INPUT })}
							>
								<Form.Control
									className="rss__input pb-2 pt-4"
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
				</Form>
			)}
		</Formik>
	);
};

export default RSSForm;
