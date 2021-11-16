import React, { FC } from 'react';
import { Alert } from 'react-bootstrap';

import './App.scss';

const App: FC = () => {
	return (
		<Alert style={{ textAlign: 'center' }} variant="success">
			<h1>Hello, World!</h1>
		</Alert>
	);
};

export default App;
