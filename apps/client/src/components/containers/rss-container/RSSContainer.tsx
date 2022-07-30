import type { FC } from 'react';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import { RSSForm } from '@/components/rss-form';

import styles from './styles.module.scss';

export const RSSContainer: FC = () => {
	return (
		<div className={styles.rss}>
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
