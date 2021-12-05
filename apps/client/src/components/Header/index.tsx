import React, { FC } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import useTypedSelector from '../../hooks/redux/useTypedSelector';
import { MESSAGES } from '../../i18n/types';
import { selectAuthState } from '../../store/selectors/userSelectors';
import LocaleSwitcher from '../LocaleSwitcher';
import NavBar from '../NavBar';

import './style.scss';

const Header: FC = () => {
	const isAuth = useTypedSelector(selectAuthState);

	return (
		<Container fluid as="header" className="bg-dark p-5 pt-4 pb-5 pb-0">
			<Row className="justify-content-center">
				<Col className="d-flex justify-content-between flex-wrap" md="8">
					<LocaleSwitcher classes="header__locale-switcher" />
					{isAuth && <NavBar classes="header__navbar" />}
				</Col>
			</Row>
			<Row className="justify-content-center">
				<Col className="text-white" lg="8" md="10">
					<h1 className="display-3 mb-0">
						<FormattedMessage id={MESSAGES.MAIN_HEADER} />
					</h1>
					<p className="lead">
						<FormattedMessage id={MESSAGES.LEAD} />
					</p>
				</Col>
			</Row>
		</Container>
	);
};

export default Header;
