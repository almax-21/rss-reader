import React, { FC, MouseEvent } from 'react';
import { CloseButton } from 'react-bootstrap';
import { useIntl } from 'react-intl';

import useTypedSelector from '../../../hooks/redux/useTypedSelector';
import { MESSAGES } from '../../../i18n/types';
import { selectSettings } from '../../../store/selectors/settingsSelectors';
import { MODAL_TYPE, MODAL_TYPES } from '../../UI/MyModal/types';
import SvgIcon from '../../UI/SvgIcon/index';
import { SVG_ICON_VARIANTS } from '../../UI/SvgIcon/types';

interface FeedBtnGroupProps {
	handleOpenModal: (
		modalType: MODAL_TYPE
	) => (event: MouseEvent<HTMLButtonElement>) => void;
}

const FeedBtnGroup: FC<FeedBtnGroupProps> = ({ handleOpenModal }) => {
	const { isDarkTheme } = useTypedSelector(selectSettings);

	const intl = useIntl();

	return (
		<div className="d-flex flex-column justify-content-between">
			<CloseButton
				aria-label={intl.formatMessage({ id: MESSAGES.DELETE })}
				title={intl.formatMessage({ id: MESSAGES.DELETE })}
				variant={isDarkTheme ? 'white' : undefined}
				onClick={handleOpenModal(MODAL_TYPES.DELETE)}
			/>
			<button
				aria-label={intl.formatMessage({ id: MESSAGES.RELOAD })}
				className="btn feed-item__reload-btn"
				title={intl.formatMessage({ id: MESSAGES.RELOAD })}
				type="button"
				onClick={handleOpenModal(MODAL_TYPES.RELOAD)}
			>
				<SvgIcon variant={SVG_ICON_VARIANTS.RELOAD} />
			</button>
		</div>
	);
};

export default FeedBtnGroup;
