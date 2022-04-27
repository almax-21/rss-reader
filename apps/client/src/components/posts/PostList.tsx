import React, { FC } from 'react';
import { ListGroup } from 'react-bootstrap';

import { Post } from '../../models/Post';

import PostItem from './PostItem';

interface PostListProps {
	posts: Post[];
}

const PostList: FC<PostListProps> = React.memo(({ posts }) => (
	<ListGroup aria-live="polite" as="ul">
		{posts.map((post) => (
			<PostItem key={post._id} post={post} />
		))}
	</ListGroup>
));

PostList.displayName = 'PostList';

export default PostList;
