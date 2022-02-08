import React, { FC } from 'react';

import { ContentContainer } from '../components/containers/content-container';
import { RSSContainer } from '../components/containers/rss-container';
import { BackToTopBtn } from '../components/ui/back-to-top-btn';

export const MainPage: FC = () => {
	return (
		<>
			<RSSContainer />
			<ContentContainer />
			<BackToTopBtn />
		</>
	);
};
