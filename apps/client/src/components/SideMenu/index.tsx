import React, { FC } from 'react';
import { ListGroup, Offcanvas } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import useTypedDispatch from '../../hooks/redux/useTypedDispatch';
import useTypedSelector from '../../hooks/redux/useTypedSelector';
import { MESSAGES } from '../../i18n/types';
import { selectUser } from '../../store/selectors/userSelectors';
import { logoutUser } from '../../store/slices/userSlice';
import { DELETE_AUTH_CACHE } from '../../types';
import LocaleSwitcher from '../LocaleSwitcher';
import SvgIcon from '../UI/SvgIcon';
import { SVG_ICON_VARIANTS } from '../UI/SvgIcon/types';

import './style.scss';

interface SideMenuProps {
	isShow: boolean;
	handleClose: () => void;
}

const SideMenu: FC<SideMenuProps> = ({ isShow, handleClose }) => {
	const { userData } = useTypedSelector(selectUser);
	const { username } = userData;

	const dispatch = useTypedDispatch();

	const handleSignOut = () => {
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.controller?.postMessage(DELETE_AUTH_CACHE);
		}

		dispatch(logoutUser());
		localStorage.removeItem('token');

		handleClose();
	};

	return (
		<Offcanvas placement="end" show={isShow} onHide={handleClose}>
			<Offcanvas.Header closeButton className="p-4">
				<SvgIcon height="32" variant={SVG_ICON_VARIANTS.USER} width="32" />
				<Offcanvas.Title>{username}</Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body>
				<ListGroup variant="flush">
					<ListGroup.Item className="menu-item px-0 pb-0">
						<LocaleSwitcher />
					</ListGroup.Item>
					<ListGroup.Item
						action
						className="menu-item px-2"
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
