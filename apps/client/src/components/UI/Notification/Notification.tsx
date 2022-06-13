import React, { FC } from 'react';
import { Alert } from 'react-bootstrap';

import SvgIcon from '@/components/UI/SvgIcon';

import { NotificationData } from './typesERROR';

import './style.scss';

interface NotificationProps {
	data: NotificationData;
	isShow: boolean;
	onClose: () => void;
}

export const Notification: FC<NotificationProps> = ({
	data,
	isShow,
	onClose,
}) => {
	const { variant, message } = data;

	return (
		<Alert
			dismissible
			className="notification fixed-top"
			show={isShow}
			variant={variant}
			onClose={onClose}
		>
			<div className="notification__icon">
				<SvgIcon variant={variant} />
			</div>
			{message}
		</Alert>
	);
};
