import React, { FC } from 'react';
import { ListGroup } from 'react-bootstrap';

import useTypedSelector from '../../hooks/redux/useTypedSelector';
import useDraggableList from '../../hooks/useDraggableList';
import { selectFeedIds } from '../../store/selectors/contentSelectors';
import { IFeedWithCounter } from '../../types';

import FeedItem from './FeedItem';

interface FeedListProps {
	feeds: IFeedWithCounter[];
}

const FeedList: FC<FeedListProps> = ({ feeds }) => {
	const feedIds = useTypedSelector(selectFeedIds);

	const dragHandlers = useDraggableList(feedIds);

	return (
		<ListGroup numbered as="ol">
			{feeds.map((feed, order) => (
				<FeedItem
					key={feed.id}
					description={feed.description}
					dragHandlers={dragHandlers}
					id={feed.id}
					order={order}
					title={feed.title}
					unreadPostsCount={feed.unreadPostsCount}
				/>
			))}
		</ListGroup>
	);
};

export default FeedList;
