import { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';

import {
	NOTIFICATION_VARIANT,
	NotificationData,
} from '../components/UI/Notification/types';
import { MESSAGES } from '../i18n/types';
import { FEED_LOADED_STATES } from '../store/types';
import { TimeoutId } from '../types';

interface ReturnedHookData {
	isShowNotification: boolean;
	notificationData: NotificationData;
	onCloseNotification: () => void;
}

const useNotification = (
	feedLoadedState: FEED_LOADED_STATES,
	errorMessage: string
): ReturnedHookData => {
	const [isShowNotification, setIsShowNotification] = useState<boolean>(false);

	const notificationRef = useRef<NotificationData>({
		variant: '',
		message: '',
	});
	const timeoutIdRef = useRef<TimeoutId>(-1 as unknown as TimeoutId);

	const intl = useIntl();

	useEffect(() => {
		if (feedLoadedState && !isShowNotification) {
			switch (feedLoadedState) {
				case FEED_LOADED_STATES.SUCCESS:
					notificationRef.current = {
						variant: NOTIFICATION_VARIANT.SUCCESS,
						message: intl.formatMessage({ id: MESSAGES.SUCCESSFULLY_LOADED }),
					};
					break;
				case FEED_LOADED_STATES.ERROR:
					notificationRef.current = {
						variant: NOTIFICATION_VARIANT.ERROR,
						message: errorMessage,
					};
					break;
				default:
					console.error(`Unexpected "${feedLoadedState}" state!`);
					return;
			}

			setIsShowNotification(true);

			timeoutIdRef.current = setTimeout(() => {
				setIsShowNotification(false);
				notificationRef.current = { variant: '', message: '' };
			}, 3500);
		}
	}, [feedLoadedState]);

	const onCloseNotification = () => {
		clearTimeout(timeoutIdRef.current);
		setIsShowNotification(false);
	};

	return {
		isShowNotification,
		notificationData: notificationRef.current,
		onCloseNotification,
	};
};

export default useNotification;
