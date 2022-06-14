import React, { FC } from 'react';
import { ListGroup } from 'react-bootstrap';

import { PostItem } from '../post-item';

import { PostListProps } from './types';

export const PostList: FC<PostListProps> = React.memo(({ posts }) => (
	<ListGroup aria-live="polite" as="ul">
		{posts.map((post) => (
			<PostItem key={post._id} post={post} />
		))}
	</ListGroup>
));

PostList.displayName = 'PostList';
