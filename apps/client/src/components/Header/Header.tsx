import React, { FC, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import useTypedSelector from '../../hooks/redux/useTypedSelector';
import { MESSAGES } from '../../i18n/types';
import { selectAuthState } from '../../store/selectors/userSelectors';
import { SideMenu } from '../side-menu';
import { BurgerBtn } from '../ui/burger-btn';

import './style.scss';

export const Header: FC = () => {
	const [isShowMenu, setIsShowMenu] = useState(false);
	const isAuth = useTypedSelector(selectAuthState);

	const handleShowMenu = () => {
		setIsShowMenu(true);
	};

	const handleCloseMenu = () => {
		setIsShowMenu(false);
	};

	return (
		<>
			{isAuth && <SideMenu handleClose={handleCloseMenu} isShow={isShowMenu} />}
			<header className="header">
				<Container className="p-4">
					<Row className="justify-content-center">
						<Col
							className="d-flex justify-content-between align-items-center text-white"
							md="11"
						>
							<h1 className="display-3 mb-0">
								<FormattedMessage id={MESSAGES.MAIN_HEADER} />
							</h1>
							{isAuth && <BurgerBtn onClick={handleShowMenu} />}
						</Col>
					</Row>
					<Row className="justify-content-center">
						<Col className="text-white" md="11">
							{!isAuth && (
								<p className="lead">
									<FormattedMessage id={MESSAGES.LEAD} />
								</p>
							)}
						</Col>
					</Row>
				</Container>
			</header>
		</>
	);
};
