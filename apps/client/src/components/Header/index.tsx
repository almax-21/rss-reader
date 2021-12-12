import React, { FC } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import useTypedSelector from '../../hooks/redux/useTypedSelector';
import { MESSAGES } from '../../i18n/types';
import { selectUser } from '../../store/selectors/userSelectors';
import LocaleSwitcher from '../LocaleSwitcher';
import NavBar from '../NavBar';

import './style.scss';

const Header: FC = () => {
	const { isAuth } = useTypedSelector(selectUser);

	return (
		<Container fluid as="header" className="bg-dark p-4">
			<Row className="justify-content-center">
				<Col
					className="d-flex justify-content-between flex-wrap"
					lg="9"
					md="10"
				>
					<LocaleSwitcher classes="header__locale-switcher" />
					{isAuth && <NavBar />}
				</Col>
			</Row>
			<Row className="justify-content-center">
				<Col className="text-white" lg="9" md="10">
					<h1 className="display-3 mb-0">
						<FormattedMessage id={MESSAGES.MAIN_HEADER} />
					</h1>
					{!isAuth && (
						<p className="lead">
							<FormattedMessage id={MESSAGES.LEAD} />
						</p>
					)}
				</Col>
			</Row>
		</Container>
	);
};

export default Header;
