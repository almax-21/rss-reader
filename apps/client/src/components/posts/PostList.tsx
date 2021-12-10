import React, { FC } from 'react';
import { ListGroup } from 'react-bootstrap';

import { IPost } from '../../models/IPost';

import PostItem from './PostItem';

interface PostListProps {
	posts: IPost[];
}

const PostList: FC<PostListProps> = React.memo(({ posts }) => (
	<ListGroup as="ul">
		{posts.map((post) => (
			<PostItem key={post._id} post={post} />
		))}
	</ListGroup>
));

PostList.displayName = 'PostList';

export default PostList;
