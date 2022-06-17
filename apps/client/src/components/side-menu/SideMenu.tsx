import React, { FC } from 'react';
import { Form, ListGroup, Offcanvas } from 'react-bootstrap';
import { FormattedMessage, useIntl } from 'react-intl';
import { AnyAction } from '@reduxjs/toolkit';
import cn from 'classnames';

import { LocaleSwitcher } from '@/components/locale-switcher';
import { SvgIcon } from '@/components/UI/svg-icon';
import { SVG_ICON_VARIANTS } from '@/components/UI/svg-icon/types';
import { useTypedDispatch, useTypedSelector } from '@/hooks';
import { MESSAGES } from '@/i18n/types';
import { selectSettings } from '@/store/selectors/settingsSelectors';
import { selectUserData } from '@/store/selectors/userSelectors';
import { setIsAutoUpdate, setIsDarkTheme } from '@/store/slices/settingsSlice';
import { logoutUser } from '@/store/slices/userSlice';
import {
	AUTO_UPDATE_KEY,
	DARK_THEME_KEY,
	DELETE_AUTH_CACHE,
	TOKEN_KEY,
} from '@/types/constants';

import { SideMenuProps } from './types';

import styles from './styles.module.scss';

export const SideMenu: FC<SideMenuProps> = ({ isShow, handleClose }) => {
	const { username } = useTypedSelector(selectUserData);

	const { isDarkTheme, isAutoUpdate } = useTypedSelector(selectSettings);

	const dispatch = useTypedDispatch();
	const intl = useIntl();

	const handleSwitchState = (
		prevState: boolean,
		actionCreator: (newState: boolean) => AnyAction,
		storageKey: string
	) => {
		return () => {
			const newState = !prevState;

			dispatch(actionCreator(newState));

			if (newState) {
				localStorage.setItem(storageKey, String(newState));
			} else {
				localStorage.removeItem(storageKey);
			}
		};
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
				className={cn(styles['side-menu__header'], 'p-4')}
				closeVariant={isDarkTheme ? 'white' : undefined}
			>
				<SvgIcon height="32" variant={SVG_ICON_VARIANTS.USER} width="32" />
				<h3 className="visually-hidden">
					<FormattedMessage id={MESSAGES.SETTINGS_MENU} />
				</h3>
				<Offcanvas.Title>{username}</Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body className={styles['side-menu__body']}>
				<ListGroup variant="flush">
					<ListGroup.Item className="list-item menu-item px-2">
						<Form.Switch
							checked={isDarkTheme}
							id="theme-mode"
							label={intl.formatMessage({ id: MESSAGES.DARK_THEME })}
							type="switch"
							onChange={handleSwitchState(
								isDarkTheme,
								setIsDarkTheme,
								DARK_THEME_KEY
							)}
						/>
					</ListGroup.Item>
					<ListGroup.Item className="list-item menu-item px-2">
						<Form.Switch
							checked={isAutoUpdate}
							id="feeds-auto-update"
							label={intl.formatMessage({ id: MESSAGES.FEEDS_AUTOUPDATE })}
							type="switch"
							onChange={handleSwitchState(
								isAutoUpdate,
								setIsAutoUpdate,
								AUTO_UPDATE_KEY
							)}
						/>
					</ListGroup.Item>
					<ListGroup.Item className="menu-item p-0">
						<LocaleSwitcher />
					</ListGroup.Item>
					<ListGroup.Item
						action
						as="button"
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
