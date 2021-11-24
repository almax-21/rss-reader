import React, { FC } from 'react';
import { Badge, CloseButton, ListGroup } from 'react-bootstrap';

import useTypedDispatch from '../../hooks/redux/useTypedDispatch';
import { deleteFeed } from '../../store/slices/rssSlice';
import { truncateText } from '../../utils/text';

interface FeedItemProps {
	id: string;
	title: string;
	description: string;
	postsCount: number;
}

const FeedItem: FC<FeedItemProps> = ({
	id,
	title,
	description,
	postsCount,
}) => {
	const dispatch = useTypedDispatch();

	return (
		<ListGroup.Item
			as="li"
			className="d-flex justify-content-between align-items-start"
		>
			<div className="ms-2 me-auto">
				<div className="d-flex align-items-center">
					<h3 className="h5 fw-bold" style={{ marginRight: 5 }}>
						{title}
					</h3>
					<Badge pill bg="danger" className="mb-2">
						{postsCount}
					</Badge>
				</div>
				<span>{truncateText(description)}</span>
			</div>
			{!!postsCount && (
				<div>
					<CloseButton onClick={() => dispatch(deleteFeed(id))} />
				</div>
			)}
		</ListGroup.Item>
	);
};

export default FeedItem;
