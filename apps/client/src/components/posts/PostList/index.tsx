import React, { FC } from 'react';
import { ListGroup } from 'react-bootstrap';

import { IPost } from '../../../types/index';
import PostItem from '../PostItem';

interface PostListProps {
	posts: IPost[];
}

const PostList: FC<PostListProps> = ({ posts }) => {
	return (
		<ListGroup as="ul">
			{posts.map((post) => (
				<PostItem key={post.id} post={post} />
			))}
		</ListGroup>
	);
};

export default PostList;
