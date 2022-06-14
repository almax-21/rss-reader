import React, { FC } from 'react';
import { useIntl } from 'react-intl';

import { MESSAGES } from '@/i18n/types';

import { BurgerBtnProps } from './types';

export const BurgerBtn: FC<BurgerBtnProps> = ({ isActive, onClick }) => {
	const intl = useIntl();

	return (
		<button
			aria-expanded={isActive}
			aria-label={intl.formatMessage({ id: MESSAGES.SETTINGS })}
			className="btn p-0"
			type="button"
			onClick={onClick}
		>
			<svg focusable="false" height="30" viewBox="0 0 30 30" width="30">
				<path
					d="M4 7h22M4 15h22M4 23h22"
					stroke="#0D6EFD"
					strokeWidth="2"
				></path>
			</svg>
		</button>
	);
};
