import { Variant } from 'react-bootstrap/esm/types';

export enum NOTIFICATION_VARIANT {
	SUCCESS = 'success',
	WARNING = 'warning',
	ERROR = 'danger',
}

export interface NotificationData {
	variant: Variant;
	message: string;
}
