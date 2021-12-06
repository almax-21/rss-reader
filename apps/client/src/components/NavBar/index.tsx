import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';

import useTypedDispatch from '../../hooks/redux/useTypedDispatch';
import useTypedSelector from '../../hooks/redux/useTypedSelector';
import { MESSAGES } from '../../i18n/types';
import { selectUser } from '../../store/selectors/userSelectors';
import { logoutUser } from '../../store/slices/userSlice';

import './style.scss';

const NavBar: FC = () => {
	const { username } = useTypedSelector(selectUser);
	const dispatch = useTypedDispatch();

	const handleSignOut = () => {
		dispatch(logoutUser());
		localStorage.removeItem('token');
	};

	return (
		<nav className="navigation header__navigation">
			<ul className="navigation__list">
				<li className="navigation__item">
					<a className="navigation__link navigation__link--disabled">
						{username}
					</a>
				</li>
				<li className="navigation__item">
					<a className="navigation__link" onClick={handleSignOut}>
						<FormattedMessage id={MESSAGES.SIGN_OUT} />
					</a>
				</li>
			</ul>
		</nav>
	);
};

export default NavBar;
