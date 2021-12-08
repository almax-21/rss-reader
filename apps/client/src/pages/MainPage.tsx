import React, { FC } from 'react';

import ContentContainer from '../components/containers/ContentContainer';
import RSSContainer from '../components/containers/RSSContainer';
import BackToTopBtn from '../components/UI/BackToTopBtn';

const MainPage: FC = () => {
	return (
		<>
			<RSSContainer />
			<ContentContainer />
			<BackToTopBtn />
		</>
	);
};

export default MainPage;
