import type { FC } from 'react';
import React from 'react';
import { Alert } from 'react-bootstrap';
import cn from 'classnames';

import { SvgIcon } from '@/components/UI/svg-icon';

import type { SVG_ICON_TYPE } from '../svg-icon/types';

import type { NotificationData } from './types';

import styles from './styles.module.scss';

export interface NotificationProps {
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
			className={cn(styles.notification, 'fixed-top')}
			show={isShow}
			variant={variant}
			onClose={onClose}
		>
			<div className={styles.notification__icon}>
				<SvgIcon variant={variant as SVG_ICON_TYPE} />
			</div>
			{message}
		</Alert>
	);
};
