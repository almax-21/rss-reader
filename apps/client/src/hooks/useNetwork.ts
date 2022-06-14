import { useEffect, useState } from 'react';

export const useNetwork = (): boolean => {
	const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

	useEffect(() => {
		const getOnlineHandler = () => {
			setIsOnline(true);
		};

		const getOfflineHandler = () => {
			setIsOnline(false);
		};

		window.addEventListener('online', getOnlineHandler);
		window.addEventListener('offline', getOfflineHandler);

		return () => {
			window.removeEventListener('online', getOnlineHandler);
			window.removeEventListener('offline', getOfflineHandler);
		};
	}, []);

	return isOnline;
};
