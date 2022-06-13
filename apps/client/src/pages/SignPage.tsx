import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useHistory } from 'react-router';

import { SignIn } from '@/components/sign-form/sign-in';
import { SignUp } from '@/components/sign-form/sign-up';
import { ROUTES } from '@/router/types';

const SignPage = () => {
	const { location } = useHistory();

	return (
		<Container as="section" className="p-4 pt-5">
			<Row className="d-flex justify-content-center align-items-center">
				<Col className="mb-5" md="11">
					{location.pathname === ROUTES.SIGN_IN ? (
						<SignIn />
					) : (
						<SignUp />
					)}
				</Col>
			</Row>
		</Container>
	);
};

export default SignPage;
