import type { FC } from 'react';
import React, { useEffect, useRef } from 'react';

import { throttle } from '@/utils/perfomance';

import styles from './styles.module.scss';

export const ScrollTopBtn: FC = () => {
	const buttonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		const scrollHandler = throttle<Event, void>(() => {
			if (buttonRef.current) {
				buttonRef.current.style.display =
					window.scrollY > 300 ? 'block' : 'none';
			}
		}, 100);

		window.addEventListener('scroll', scrollHandler);

		return () => {
			window.removeEventListener('scroll', scrollHandler);
		};
	}, []);

	const handleBackToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<button
			ref={buttonRef}
			aria-hidden
			className={styles['scroll-top']}
			type="button"
			onClick={handleBackToTop}
		>
			<svg height="24" viewBox="0 0 24 24" width="24">
				<path d="M0 0h24v24H0V0z" fill="none" />
				<path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
			</svg>
		</button>
	);
};
