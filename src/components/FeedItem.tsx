import React, { FC } from 'react';
import { Badge, ListGroup } from 'react-bootstrap';

interface FeedItemProps {
	title: string;
	description: string;
	postsCount: number;
}

const FeedItem: FC<FeedItemProps> = ({ title, description, postsCount }) => {
	return (
		<ListGroup.Item
			as="li"
			className="d-flex justify-content-between align-items-start"
		>
			<div className="ms-2 me-auto">
				<h3 className="h5 fw-bold">{title}</h3>
				{description}
			</div>
			{!!postsCount && (
				<Badge pill bg="danger">
					{postsCount}
				</Badge>
			)}
		</ListGroup.Item>
	);
};

export default FeedItem;
