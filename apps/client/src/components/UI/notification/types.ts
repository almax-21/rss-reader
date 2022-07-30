import type { Variant } from 'react-bootstrap/esm/types';

export enum NOTIFICATION_VARIANT {
	SUCCESS = 'success',
	ERROR = 'danger',
}

export interface NotificationData {
	variant: Variant;
	message: string;
}

export interface NotificationProps {
	data: NotificationData;
	isShow: boolean;
	onClose: () => void;
}
