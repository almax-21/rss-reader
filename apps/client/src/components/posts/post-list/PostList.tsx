import type { FC } from 'react';
import React from 'react';
import { ListGroup } from 'react-bootstrap';

import { PostItem } from '../post-item';

import type { PostListProps } from './types';

export const PostList: FC<PostListProps> = React.memo(({ posts }) => (
	<ListGroup aria-live="polite" as="ul">
		{posts.map((post) => (
			<PostItem key={post._id} post={post} />
		))}
	</ListGroup>
));

PostList.displayName = 'PostList';
