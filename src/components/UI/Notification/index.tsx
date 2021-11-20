import React, { FC } from 'react';
import { Alert } from 'react-bootstrap';

import Icon from './Icon';
import { NotificationData } from './types';

interface NotificationProps {
	data: NotificationData;
	isShow: boolean;
	onClose: () => void;
}

const Notification: FC<NotificationProps> = ({ data, isShow, onClose }) => {
	const { variant, message } = data;

	return (
		<Alert
			dismissible
			show={isShow}
			onClose={onClose}
			variant={variant}
			className="fixed-top"
		>
			<Icon variant={variant} />
			{message}
		</Alert>
	);
};

export default Notification;
