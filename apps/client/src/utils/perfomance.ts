import { TimeoutId } from '../types';

export const throttle = (cb: (...args: any[]) => any, delay: number) => {
	let isThrottle = false;

	return (...args: any[]) => {
		if (isThrottle) {
			return;
		}

		isThrottle = true;

		cb(...args);

		setTimeout(() => {
			isThrottle = false;
		}, delay);
	};
};

export const debounce = (cb: (...args: any[]) => any, delay: number) => {
	let timerId = -1 as unknown as TimeoutId;

	return (...args: any[]) => {
		clearTimeout(timerId);

		const currentId = setTimeout(() => cb(...args), delay);

		timerId = currentId;
	};
};
