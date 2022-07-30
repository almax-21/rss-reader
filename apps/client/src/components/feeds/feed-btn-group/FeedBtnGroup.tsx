import type { FC, KeyboardEvent } from 'react';
import React from 'react';
import { CloseButton } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import cn from 'classnames';

import { MODAL_TYPES } from '@/components/UI/my-modal/types';
import { SvgIcon } from '@/components/UI/svg-icon';
import { SVG_ICON_VARIANTS } from '@/components/UI/svg-icon/types';
import { useTypedSelector } from '@/hooks';
import { MESSAGES } from '@/i18n/types';
import { selectSettings } from '@/store/selectors/settingsSelectors';

import type { FeedBtnGroupProps } from './types';

import styles from './styles.module.scss'

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
				className={cn('btn', styles['reload-btn'])}
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

