import React, { FC } from 'react';
import { ListGroup } from 'react-bootstrap';

import { IPost } from '../../types/index';

import PostItem from './PostItem';

interface PostListProps {
	posts: IPost[];
}

const PostList: FC<PostListProps> = React.memo(({ posts }) => (
	<ListGroup as="ul">
		{posts.map((post) => (
			<PostItem key={post.id} post={post} />
		))}
	</ListGroup>
));

PostList.displayName = 'PostList';

export default PostList;
