import React, { FC } from 'react';
import { ListGroup } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import { MESSAGES } from '../i18n/types';
import { IFeed } from '../models/IFeed';

import FeedItem from './FeedItem';

interface FeedListProps {
	feeds: IFeed[];
}

const FeedList: FC<FeedListProps> = ({ feeds }) => {
	return (
		<div>
			<h2 className="h3 mb-4">
				<FormattedMessage id={MESSAGES.FEEDS} />
			</h2>
			<ListGroup as="ol" numbered>
				{feeds.map(({ id, title, description, postsCount }) => (
					<FeedItem
						key={id}
						title={title}
						description={description}
						postsCount={postsCount as number}
					/>
				))}
			</ListGroup>
		</div>
	);
};

export default FeedList;
