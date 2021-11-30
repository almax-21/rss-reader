import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';

import useTypedSelector from '../../hooks/redux/useTypedSelector';
import { MESSAGES } from '../../i18n/types';
import { selectFeedsAndPosts } from '../../store/selectors';

import FeedList from './FeedList';

const FeedContent: FC = () => {
	const { feeds } = useTypedSelector(selectFeedsAndPosts);

	return (
		<div>
			<h2 className="h3 mb-4">
				<FormattedMessage id={MESSAGES.FEEDS} />
			</h2>
			<FeedList feeds={feeds} />
		</div>
	);
};

export default FeedContent;
