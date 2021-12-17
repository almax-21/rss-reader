import React, { FC } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import useTypedSelector from '../../hooks/redux/useTypedSelector';
import { MESSAGES } from '../../i18n/types';
import { selectFeedsWithCounter } from '../../store/selectors/contentSelectors';
import { selectUserData } from '../../store/selectors/userSelectors';

import FeedList from './FeedList';

const FeedContent: FC = () => {
	const feeds = useTypedSelector(selectFeedsWithCounter);
	const { isAutoUpdateEnabled } = useTypedSelector(selectUserData);

	const intl = useIntl();

	const autoUpdateDisabledMessage = intl
		.formatMessage({ id: MESSAGES.AUTOUPDATE_DISABLED })
		.toLowerCase();

	return (
		<div>
			<h2 className="h3 mb-4">
				<FormattedMessage id={MESSAGES.FEEDS} />{' '}
				{!isAutoUpdateEnabled && (
					<span style={{ fontSize: 18 }}>
						{` (${autoUpdateDisabledMessage})`}
					</span>
				)}
			</h2>
			<FeedList feeds={feeds} />
		</div>
	);
};

export default FeedContent;
