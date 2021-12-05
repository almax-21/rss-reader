import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useHistory } from 'react-router';

import SignForm from '../components/SignForm';
import { MESSAGES } from '../i18n/types';
import { ROUTES } from '../router/types';

const Sign = () => {
	const { location } = useHistory();

	const formType = location.pathname === ROUTES.SIGN_IN
		? MESSAGES.SIGN_IN
		: MESSAGES.SIGN_UP;

	return (
		<Container fluid as="section" className="p-5">
			<Row className="d-flex justify-content-center align-items-center">
				<Col className="mb-5" md="8">
					<SignForm formType={formType} />
				</Col>
			</Row>
		</Container>
	);
};

export default Sign;
