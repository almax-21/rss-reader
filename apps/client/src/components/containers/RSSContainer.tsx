import React, { FC } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import useTypedSelector from '../../hooks/redux/useTypedSelector';
import useNotification from '../../hooks/useNotification';
import { selectRSS } from '../../store/selectors/rssSelectors';
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
			<Container fluid as="section" className="bg-dark p-5 pt-0 pb-4">
				<Row className="justify-content-center">
					<Col className="text-white" lg="8" md="10">
						<RSSForm />
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default RSSContainer;
