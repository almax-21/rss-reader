import React, { FC } from 'react';
import cn from 'classnames';

import useTypedSelector from '../../hooks/redux/useTypedSelector';
import { selectSettings } from '../../store/selectors/settingsSelectors';

interface CloseBtnProps {
	isVisible?: any;
	className?: string;
	onClick: () => void;
}

const CloseBtn: FC<CloseBtnProps> = ({
	isVisible = true,
	className = '',
	onClick,
}) => {
	const { isDarkTheme } = useTypedSelector(selectSettings);

	if (!isVisible) {
		return null;
	}

	const classes = cn(className, 'btn-close', {
		'btn-close-white': isDarkTheme,
	});

	return (
		<button
			aria-label="Close"
			className={classes}
			type="button"
			onClick={onClick}
		/>
	);
};

export default CloseBtn;
