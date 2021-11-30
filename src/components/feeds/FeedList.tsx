import React, { FC } from 'react';
import { ListGroup } from 'react-bootstrap';

import { IFeedWithCounter } from '../../types';

import FeedItem from './FeedItem';

interface FeedListProps {
	feeds: IFeedWithCounter[];
}

const FeedList: FC<FeedListProps> = ({ feeds }) => (
	<ListGroup numbered as="ol">
		{feeds.map(({ id, title, description, unreadPostsCount }) => (
			<FeedItem
				key={id}
				description={description}
				id={id}
				title={title}
				unreadPostsCount={unreadPostsCount}
			/>
		))}
	</ListGroup>
);

export default FeedList;
