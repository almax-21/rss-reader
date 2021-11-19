import React, { FC } from 'react';
import { Badge, ListGroup } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import { MESSAGES } from '../i18n/types';
import { IFeed } from '../models/IFeed';

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
					<ListGroup.Item
						key={id}
						as="li"
						className="d-flex justify-content-between align-items-start"
					>
						<div className="ms-2 me-auto">
							<h3 className="h5 fw-bold">{title}</h3>
							{description}
						</div>
						<Badge pill>
							{postsCount}
						</Badge>
					</ListGroup.Item>
				))}
			</ListGroup>
		</div>
	);
};

export default FeedList;
