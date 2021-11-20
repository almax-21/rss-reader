import React, { FC, useEffect, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FormattedMessage, useIntl } from 'react-intl';

import useTypedSelector from '../hooks/useTypedSelector';
import { MESSAGES } from '../i18n/types';
import { FEED_LOADED_STATE } from '../store/types';
import LocaleSwitcher from './LocaleSwitcher';
import RssForm from './RssForm';
import Notification from './UI/Notification';
import {
	NOTIFICATION_VARIANT,
	NotificationData,
} from './UI/Notification/types';

const RssContainer: FC = () => {
	const { feedLoadedState, errorMessage } = useTypedSelector(
		(state) => state.rss
	);

	const [isShowNotification, setIsShowNotification] = useState<boolean>(false);
	const notificationRef = useRef<NotificationData>({
		variant: '',
		message: '',
	});

	const intl = useIntl();

	useEffect(() => {
		if (feedLoadedState && !isShowNotification) {
			switch (feedLoadedState) {
				case FEED_LOADED_STATE.SUCCESS:
					notificationRef.current = {
						variant: NOTIFICATION_VARIANT.SUCCESS,
						message: intl.formatMessage({ id: MESSAGES.SUCCESSFULLY_LOADED }),
					};
					break;
				case FEED_LOADED_STATE.ERROR:
					notificationRef.current = {
						variant: NOTIFICATION_VARIANT.ERROR,
						message: errorMessage,
					};
					break;
				default:
					console.error(`Unexpected "${feedLoadedState}" state!`);
			}

			setIsShowNotification(true);

			setTimeout(() => {
				setIsShowNotification(false);
				notificationRef.current = { variant: '', message: '' };
			}, 3500);
		}
	}, [feedLoadedState]);

	const onCloseNotification = () => {
		setIsShowNotification(false);
	};

	return (
		<>
			<Notification
				data={notificationRef.current}
				isShow={isShowNotification}
				onClose={onCloseNotification}
			/>
			<Container className="bg-dark p-5 pt-4 pb-4" as="section" fluid>
				<Row className="justify-content-center">
					<Col md="10" lg="8" className="d-flex justify-content-end">
						{/* change language select */}
						<LocaleSwitcher />
					</Col>
				</Row>
				<Row className="justify-content-center">
					<Col md="10" lg="8" className="text-white">
						<h1 className="display-3 mb-0">
							<FormattedMessage id={MESSAGES.MAIN_HEADER} />
						</h1>
						<p className="lead">
							<FormattedMessage id={MESSAGES.LEAD} />
						</p>
						{/* form's here */}
						<RssForm />
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default RssContainer;
