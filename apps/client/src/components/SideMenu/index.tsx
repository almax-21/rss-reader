import React, { FC } from 'react';
import { Form, ListGroup, Offcanvas } from 'react-bootstrap';
import { FormattedMessage, useIntl } from 'react-intl';

import useTypedDispatch from '../../hooks/redux/useTypedDispatch';
import useTypedSelector from '../../hooks/redux/useTypedSelector';
import { MESSAGES } from '../../i18n/types';
import userAPI from '../../services/UserService';
import { selectSettings } from '../../store/selectors/settingsSelectors';
import { selectUserData } from '../../store/selectors/userSelectors';
import { setIsDarkTheme } from '../../store/slices/settingsSlice';
import { logoutUser } from '../../store/slices/userSlice';
import {
	DARK_THEME_KEY,
	DELETE_AUTH_CACHE,
	TOKEN_KEY,
} from '../../types/constants';
import LocaleSwitcher from '../LocaleSwitcher';
import SvgIcon from '../UI/SvgIcon';
import { SVG_ICON_VARIANTS } from '../UI/SvgIcon/types';

import './style.scss';

interface SideMenuProps {
	isShow: boolean;
	handleClose: () => void;
}

const SideMenu: FC<SideMenuProps> = ({ isShow, handleClose }) => {
	const { username, isAutoUpdateEnabled } = useTypedSelector(selectUserData);

	const { isDarkTheme } = useTypedSelector(selectSettings);
	const [setIsAutoUpdateEnabled] = userAPI.useSetIsAutoUpdateEnabledMutation();

	const dispatch = useTypedDispatch();
	const intl = useIntl();

	const handleThemeState = () => {
		const newDarkThemeState = !isDarkTheme;

		dispatch(setIsDarkTheme(newDarkThemeState));

		if (newDarkThemeState) {
			localStorage.setItem(DARK_THEME_KEY, String(newDarkThemeState));
		} else {
			localStorage.removeItem(DARK_THEME_KEY);
		}
	};

	const handleAutoUpdateState = () => {
		setIsAutoUpdateEnabled(!isAutoUpdateEnabled);
	};

	const handleSignOut = () => {
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.controller?.postMessage(DELETE_AUTH_CACHE);
		}

		dispatch(logoutUser());
		localStorage.removeItem(TOKEN_KEY);

		handleClose();
	};

	return (
		<Offcanvas placement="end" show={isShow} onHide={handleClose}>
			<Offcanvas.Header
				closeButton
				className="side-menu__header p-4"
				closeVariant={isDarkTheme ? 'white' : undefined}
			>
				<SvgIcon height="32" variant={SVG_ICON_VARIANTS.USER} width="32" />
				<Offcanvas.Title>{username}</Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body className="side-menu__body">
				<ListGroup as="ul" variant="flush">
					<ListGroup.Item as="li" className="list-item menu-item px-2">
						<Form.Switch
							checked={isDarkTheme}
							id="theme-mode"
							label={intl.formatMessage({ id: MESSAGES.DARK_THEME })}
							type="switch"
							onChange={handleThemeState}
						/>
					</ListGroup.Item>
					<ListGroup.Item as="li" className="list-item menu-item px-2">
						<Form.Switch
							checked={isAutoUpdateEnabled}
							id="feeds-auto-update"
							label={intl.formatMessage({ id: MESSAGES.FEEDS_AUTOUPDATE })}
							type="switch"
							onChange={handleAutoUpdateState}
						/>
					</ListGroup.Item>
					<ListGroup.Item as="li" className="menu-item p-0">
						<LocaleSwitcher />
					</ListGroup.Item>
					<ListGroup.Item
						action
						as="li"
						className="list-item menu-item px-2"
						onClick={handleSignOut}
					>
						<SvgIcon
							className="mb-1"
							height="18"
							variant={SVG_ICON_VARIANTS.SIGN_OUT}
							width="18"
						/>
						<span className="menu-item__text">
							<FormattedMessage id={MESSAGES.SIGN_OUT} />
						</span>
					</ListGroup.Item>
				</ListGroup>
			</Offcanvas.Body>
		</Offcanvas>
	);
};

export default SideMenu;
