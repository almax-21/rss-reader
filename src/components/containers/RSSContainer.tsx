import React, { FC } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import useTypedSelector from '../../hooks/redux/useTypedSelector';
import useNotification from '../../hooks/useNotification';
import { MESSAGES } from '../../i18n/types';
import { selectRSS } from '../../store/selectors';
import LocaleSwitcher from '../LocaleSwitcher';
import RSSForm from '../RSSForm';
import Notification from '../UI/Notification';

const NOTIFICATION_SHOW_TIME = 3500;

const RSSContainer: FC = () => {
	const { rssLoadedState, errorMessage } = useTypedSelector(selectRSS);

	const { isShowNotification, notificationData, onCloseNotification } =
		useNotification(rssLoadedState, errorMessage, NOTIFICATION_SHOW_TIME);

	return (
		<>
			<Notification
				data={notificationData}
				isShow={isShowNotification}
				onClose={onCloseNotification}
			/>
			<Container fluid as="section" className="bg-dark p-5 pt-4 pb-4">
				<Row className="justify-content-center">
					<Col className="d-flex justify-content-end" lg="8" md="10">
						{/* change language select */}
						<LocaleSwitcher />
					</Col>
				</Row>
				<Row className="justify-content-center">
					<Col className="text-white" lg="8" md="10">
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
