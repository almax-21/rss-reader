export const throttle = (cb: (...args: any[]) => any, delay: number) => {
	let isThrottle = false;

	return () => {
		if (isThrottle) {
			return;
		}

		isThrottle = true;

		cb();

		setTimeout(() => {
			isThrottle = false;
		}, delay);
	};
};
