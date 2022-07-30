import { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';

import type { NotificationData } from '@/components/UI/notification/types';
import { NOTIFICATION_VARIANT } from '@/components/UI/notification/types';
import { COMPLETED_LOAD_STATUS } from '@/store/types';
import type { TimeoutId } from '@/types';

interface ReturnedHookData {
	isShowNotification: boolean;
	notificationData: NotificationData;
	hideNotification: () => void;
}

export const useNotification = (
	completedLoadStatus: COMPLETED_LOAD_STATUS,
	successMessage: string,
	errorMessage: string,
	timeMs = 3500,
): ReturnedHookData => {
	const [isShowNotification, setIsShowNotification] = useState<boolean>(false);

	const notificationDataRef = useRef<NotificationData>({
		variant: '',
		message: '',
	});
	const timeoutIdRef = useRef<TimeoutId>(-1 as unknown as TimeoutId);

	const intl = useIntl();

	const hideNotification = () => {
		clearTimeout(timeoutIdRef.current);
		setIsShowNotification(false);
	};

	useEffect(() => {
		if (completedLoadStatus && !isShowNotification) {
			switch (completedLoadStatus) {
				case COMPLETED_LOAD_STATUS.SUCCESS:
					notificationDataRef.current = {
						variant: NOTIFICATION_VARIANT.SUCCESS,
						message: intl.formatMessage({ id: successMessage }),
					};
					break;
				case COMPLETED_LOAD_STATUS.FAILURE:
					notificationDataRef.current = {
						variant: NOTIFICATION_VARIANT.ERROR,
						message: intl.formatMessage({ id: errorMessage }),
					};
					break;
				default:
					console.error(`Unexpected "${completedLoadStatus}" state!`);
					return;
			}

			setIsShowNotification(true);

			timeoutIdRef.current = setTimeout(() => {
				setIsShowNotification(false);
				notificationDataRef.current = { variant: '', message: '' };
			}, timeMs);
		}

		return () => {
			hideNotification();
		};
	}, [completedLoadStatus]);

	return {
		isShowNotification,
		notificationData: notificationDataRef.current,
		hideNotification,
	};
};
