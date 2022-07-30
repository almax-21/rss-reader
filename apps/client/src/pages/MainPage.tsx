import type { FC } from 'react';
import React from 'react';

import { ContentContainer } from '@/components/containers/content-container';
import { RSSContainer } from '@/components/containers/rss-container';
import { ScrollTopBtn } from '@/components/UI/scroll-top-btn';

export const MainPage: FC = () => {
	return (
		<>
			<RSSContainer />
			<ContentContainer />
			<ScrollTopBtn />
		</>
	);
};
