import { TimeoutId } from '../types';

export function throttle<T, K>(cb: (...args: T[]) => K, delay: number) {
	let isThrottle = false;

	return function (...args: T[]) {
		if (isThrottle) {
			return;
		}

		isThrottle = true;

		cb(...args);

		setTimeout(() => {
			isThrottle = false;
		}, delay);
	};
}

export function debounce<T, K>(cb: (...args: T[]) => K, delay: number) {
	let timerId = -1 as unknown as TimeoutId;

	return function (...args: T[]) {
		clearTimeout(timerId);

		const currentId = setTimeout(() => cb(...args), delay);

		timerId = currentId;
	};
}
