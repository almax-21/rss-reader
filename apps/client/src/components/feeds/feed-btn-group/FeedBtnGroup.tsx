import React, { FC, KeyboardEvent, MouseEvent } from 'react';
import { CloseButton } from 'react-bootstrap';
import { useIntl } from 'react-intl';

import { MODAL_TYPE, MODAL_TYPES } from '@/components/UI/my-modal/types';
import SvgIcon from '@/components/UI/SvgIcon/index';
import { SVG_ICON_VARIANTS } from '@/components/UI/SvgIcon/types';
import useTypedSelector from '@/hooks/redux/useTypedSelector';
import { MESSAGES } from '@/i18n/types';
import { selectSettings } from '@/store/selectors/settingsSelectors';

interface FeedBtnGroupProps {
	handleOpenModal: (
		modalType: MODAL_TYPE
	) => (event: MouseEvent<HTMLButtonElement>) => void;
}

export const FeedBtnGroup: FC<FeedBtnGroupProps> = ({ handleOpenModal }) => {
	const { isDarkTheme } = useTypedSelector(selectSettings);

	const intl = useIntl();

	const handleKeyPress = (evt: KeyboardEvent) => evt.stopPropagation();

	return (
		<div className="d-flex flex-column justify-content-between">
			<CloseButton
				aria-haspopup="dialog"
				aria-label={intl.formatMessage({ id: MESSAGES.DELETE })}
				title={intl.formatMessage({ id: MESSAGES.DELETE })}
				variant={isDarkTheme ? 'white' : undefined}
				onClick={handleOpenModal(MODAL_TYPES.DELETE)}
				onKeyPress={handleKeyPress}
			/>
			<button
				aria-haspopup="dialog"
				aria-label={intl.formatMessage({ id: MESSAGES.RELOAD })}
				className="btn feed-item__reload-btn"
				title={intl.formatMessage({ id: MESSAGES.RELOAD })}
				type="button"
				onClick={handleOpenModal(MODAL_TYPES.RELOAD)}
				onKeyPress={handleKeyPress}
			>
				<SvgIcon variant={SVG_ICON_VARIANTS.RELOAD} />
			</button>
		</div>
	);
};

