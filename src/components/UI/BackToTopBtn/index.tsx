import './style.scss';
import React, { FC, useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';

import throttle from 'lodash/throttle';

const BackToTopBtn: FC = () => {
	const buttonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		const scrollHandler = throttle(() => {
			if (buttonRef.current) {
				buttonRef.current.style.display =
					window.scrollY > 300 ? 'block' : 'none';
			}
		}, 150);

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
		<Button
			variant="outline-primary"
			className="back-to-top"
			onClick={handleBackToTop}
			ref={buttonRef}
		>
			<svg width="20" height="20" viewBox="0 0 24 24">
				<path d="M0 0h24v24H0V0z" fill="none" />
				<path
					fill="#000000"
					d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"
				/>
			</svg>
		</Button>
	);
};

export default BackToTopBtn;
