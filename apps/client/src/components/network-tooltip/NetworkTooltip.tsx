import React from 'react';
import { FormattedMessage } from 'react-intl';

import { SvgIcon } from '@/components/UI/svg-icon';
import { SVG_ICON_VARIANTS } from '@/components/UI/svg-icon/types';
import { MESSAGES } from '@/i18n/types';

import styles from './styles.module.scss';

export const NetworkTooltip = () => {
	return (
		<div className={styles['network-tooltip']} role="alert">
			<p className={styles['network-tooltip__text']}>
				<SvgIcon
					className={styles['network-tooltip__icon']}
					height={20}
					variant={SVG_ICON_VARIANTS.WIFI_OFF}
					width={20}
				/>
				<FormattedMessage id={MESSAGES.OFFLINE_TOOLTIP} />
			</p>
		</div>
	);
};
