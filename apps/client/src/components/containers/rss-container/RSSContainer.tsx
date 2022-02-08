import React, { FC } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import { RSSForm } from '../../rss-form';

import './style.scss';

export const RSSContainer: FC = () => {
	return (
		<div className="rss">
			<Container as="section" className="p-4 pt-0">
				<Row className="justify-content-center">
					<Col className="text-white" md="11">
						<RSSForm />
					</Col>
				</Row>
			</Container>
		</div>
	);
};
