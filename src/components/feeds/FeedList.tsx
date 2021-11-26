import React, { FC } from 'react';
import { ListGroup } from 'react-bootstrap';

import { IFeed } from '../../types';

import FeedItem from './FeedItem';

interface FeedListProps {
	feeds: IFeed[];
}

const FeedList: FC<FeedListProps> = ({ feeds }) => {
	return (
		<ListGroup numbered as="ol">
			{feeds.map(({ id, title, description, unreadPostsCount }) => (
				<FeedItem
					key={id}
					description={description}
					id={id}
					title={title}
					unreadPostsCount={unreadPostsCount as number}
				/>
			))}
		</ListGroup>
	);
};

export default FeedList;
