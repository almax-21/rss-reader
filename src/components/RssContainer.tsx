import React, { FC } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import { MESSAGES } from '../i18n/types';
import LocaleSwitcher from './LocaleSwitcher';
import RssForm from './RssForm';

const RssContainer: FC = () => {
	return (
		<>
			<Container className="bg-dark p-5 pt-4 pb-4" as="section" fluid>
				<Row className="justify-content-center">
					<Col md="10" lg="8" className="d-flex justify-content-end">
						{/* change language select */}
						<LocaleSwitcher />
					</Col>
				</Row>
				<Row className="justify-content-center">
					<Col md="10" lg="8" className="text-white">
						<h1 className="display-3 mb-0">
							<FormattedMessage id={MESSAGES.MAIN_HEADER} />
						</h1>
						<p className="lead">
							<FormattedMessage id={MESSAGES.LEAD} />
						</p>
						{/* form's here */}
						<RssForm />
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default RssContainer;
