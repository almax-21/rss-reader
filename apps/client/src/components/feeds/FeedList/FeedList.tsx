import React, { FC } from 'react';
import { ListGroup } from 'react-bootstrap';

import { FeedWithCounter } from '../../../models/Feed';
import { FeedItem } from '../FeedItem';

import './style.scss';

interface FeedListProps {
	feeds: FeedWithCounter[];
}

export const FeedList: FC<FeedListProps> = ({ feeds }) => (
	<ListGroup numbered as="ol" className="feed-list">
		{feeds.map((feed) => (
			<FeedItem key={feed._id} feed={feed} />
		))}
	</ListGroup>
);
