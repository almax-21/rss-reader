import { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';

import {
	NOTIFICATION_VARIANT,
	NotificationData,
} from '../components/UI/Notification/types';
import { MESSAGES } from '../i18n/types';
import { RSS_LOADED_STATES } from '../store/types';
import { TimeoutId } from '../types';

interface ReturnedHookData {
	isShowNotification: boolean;
	notificationData: NotificationData;
	onCloseNotification: () => void;
}

const useNotification = (
	rssLoadedState: RSS_LOADED_STATES,
	errorMessage: string,
	timeMs: number
): ReturnedHookData => {
	const [isShowNotification, setIsShowNotification] = useState<boolean>(false);

	const notificationDataRef = useRef<NotificationData>({
		variant: '',
		message: '',
	});
	const timeoutIdRef = useRef<TimeoutId>(-1 as unknown as TimeoutId);

	const intl = useIntl();

	useEffect(() => {
		if (rssLoadedState && !isShowNotification) {
			switch (rssLoadedState) {
				case RSS_LOADED_STATES.SUCCESS:
					notificationDataRef.current = {
						variant: NOTIFICATION_VARIANT.SUCCESS,
						message: intl.formatMessage({ id: MESSAGES.SUCCESSFULLY_LOADED }),
					};
					break;
				case RSS_LOADED_STATES.ERROR:
					notificationDataRef.current = {
						variant: NOTIFICATION_VARIANT.ERROR,
						message: errorMessage,
					};
					break;
				default:
					console.error(`Unexpected "${rssLoadedState}" state!`);
					return;
			}

			setIsShowNotification(true);

			timeoutIdRef.current = setTimeout(() => {
				setIsShowNotification(false);
				notificationDataRef.current = { variant: '', message: '' };
			}, timeMs);
		}
	}, [rssLoadedState]);

	const onCloseNotification = () => {
		clearTimeout(timeoutIdRef.current);
		setIsShowNotification(false);
	};

	return {
		isShowNotification,
		notificationData: notificationDataRef.current,
		onCloseNotification,
	};
};

export default useNotification;
