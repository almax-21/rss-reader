import React, { FC } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import useTypedDispatch from '../hooks/redux/useTypedDispatch';
import useTypedSelector from '../hooks/redux/useTypedSelector';
import { MESSAGES } from '../i18n/types';
import { selectUser } from '../store/selectors/userSelectors';
import { logoutUser } from '../store/slices/userSlice';

interface NavBarProps {
	classes: string;
}

const NavBar: FC<NavBarProps> = ({ classes }) => {
	const { username } = useTypedSelector(selectUser);
	const dispatch = useTypedDispatch();

	const handleSignOut = () => {
		dispatch(logoutUser());
		localStorage.removeItem('token');
	};

	return (
		<nav>
			<ListGroup horizontal className={classes}>
				<ListGroup.Item className="py-1 px-2" variant="success">
					{username}
				</ListGroup.Item>
				<ListGroup.Item
					action
					as={Button}
					className="py-1 px-2 rounded-0 rounded-end"
					variant="primary"
					onClick={handleSignOut}
				>
					<FormattedMessage id={MESSAGES.SIGN_OUT} />
				</ListGroup.Item>
			</ListGroup>
		</nav>
	);
};

export default NavBar;
