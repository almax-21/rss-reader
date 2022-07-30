import type { FC } from 'react';
import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import { SideMenu } from '@/components/side-menu';
import { BurgerBtn } from '@/components/UI/burger-btn';
import { useTypedSelector } from '@/hooks';
import { MESSAGES } from '@/i18n/types';
import { selectAuthState } from '@/store/selectors/userSelectors';

import styles from './styles.module.scss';

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
			<header className={styles.header}>
				<Container className="p-4">
					<Row className="justify-content-center">
						<Col
							className="d-flex justify-content-between align-items-center text-white"
							md="11"
						>
							<h1 className="display-3 mb-0">
								<FormattedMessage id={MESSAGES.MAIN_HEADER} />
							</h1>
							{isAuth && (
								<BurgerBtn isActive={isShowMenu} onClick={handleShowMenu} />
							)}
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
