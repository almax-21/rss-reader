import React, { FC } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import RSSForm from './RSSForm';

const RSSContainer: FC = () => {
	return (
		<Container className="bg-dark p-5" as="section" fluid>
			<Row className="justify-content-center">
				<Col md="10" lg="8" className="text-white">
					<h1 className="display-3 mb-0">RSS агрегатор</h1>
					<p className="lead">
						Начните читать RSS сегодня! Это легко, это красиво.
					</p>
					<RSSForm />
				</Col>
			</Row>
		</Container>
	);
};

export default RSSContainer;
