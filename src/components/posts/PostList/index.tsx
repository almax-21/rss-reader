import React, { FC, useEffect, useRef, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import cn from 'classnames';

import { IPost } from '../../../types/index';
import PostItem from '../PostItem';

interface PostListProps {
	posts: IPost[];
	activePage: number;
}

const PostList: FC<PostListProps> = ({ posts, activePage }) => {
	const [isInvisible, setisInvisible] = useState<boolean>(false);

	const prevActivePageRef = useRef<number>(0);

	useEffect(() => {
		if (prevActivePageRef.current === activePage) {
			return;
		}

		if (!isInvisible) {
			setisInvisible(true);
			setTimeout(() => setisInvisible(false), 15);
		}

		prevActivePageRef.current = activePage;
	}, [posts, activePage]);

	const classes = cn('post-list-group', { invisible: isInvisible });

	return (
		<ListGroup as="ul" className={classes}>
			{posts.map((post) => (
				<PostItem key={post.id} post={post} />
			))}
		</ListGroup>
	);
};

export default PostList;
