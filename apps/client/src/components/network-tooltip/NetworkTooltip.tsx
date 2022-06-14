import React from 'react';
import { FormattedMessage } from 'react-intl';

import { SvgIcon } from '@/components/UI/svg-icon';
import { SVG_ICON_VARIANTS } from '@/components/UI/svg-icon/types';
import { MESSAGES } from '@/i18n/types';

import './style.scss';

export const NetworkTooltip = () => {
	return (
		<div className="network-tooltip" role='alert'>
			<p className="network-tooltip__text">
				<SvgIcon
					className="network-tooltip__icon"
					height={20}
					variant={SVG_ICON_VARIANTS.WIFI_OFF}
					width={20}
				/>
				<FormattedMessage id={MESSAGES.OFFLINE_TOOLTIP} />
			</p>
		</div>
	);
};

