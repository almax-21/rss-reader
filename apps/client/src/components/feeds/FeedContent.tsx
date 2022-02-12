import React, { FC } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import useTypedSelector from '../../hooks/redux/useTypedSelector';
import { MESSAGES } from '../../i18n/types';
import { selectFeedsWithCounter } from '../../store/selectors/contentSelectors';
import { selectSettings } from '../../store/selectors/settingsSelectors';

import { FeedList } from './FeedList';

import './style.scss';

export const FeedContent: FC = () => {
	const feeds = useTypedSelector(selectFeedsWithCounter);
	const { isAutoUpdate } = useTypedSelector(selectSettings);

	const intl = useIntl();

	const autoUpdateDisabledMessage = intl
		.formatMessage({ id: MESSAGES.AUTOUPDATE_DISABLED })
		.toLowerCase();

	return (
		<div className="feeds-content">
			<h2 className="h3 mb-4">
				<FormattedMessage id={MESSAGES.FEEDS} />{' '}
				{!isAutoUpdate && (
					<span style={{ fontSize: 18 }}>
						{` (${autoUpdateDisabledMessage})`}
					</span>
				)}
			</h2>
			<FeedList feeds={feeds} />
		</div>
	);
};
