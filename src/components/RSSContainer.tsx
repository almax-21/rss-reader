import React, { FC } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import useTypedSelector from '../hooks/redux/useTypedSelector';
import useFeedNotification from '../hooks/useFeedNotification';
import { MESSAGES } from '../i18n/types';
import LocaleSwitcher from './LocaleSwitcher';
import RSSForm from './RSSForm';
import Notification from './UI/Notification';

const RSSContainer: FC = () => {
	const { feedLoadedState, errorMessage } = useTypedSelector(
		(state) => state.rss
	);

	const { isShowNotification, notificationData, onCloseNotification } =
		useFeedNotification(feedLoadedState, errorMessage);

	return (
		<>
			<Notification
				data={notificationData}
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
						<RSSForm />
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default RSSContainer;
