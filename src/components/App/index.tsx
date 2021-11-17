import React, { FC } from 'react';
import RSSContainer from '../RSSContainer';
import Footer from '../Footer';

import './App.scss';

const App: FC = () => {
	return (
		<main>
			<RSSContainer />
			<Footer />
		</main>
	);
};

export default App;
