import React, { FC } from 'react';

const Footer: FC = () => {
	return (
		<footer className="fixed-bottom bg-light border-top p-3">
			<p className="text-center mb-0">
				created by&nbsp;
				<a
					href="https://ru.hexlet.io/programs/frontend/projects/11"
					target="_blank"
					rel="noreferrer"
				>
					Hexlet
				</a>
			</p>
		</footer>
	);
};

export default Footer;
