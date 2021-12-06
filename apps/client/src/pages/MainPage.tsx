import React, { FC } from 'react';

import ContentContainer from '../components/containers/ContentContainer';
import RSSContainer from '../components/containers/RSSContainer';

const MainPage: FC = () => {
	return (
		<>
			<RSSContainer />
			<ContentContainer />
		</>
	);
};

export default MainPage;
