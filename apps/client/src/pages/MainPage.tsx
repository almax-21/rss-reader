import React, { FC } from 'react';

import { ContentContainer } from '../components/Containers/ContentContainer';
import { RSSContainer } from '../components/Containers/RSSContainer';
import { BackToTopBtn } from '../components/UI/BackToTopBtn';

export const MainPage: FC = () => {
	return (
		<>
			<RSSContainer />
			<ContentContainer />
			<BackToTopBtn />
		</>
	);
};
