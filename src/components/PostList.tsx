import React, { FC } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import { MESSAGES } from '../i18n/types';
import { IPost } from '../models/IPost';

interface PostListProps {
	posts: IPost[];
}

const PostList: FC<PostListProps> = ({ posts }) => {
	return (
		<div>
			<h2 className="h3 mb-4">
				<FormattedMessage id={MESSAGES.POSTS} />
			</h2>
			<ListGroup as="ul">
				{posts.map(({ title, id }) => (
					<ListGroup.Item key={id} as="li" className="mb-3 p-0 border-0">
						<Card className="border-0">
							<Card.Title className="h6 fw-bold">
								<Card.Link href="#">{title}</Card.Link>
							</Card.Title>
						</Card>
					</ListGroup.Item>
				))}
			</ListGroup>
		</div>
	);
};

export default PostList;
