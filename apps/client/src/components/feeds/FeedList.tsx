import React, { FC } from 'react';
import { ListGroup } from 'react-bootstrap';

import useTypedSelector from '../../hooks/redux/useTypedSelector';
import useDraggableList from '../../hooks/useDraggableList';
import { IFeedWithCounter } from '../../models/IFeed';
import { selectFeedIds } from '../../store/selectors/contentSelectors';

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
					key={feed._id}
					dragHandlers={dragHandlers}
					feed={feed}
					order={order}
				/>
			))}
		</ListGroup>
	);
};

export default FeedList;
