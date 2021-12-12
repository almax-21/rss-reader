import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useHistory } from 'react-router';

import SignInForm from '../components/SignForm/SignIn';
import SignUpForm from '../components/SignForm/SignUp';
import { ROUTES } from '../router/types';

const SignPage = () => {
	const { location } = useHistory();

	return (
		<Container fluid as="section" className="p-4 pt-5">
			<Row className="d-flex justify-content-center align-items-center">
				<Col className="mb-5" lg="9" md="10">
					{location.pathname === ROUTES.SIGN_IN ? (
						<SignInForm />
					) : (
						<SignUpForm />
					)}
				</Col>
			</Row>
		</Container>
	);
};

export default SignPage;
